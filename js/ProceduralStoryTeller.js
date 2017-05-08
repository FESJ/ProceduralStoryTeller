// ProceduralStoryTeller - main game class
// Author: Felix Sjöö

"use strict";

// ProceduralStoryTeller: class
// Member: settings, output, input, traits, alltraits
// Methods: (constructor), showEvent, resolveChoice, start
// Needs: gametext-Div, gamechoices-Div, global events-Object
class ProceduralStoryTeller {
	// Constructor
	constructor() {
		// Settings: Where to start, where to end
		this.settings = { start: 0, end: 1, traits: 3 };

		// Input & Output from html-document
		this.output = document.getElementById("gametext");
		this.input =  document.getElementById("gamechoices");

		// Accumulated traits for story & protagonists
		this.traits = { protagonist: new Set(), story: new Set() };
		this.alltraits = { protagonist: new Set() };

		// Add all traits used in event-choices to alltraits
		events.forEach(function(event) {
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
		this.output.innerHTML += "\n<p>" + events[id].text + "</p>";
		// TODO: Customize text with traits

		// Reset Buttons
		this.input.innerHTML = "";

		// Create all choice-buttons
		events[id].choices.forEach(function(choice, index) {
			this.input.innerHTML += "<button onClick='game.resolveChoice(" + id + "," + index +")'>" + choice.text + "</button>\n";
		}, this);
		// TODO: More or less choices with certain traits? Choice-Requirements!
	}

	// resolveChoice: Shows choice-text, resolve traits, generates next Event
	resolveChoice(id, choice) {
		// Show choice-text
		this.output.innerHTML += "\n<p>" + events[id].choices[choice].outcome + "</p>";
		// TODO: Customize text with traits

		// Add choice-story-traits to game object
		for(let trait of events[id].choices[choice].traits.story) {
			this.traits.story.add(trait);
		}

		// Add choice-protagonist-traits to game object
		for(let trait of events[id].choices[choice].traits.protagonist) {
			this.traits.protagonist.add(trait);
		}


		var nextevent = 0;
		while(nextevent == 0){
			nextevent = Math.floor(Math.random() * events.length);

			if(
				!events[nextevent].requirements.story.isSubset(this.traits.story) ||
				!events[nextevent].requirements.protagonist.isSubset(this.traits.protagonist)
			){
				nextevent = 0;
			}
		}

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
