// ProceduralStoryTeller
// Author: Felix Sjöö
"use strict";

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

		// Add all possible protagonist-traits to this.alltraits
		this.events.forEach(function(event) {
			this.alltraits.protagonist.addSetElements(new Set(event.requirements.protagonist));
			event.choices.forEach(function(choice) {
				this.alltraits.protagonist.addSetElements(new Set(choice.requirements.protagonist));
				this.alltraits.protagonist.addSetElements(new Set(choice.traits.protagonist.add));
				this.alltraits.protagonist.addSetElements(new Set(choice.traits.protagonist.del));
			}, this);
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
				let fcall = "game.resolveChoice(" + id + "," + index +")";
				this.input.innerHTML += "<button onClick='" + fcall + "'>" + choice.text + "</button>\n";
			}
		}, this);
	}

	// resolveChoice: Shows choice-text, resolve traits, generates next Event
	resolveChoice(id, choice) {
		// Show choice-text
		this.output.innerHTML += "\n<p>" + this.events[id].choices[choice].outcome + "</p>";
		// TODO: Customize text with traits

		// Add and remove choice-story-traits to game object
		this.traits.story.addSetElements(this.events[id].choices[choice].traits.story.add);
		this.traits.story.delSetElements(this.events[id].choices[choice].traits.story.del);

		// Add and remove choice-protagonist-traits to game object
		this.traits.protagonist.addSetElements(this.events[id].choices[choice].traits.protagonist.add);
		this.traits.protagonist.delSetElements(this.events[id].choices[choice].traits.protagonist.del);

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

		// Empty divs
		this.output.innerHTML = "";
		this.input.innerHTML = "";

		// Show starting event
		this.showEvent(this.settings.start);
	}
}
