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
        this.currentIndex = 0
        this.rootModifier = new StateModifier({
            size:this.options.size,
            align:[0,0],
            origin:[0,0]

        });
        this.mainNode = this.add(this.rootModifier); // jsuti n case we need a modifier
        _createLightbox.call(this);
        _createGrids.call(this);
        this.showCurrentGrid();
    }
    function _createGrids(){ // create 2 grids so that you are always one ahead
        this.grids = [];
        opts = this.options;
        for (i =0;i<2;i++){
            var grid = new GridView({size:[opts.size[0],opts.size[1]-100]});
            console.log(grid)
            this.grids.push(grid);
        }
    } 
    function _createLightbox(){
        this.lightbox = new Lightbox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }

    LedAppView.prototype = Object.create(View.prototype);
    LedAppView.prototype.constructor = LedAppView;
    LedAppView.prototype.showCurrentGrid = function(){
        grid = this.grids[this.currentIndex];
        this.lightbox.show(grid);
    };

    LedAppView.DEFAULT_OPTIONS = {
        size : [800,900],  
        lightboxOpts : {
            inOpacity: 1,
            outOpacity: 0,
            inOrigin: [0, 0],
            outOrigin: [0, 0],
            showOrigin: [0, 0],

        }      
    };

    module.exports = LedAppView;
});
