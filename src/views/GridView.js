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
        _grid.call(this);

    }
    function _squareSize(){
        var that = this.options
        effectiveSize = [that.size[0]- 2*that.spacing, this.options.size[1]- 1*that.spacing];
        that.squareSize = (effectiveSize[0] - (that.layout[0]-1)*that.spacing)/that.layout[0];
    }
    function _grid(){
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
        this.mainNode.add(grid);
    }

    // Establishes prototype chain for GridView class to inherit from View
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




