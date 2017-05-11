// ProceduralStoryTeller - mainfile to start it all
// Author: Felix Sjöö

"use strict";

// Global game object
var game;

// If DOMContent loaded: Create game, start game
/* global ProceduralStoryTeller */
document.addEventListener("DOMContentLoaded", function() {
	game = new ProceduralStoryTeller();
	game.start();
});
