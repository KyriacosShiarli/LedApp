define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var GridView = require('views/GridView');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Lightbox = require('famous/views/Lightbox');
    function LedAppView() {
        View.apply(this, arguments);
        this.mainNode = this; // jsuti n case we need a modifier
        _createLightbox.call(this)
        this.currentIndex = 0
        var gridView = new GridView();
        // add the instance to app view
        this.grids = [];
        this.grids.push(gridView);     
        console.log(this.grids)
        console.log(this.lightbox)   
        this.mainNode.lightbox.show(this.grids[0])
    }
    function _greateGrids()
    function _createLightbox(){
        this.lightbox = new Lightbox();
        console.log(this.lightbox)
        this.mainNode.add(this.lightbox);
    }

    LedAppView.prototype = Object.create(View.prototype);
    LedAppView.prototype.constructor = LedAppView;
    LedAppView.prototype.constructor = LedAppView;

    LedAppView.DEFAULT_OPTIONS = {
        
    };

     
    module.exports = LedAppView;
});
