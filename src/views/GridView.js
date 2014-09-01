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
        this.mainNode.add(surf);
        _squareSize.call(this);
        //_createGrid.call(this);
        _gride.call(this);

    }
    function _squareSize(){
        var that = this.options
        //totarea = that.size[0] * that.size[1];
        //squareArea = totarea/(that.layout[0]*that.layout[1]);
        //that.squareSize = Math.sqrt (squareArea)-20;
        effectiveSize = [that.size[0]- 2*that.spacing, this.options.size[1]- 1*that.spacing];
        that.squareSize = (effectiveSize[0] - (that.layout[0]-1)*that.spacing)/that.layout[0];
    }
    function _createGrid(){
        this.grid = [];
        var that = this.options
        for (var i=0;i<that.layout[0];i++){
            for(var j=0;j<that.layout[1];j++){
                squarePosition = [(i)*that.squareSize+that.spacing*(i+1),(j)*that.squareSize+that.spacing*(j+1)];
                console.log(squarePosition)
                this.surfaceWithModifier(squarePosition);
            }
        }
    }

    function _gride(){
        var opt = this.options
        var grid = new GridLayout({
            dimensions:[opt.layout[0],opt.layout[1]]
        });

        var surfaces = [];
        grid.sequenceFrom(surfaces);
        for(var i = 0;i<opt.layout[0]*opt.layout[1];i++){
            surfaces.push(new Surface({
                content:"test" + (i+1),
                size: [undefined,undefined],
                properties:{
                    backgroundColor: "#FF0000",
                    color: "#404040",
                    boxShadow: '0 2px 2px 2px rgba(0, 0, 0,0.5)',
                    lineHeight: '200px',
                    textAlign: 'center'
                }
            }));
        }
        console.log(surfaces[1])
        this.mainNode.add(grid);
        console
    }

    // Establishes prototype chain for EmptyView class to inherit from View
    GridView.prototype = Object.create(View.prototype); // functions within View objects
    GridView.prototype.constructor = GridView;
    GridView.prototype.surfaceWithModifier = function(squarePosition){
        var surface = new Surface({
            size : [this.options.squareSize,this.options.squareSize],
            properties:{
            backgroundColor : '#FF0000',
            boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        });
        var modifier = new StateModifier({
            transform : Transform.translate(squarePosition[0],squarePosition[1],1)
        })
        this.mainNode.add(modifier).add(surface);
    }
    
    GridView.DEFAULT_OPTIONS = {
        size: [400,450],
        layout : [20,10],
        spacing: 5
    };
    // Define your helper functions and prototype methods here
    module.exports = GridView;
});




