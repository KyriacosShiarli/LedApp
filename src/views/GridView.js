define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var SlideData = require('data/SlideData')
    var Transitionable   = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');
    var GridLayout = require("famous/views/GridLayout");
    Transitionable.registerMethod('spring', SpringTransition);
    // GrideView constructor function
    // runs once for each new instance
    function GridView() {
        View.apply(this, arguments);
        this.rootModifier = new StateModifier({
            size : this.options.size
        });         
        this.mainNode = this.add(this.rootModifier);
        var surf = new Surface({
            size: this.size,
            properties:{
                backgroundColor:"#FFFFFF"
            }
        });
        _grid.call(this);
    }
    function _grid(){
        var opt = this.options
        this.grid = new GridLayout({
            dimensions:[opt.layout[0],opt.layout[1]]
        });
        this.surfaces = [];
        this.grid.sequenceFrom(this.surfaces);
        for(var i = 0;i<opt.layout[0]*opt.layout[1];i++){
            _gridSurface.call(this);
        }
        this.mainNode.add(this.grid);
    }

    function _gridSurface(){
        surf = new Surface({
            size: [undefined,undefined],
                properties:{
                    backgroundColor: "#ffffff",
                    color: "#404040",
                    boxShadow: '0 0px 7px 2px rgba(30, 30, 30,0.4)',
                    lineHeight: '200px',
                    textAlign: 'center'
                }
            });
        surf.colorIndex = 0;
        surf.possibleColors = ['#009900','#1a3ce1',"#FF0000","#ffffff"]
        this.surfaces.push(surf);
        surf.on('click',function(){
            this.colorIndex++
            if (this.colorIndex==this.possibleColors.length){this.colorIndex=0}
            this.setProperties({backgroundColor: this.possibleColors[this.colorIndex]})
        });
    }

    // Establishes prototype chain for GridView class to inherit from View
    GridView.prototype = Object.create(View.prototype); // functions within View objects
    GridView.prototype.constructor = GridView;
    GridView.prototype.getColours = function() {
        colors =[]
        console.log(this.surfaces.length)
        for (var i=0;i<this.surfaces.length;i++){
            colors.push(this.surfaces[i].properties.backgroundColor);
        }
        console.log(colors)
        return colors 
    }
    GridView.prototype.cleanGrid = function(){
        for(var i = 0 ; i<this.surfaces.length;i++){
            this.surfaces[i].setProperties({backgroundColor :"#ffffff"})
            this.surfaces[i].colorIndex = 0
        }
        this.grid.sequenceFrom(this.surfaces);
    }
    GridView.DEFAULT_OPTIONS = {
        size: [400,450],
        layout : [20,20],
    };
   //TODO : YOU NEED TO MAKE A TWO BUTTON VIEWS ONE FOR CHOOSING AND ONE FOR PLAYING

    // Define your helper functions and prototype methods here
    module.exports = GridView;
});




