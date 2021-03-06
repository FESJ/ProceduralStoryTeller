// ProceduralStoryTeller
// Author: Felix Sjöö
"use strict";

// ProceduralStoryTeller: class
// Member: settings, events, output, input, traits, alltraits
// Methods: (constructor), showEvent, resolveChoice,
// resolveTraits, start
// Needs: gametext-Div, gamechoices-Div, gametitle-Div,
// _settings, _data
class ProceduralStoryTeller {
	// Constructor: gets loaded settings and data
	constructor(_settings, _data) {
		// Settings: Where to start, where to end
		this.settings = _settings;

		// Input & Output from html-document
		this.title = document.getElementById("gametitle");
		this.output = document.getElementById("gametext");
		this.input =  document.getElementById("gamechoices");

		// Data object
		this.events = _data;

		// Accumulated traits
		// TODO: Think about "negated" traits
		// TODO: Think about trait-groups
		this.traits = new Set();
		this.alltraits = new Set();

		// Add all possible traits to this.alltraits
		this.events.forEach(function(event) {
			this.alltraits.addSetElements(new Set(event.requirements));
			event.choices.forEach(function(choice) {
				this.alltraits.addSetElements(new Set(choice.requirements));
				this.alltraits.addSetElements(new Set(choice.traits.add));
				this.alltraits.addSetElements(new Set(choice.traits.del));
			}, this);
		}, this);
	}

	// resolveTraits: Customize text with trait-options
	resolveTraits(_text) {
		let text = _text;

		// As long as customizable modules exist: Find them
		while(text.search(/\[.*#.*\]/) != -1) {
			let a = text.search(/\[.*#.*\]/) +1;
			let z = text.search(/\]/);
			let temp = text.slice(a, z).split("#");

			// If corresponding trait exists: Replace module with text
			if(this.traits.has(temp[0])) {
				text = text.replace("[" + temp[0] + "#" + temp[1] + "]", temp[1]);
			}
			// If not: Remove module
			else {
				text = text.replace("[" + temp[0] + "#" + temp[1] + "]", "");
			}
		}
		// Return processed text
		return text;
	}

	// resolveChoice: Shows choice-text, resolve traits, generates next Event
	resolveChoice(id, choice) {
		// Show choice-text
		this.output.innerHTML += "\n<p>"
			+ this.resolveTraits(this.events[id].choices[choice].outcome)
			+ "</p>";

		// Add and remove choice-traits to game object
		this.traits.addSetElements(this.events[id].choices[choice].traits.add);
		this.traits.delSetElements(this.events[id].choices[choice].traits.del);

		// To generate the next event:
		// Set nextevent to startevent
		var nextevent = this.settings.start;

		// While 0 (-> while no suitable event found)
		while(nextevent == this.settings.start){
			// Pick random event
			nextevent = Math.floor(Math.random() * this.events.length);

			// Check if requirements are met: if not, reset to this.settings.start,
			// else show
			if(!new Set(this.events[nextevent].requirements).isSubset(this.traits)){
				nextevent = this.settings.start;
			}
		}

		// Show event!
		this.showEvent(nextevent);
	}

	// showEvent: Shows event that is given by ID
	showEvent(id) {
		// Output event-text
		this.output.innerHTML += "\n<p>"
			+ this.resolveTraits(this.events[id].text)
			+ "</p>";

		// Reset Buttons
		this.input.innerHTML = "";

		// Create all choice-buttons, if requirements are met
		this.events[id].choices.forEach(function(choice, index) {
			if(new Set(choice.requirements).isSubset(this.traits)){
				let fcall = "game.resolveChoice(" + id + "," + index +")";
				this.input.innerHTML += "<button onClick='" + fcall + "'>"
					+ choice.text
					+ "</button>\n";
			}
		}, this);
	}

	// start: Start the game
	start() {
		// Create starting traits
		for(let index = 0; index < this.settings.traits; index++) {
			let newtrait = Math.floor(Math.random() * this.alltraits.size);
			this.traits.add([...this.alltraits][newtrait]);
		}

		// Set story title
		this.title.innerHTML = this.settings.title;

		// Empty divs
		this.output.innerHTML = "";
		this.input.innerHTML = "";

		// Show starting event
		this.showEvent(this.settings.start);
	}
}

/* Example for needed story-data structure
[
	{
		"requirements": [],
		"text": "",
		"choices": [
			{
				"requirements": [],
				"text": "",
				"outcome": "",
				"traits": {
					"add": [],
					"del": []
				}
			}
		]
	}
]
*/
