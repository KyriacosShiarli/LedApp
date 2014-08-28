define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var SlideData = require('data/SlideData')
    var Transitionable   = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');

    Transitionable.registerMethod('spring', SpringTransition);
    // GrideView constructor function
    // runs once for each new instance
    function GridView() {
        View.apply(this, arguments);
        this.rootModifier = new StateModifier({
            size : this.options.size
        });
        this.mainNode = this.add(this.rootModifier);

        var surface = new Surface({
            size : [this.options.size[0]-this.options.spacing,this.options.size[1]-this.options.spacing],
            properties:{
            backgroundColor : '#FF0000',
            boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        });
        this.mainNode.add(surface);

    }


    // Establishes prototype chain for EmptyView class to inherit from View
    GridView.prototype = Object.create(View.prototype); // functions within View objects
    GridView.prototype.constructor = GridView;
    
    GridView.DEFAULT_OPTIONS = {
        size: [400,450],
        numberOfSquares : 16,
        layout : [4,4],
        spacing: 5
    };
    // Define your helper functions and prototype methods here
    module.exports = GridView;
});




