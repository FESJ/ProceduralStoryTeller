// ProceduralStoryTeller
// Author: Felix Sjöö
"use strict";

// -----------------------------------------------------------------------------
// ProceduralStoryTeller: class
// Member: settings, output, input, traits, alltraits
// Methods: (constructor), showEvent, resolveChoice, start
// Needs: gametext-Div, gamechoices-Div, global events-Object
class ProceduralStoryTeller {
	// Constructor: gets loaded settings and data
	constructor(_settings, _data) {
		// Settings: Where to start, where to end
		this.settings = _settings;

		// Input & Output from html-document
		this.output = document.getElementById("gametext");
		this.input =  document.getElementById("gamechoices");

		// Data object
		this.events = _data;

		// Accumulated traits for story & protagonists
		this.traits = { protagonist: new Set(), story: new Set() };
		this.alltraits = { protagonist: new Set() };

		// Add all traits used in event-choices to alltraits
		this.events.forEach(function(event) {
			event.choices.forEach(function(choice) {
				for(let trait of choice.traits.protagonist) {
					this.alltraits.protagonist.add(trait);
				}
			}, this);

			// Add all traits used in requirements to alltraits
			for(let trait of event.requirements.protagonist) {
				this.alltraits.protagonist.add(trait);
			}
		}, this);
	}

	// showEvent: Shows event that is given by ID
	showEvent(id) {
		// Output event-text
		this.output.innerHTML += "\n<p>" + this.events[id].text + "</p>";
		// TODO: Customize text with traits

		// Reset Buttons
		this.input.innerHTML = "";

		// Create all choice-buttons, if requirements are met
		this.events[id].choices.forEach(function(choice, index) {
			if(
				new Set(choice.requirements.story).isSubset(this.traits.story) &&
				new Set(choice.requirements.protagonist).isSubset(this.traits.protagonist)
			){
				this.input.innerHTML += "<button onClick='game.resolveChoice(" + id + "," + index +")'>" + choice.text + "</button>\n";
			}
		}, this);
		// TODO: More or less choices with certain traits? Choice-Requirements!
	}

	// resolveChoice: Shows choice-text, resolve traits, generates next Event
	resolveChoice(id, choice) {
		// Show choice-text
		this.output.innerHTML += "\n<p>" + this.events[id].choices[choice].outcome + "</p>";
		// TODO: Customize text with traits

		// Add choice-story-traits to game object
		// TODO: Possible to loose traits?
		for(let trait of this.events[id].choices[choice].traits.story) {
			this.traits.story.add(trait);
		}

		// Add choice-protagonist-traits to game object
		// TODO: Possible to loose traits?
		for(let trait of this.events[id].choices[choice].traits.protagonist) {
			this.traits.protagonist.add(trait);
		}

		// To generate the next event:
		// Set nextevent to 0
		var nextevent = 0;

		// While 0 (-> while no suitable event found)
		while(nextevent == 0){
			// Pick random event
			nextevent = Math.floor(Math.random() * this.events.length);

			// Check if requirements are met: if not, reset to 0, else show
			if(
				!new Set(this.events[nextevent].requirements.story).isSubset(this.traits.story) ||
				!new Set(this.events[nextevent].requirements.protagonist).isSubset(this.traits.protagonist)
			){
				nextevent = 0;
			}
		}

		// Show event!
		this.showEvent(nextevent);
	}

	// start: Start the game
	start() {
		// Create starting traits
		for(let index = 0; index < this.settings.traits; index++) {
			let newtrait = Math.floor(Math.random() * this.alltraits.protagonist.size);
			this.traits.protagonist.add([...this.alltraits.protagonist][newtrait]);
		}

		// Show starting event
		this.showEvent(this.settings.start);
	}
}

// -----------------------------------------------------------------------------
// ProceduralStoryTeller: main
// Reading datafiles, creating game-object, start the game

// Global game object
var game;

// If DOMContent loaded: Load datafiles, create game, start game
document.addEventListener("DOMContentLoaded", function() {
	// Connection object to load settings
	var getsettings = new XMLHttpRequest();
	// Adding target file and instructions for the settings-file when loaded
	getsettings.open("GET", "data/pst-settings.json", true);
	getsettings.onloadend = function() {
		// Parse settings
		var settings = JSON.parse(this.responseText);
		// Connection object to load data
		var getdata = new XMLHttpRequest();
		// Adding target file and instructions for the data-file when loaded
		getdata.open("GET", "data/pst-story-data.json", true);
		getdata.onloadend = function() {
			// parse data
			var data = JSON.parse(this.responseText);
			// Create game object; Pass settings & data
			game = new ProceduralStoryTeller(settings, data);
			// start game!
			game.start();

		}; getdata.send();
	};	getsettings.send();
});
