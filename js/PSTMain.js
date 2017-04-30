// ProceduralStoryTeller - mainfile to start it all
// Author: Felix Sjöö

"use strict";

// Global game object
var game;

// If DOMContent loaded: Create game, start game
document.addEventListener("DOMContentLoaded", function(event) {
    game = new ProceduralStoryTeller();
    game.start();
});
