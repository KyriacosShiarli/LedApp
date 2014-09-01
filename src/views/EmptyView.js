define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    // Constructor function for our EmptyView class
    function SlideShowView() {

        // Applies View's constructor function to EmptyView class
        View.apply(this, arguments);
    }

    // Establishes prototype chain for EmptyView class to inherit from View
    SlideShowView.prototype = Object.create(View.prototype);
    SlideShowView.prototype.constructor = SlideShowView;

    // Default options for EmptyView class
    SlideShowView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    module.exports = SlideShowView;
});
