define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox = require('famous/views/Lightbox');
    var SlideView = require('views/SlideView');
    var Easing = require('famous/transitions/Easing');
    function SlideshowView() {
        View.apply(this, arguments);
        
        this.rootModifier = new StateModifier ({
            size : this.options.size,
            align : [0,0],
            origin : [0,0]
        });
        this.mainNode = this.add(this.rootModifier);
        _createLightbox.call(this);
        _createSlides.call(this);

    }

    function _createSlides(){
        this.slides = [];
        this.currentIndex = 0;

        for (var i = 0; i<this.options.data.length;i++){
            var slide = new SlideView({
                size : this.options.size,
                photoUrl: this.options.data[i]
            })
            slide.on('click',this.showNextSlide.bind(this));
            this.slides.push(slide);
        }
        this.showCurrentSlide();
    }

    function _createLightbox(){
        this.lightbox = new Lightbox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }

    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;
    SlideshowView.prototype.showCurrentSlide = function() {
        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide, function() {
            slide.fadeIn();
        }.bind(this));
    };
    SlideshowView.prototype.showNextSlide = function(){
        this.currentIndex++;
        if (this.currentIndex===this.slides.length) this.currentIndex=0;
        this.showCurrentSlide();
    }

    SlideshowView.DEFAULT_OPTIONS = {
        size: [20,20], 
        lightboxOpts : {
            inOpacity: 2,
            outOpacity: 2,
            inOrigin: [0.5, 0],
            outOrigin: [0, 0],
            showOrigin: [0, 0],

             inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, 0]),
            outTransform: Transform.thenMove(Transform.rotateZ(1), [0, -4, 0]),
            inTransition: { duration: 650, curve: 'easeOut' },
            outTransition: { duration: 640, curve: Easing.inCubic }
        }
    };

    module.exports = SlideshowView;
});
