/*** main.js ***/

define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');
    // import the AppView class using require
    var LedAppView = require('views/LedAppView');
    var SlideData = require('data/SlideData');
    var GridView = require('views/GridView');
    var mainContext = Engine.createContext();
    initApp();
	function initApp(){
		ledAppView = new LedAppView();
		mainContext.add(ledAppView);
		mainContext.setPerspective(1000);
	}
});
