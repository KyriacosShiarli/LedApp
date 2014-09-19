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
            align:[0.5,0],
            origin:[0.5,0]

        });
        this.colors = []
        this.mainNode = this.add(this.rootModifier); // jsuti n case we need a modifier
        _createLightbox.call(this);
        _nextButton.call(this);
        _createGrids.call(this);
        this.showCurrentGrid();
        
    }
    function _createGrids(){ // create 2 grids so that you are always one ahead
        this.grids = [];
        opts = this.options;
        for (i =0;i<2;i++){
            var grid = new GridView({size:[opts.size[0],opts.size[1]-opts.buttonSize[1] + opts.buttonSpacing]});
            this.grids.push(grid);
        }
    } 
    function _createLightbox(){
        this.lightbox = new Lightbox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }

    function _nextButton(){
        opts = this.options;
        opts. buttonSize = [opts.size[0]/4,30]
        var nextButtonModifier = new StateModifier({
            align : [0,0],
            origin : [0,0],
            transform : Transform.translate(0,opts.size[1]+ opts.buttonSpacing,1)
        });

        var buttonSurf = new Surface({
            size : opts.buttonSize,
            content : "NEXT",
            properties :{
                color: "#404040",
                fontFamily: "Times New Roman",
                boxShadow: '0px 1px 3px 1px rgba(100, 0, 0,0.9)',
                textAlign:'center',
                backgroundColor : '#ea361f'
            }
        });
        buttonSurf.on('click',function(){
            this.colors.push(this.grids[0].getColours())
            console.log(this.grids[0].cleanGrid())
            this.showCurrentGrid()
        }.bind(this))
        this.mainNode.add(nextButtonModifier).add(buttonSurf);
    }
    LedAppView.prototype = Object.create(View.prototype);
    LedAppView.prototype.constructor = LedAppView;
    LedAppView.prototype.showCurrentGrid = function(){
        grid = this.grids[this.currentIndex];
        this.lightbox.show(grid);
    };

    LedAppView.DEFAULT_OPTIONS = {
        size : [200,200], 
        buttonSpacing: 10,
        lightboxOpts : {
            inOpacity: 2,
            outOpacity: 0,
            inOrigin: [0.5, 0.5],
            outOrigin: [0.2, 0.2],
            showOrigin: [0, 0],
        }      
    };

    module.exports = LedAppView;
});
