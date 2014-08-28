/*** main.js ***/

define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');
    // import the AppView class using require
    var AppView = require('views/AppView');
    var SlideData = require('data/SlideData');
    var GridView = require('views/GridView');
    var mainContext = Engine.createContext();
    initApp();
	function initApp(){
		var gridView = new GridView();
		console.log('soth');
		mainContext.add(gridView);
		mainContext.setPerspective(1000);
	}
});
