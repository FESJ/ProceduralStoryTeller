"use strict";

// List of Events
var events = [
    // Beginning of the Story
	{
		requirements: {
			story: new Set(),
			protagonist: new Set()
		},
		text: "Start - Duis aliquet fermentum ante ac lacinia. Cras suscipit urna eget quam feugiat, et consequat tellus iaculis. Nulla sagittis id dolor ac lobortis. Pellentesque sit amet elit turpis. Etiam ut lectus vitae tellus rutrum mollis ut in nisl. Donec nec odio dignissim, cursus nulla sed, euismod enim. Aenean dictum cursus feugiat. Phasellus pretium erat felis, cursus maximus orci pulvinar et. Donec odio quam, dapibus non velit in, feugiat rutrum metus. Quisque lobortis mi in ante consectetur tincidunt. Ut volutpat quam quis lectus dapibus facilisis. Cras id fermentum velit. Proin vel imperdiet lectus, at aliquam ipsum. Aliquam scelerisque quam sit amet magna laoreet, eget rutrum libero tristique. Sed eget urna nec magna dictum euismod nec a purus.",
		choices: [
			{
				text: "Foo.",
				outcome: "Donec odio quam, dapibus non velit in, feugiat rutrum metus. Quisque lobortis mi in ante consectetur tincidunt. Ut volutpat quam quis lectus dapibus facilisis. Cras id fermentum velit. Proin vel imperdiet lectus, at aliquam ipsum.",
				traits: {
					story: new Set(["zet", "yps"]),
					protagonist: new Set(["beh", "ceh"])
				}
			},
			{
				text: "Bar.",
				outcome: "Etiam ut lectus vitae tellus rutrum mollis ut in nisl. Donec nec odio dignissim, cursus nulla sed, euismod enim. Aenean dictum cursus feugiat. Phasellus pretium erat felis, cursus maximus orci pulvinar et.",
				traits: {
					story: new Set(["vau"]),
					protagonist: new Set(["ah"])
				}
			}
		]
	},
    // End of the Story
	{
		requirements: {
			story: new Set(["vau", "yps", "loco"]),
			protagonist: new Set(["ah", "beh", "ceh"])
		},
		text: "End - Duis aliquet fermentum ante ac lacinia. Cras suscipit urna eget quam feugiat, et consequat tellus iaculis. Nulla sagittis id dolor ac lobortis. Pellentesque sit amet elit turpis. Etiam ut lectus vitae tellus rutrum mollis ut in nisl. Donec nec odio dignissim, cursus nulla sed, euismod enim. Aenean dictum cursus feugiat. Phasellus pretium erat felis, cursus maximus orci pulvinar et. Donec odio quam, dapibus non velit in, feugiat rutrum metus. Quisque lobortis mi in ante consectetur tincidunt. Ut volutpat quam quis lectus dapibus facilisis. Cras id fermentum velit. Proin vel imperdiet lectus, at aliquam ipsum. Aliquam scelerisque quam sit amet magna laoreet, eget rutrum libero tristique. Sed eget urna nec magna dictum euismod nec a purus.",
		choices: []
	},
    // All events
	{
		requirements: {
			story: new Set(),
			protagonist: new Set()
		},
		text: "Maecenas ullamcorper consectetur tortor in tristique. Quisque at dolor tortor. Praesent ut orci ac augue pellentesque feugiat sit amet et est. Suspendisse rhoncus arcu vel blandit rutrum. Phasellus non elit quis nibh gravida auctor. Fusce fringilla, dolor eget lobortis sodales, ex ante pellentesque sapien, sed efficitur nunc turpis in justo. Suspendisse eget nibh vel est posuere accumsan ac et enim. Suspendisse malesuada, nunc et molestie lobortis, arcu urna gravida arcu, lobortis rhoncus erat massa gravida augue. Duis tempus ex eleifend quam varius placerat. Etiam consequat felis nec ipsum interdum ultrices.",
		choices: [
			{
				text: "Ching.",
				outcome: "Fusce fringilla, dolor eget lobortis sodales, ex ante pellentesque sapien, sed efficitur nunc turpis in justo. Suspendisse eget nibh vel est posuere accumsan ac et enim. Suspendisse malesuada, nunc et molestie lobortis, arcu urna gravida arcu, lobortis rhoncus erat massa gravida augue.",
				traits: {
					story: new Set(["zet", "yps"]),
					protagonist: new Set(["beh", "ceh"])
				}
			},
			{
				text: "Chong.",
				outcome: "Suspendisse malesuada, nunc et molestie lobortis, arcu urna gravida arcu, lobortis rhoncus erat massa gravida augue. Duis tempus ex eleifend quam varius placerat. Etiam consequat felis nec ipsum interdum ultrices.",
				traits: {
					story: new Set(["vau"]),
					protagonist: new Set(["ah"])
				}
			}
		]
	},
	{
		requirements: {
			story: new Set(),
			protagonist: new Set()
		},
		text: "In at ligula lobortis, mollis dui a, pretium nunc. Sed elementum dolor a sem luctus, vel rutrum sapien maximus. Aliquam erat volutpat. Aenean maximus sem quis leo auctor aliquam quis eu ante. Donec feugiat et arcu aliquam rhoncus. Integer egestas volutpat enim, id cursus leo. Aenean nec tempus leo, in auctor quam. Fusce maximus semper leo, laoreet condimentum mi vestibulum non. Vestibulum vestibulum tincidunt arcu vitae sagittis. Aenean scelerisque tortor elit, ut aliquam lacus viverra sed. Sed sollicitudin ac nulla id consequat. Nulla mattis orci tellus, a faucibus neque sagittis at. Morbi viverra libero id luctus tempus. Ut elementum urna a lectus pharetra, ut malesuada mi sagittis. Cras sagittis feugiat odio sed eleifend. Curabitur luctus vulputate lacus, ut lacinia arcu laoreet nec.",
		choices: [
			{
				text: "Fix.",
				outcome: "Morbi viverra libero id luctus tempus. Ut elementum urna a lectus pharetra, ut malesuada mi sagittis. Cras sagittis feugiat odio sed eleifend. Curabitur luctus vulputate lacus, ut lacinia arcu laoreet nec.",
				traits: {
					story: new Set(["zet", "yps", "loco"]),
					protagonist: new Set(["beh", "ceh"])
				}
			},
			{
				text: "Foxy.",
				outcome: "Vestibulum vestibulum tincidunt arcu vitae sagittis. Aenean scelerisque tortor elit, ut aliquam lacus viverra sed.",
				traits: {
					story: new Set(["vau"]),
					protagonist: new Set(["ah"])
				}
			}
		]
	},
	{
		requirements: {
			story: new Set(["loco"]),
			protagonist: new Set("")
		},
		text: "Etiam nec massa et velit commodo tristique non malesuada elit. In quam lacus, pretium sit amet massa quis, egestas dapibus quam. Quisque aliquet placerat sagittis. Sed luctus eget urna quis aliquam. Donec vulputate laoreet nisl eu suscipit. Maecenas aliquam auctor tempus. Aliquam bibendum venenatis erat, vitae porttitor nisi condimentum vitae. Quisque vel efficitur turpis. Ut auctor bibendum dolor non tincidunt. Nunc et mattis libero, at ultricies massa. Aliquam nec magna a purus pulvinar scelerisque.",
		choices: [
			{
				text: "Zoom.",
				outcome: "Donec odio quam, dapibus non velit in, feugiat rutrum metus. Quisque lobortis mi in ante consectetur tincidunt. Ut volutpat quam quis lectus dapibus facilisis. Cras id fermentum velit. Proin vel imperdiet lectus, at aliquam ipsum.",
				traits: {
					story: new Set(["zet", "yps"]),
					protagonist: new Set(["beh", "ceh"])
				}
			},
			{
				text: "Bang.",
				outcome: "Etiam ut lectus vitae tellus rutrum mollis ut in nisl. Donec nec odio dignissim, cursus nulla sed, euismod enim. Aenean dictum cursus feugiat. Phasellus pretium erat felis, cursus maximus orci pulvinar et.",
				traits: {
					story: new Set(["vau"]),
					protagonist: new Set(["ah"])
				}
			},
			{
				text: "Pau.",
				outcome: "Sed luctus eget urna quis aliquam. Donec vulputate laoreet nisl eu suscipit. Maecenas aliquam auctor tempus.",
				traits: {
					story: new Set(["vau"]),
					protagonist: new Set(["ah"])
				}
			}
		]
	},
	{
		requirements: {
			story: new Set(),
			protagonist: new Set(["secret"])
		},
		text: "Curabitur sit amet eleifend augue. Nulla sagittis euismod felis, sed lobortis erat sagittis quis. Aliquam mollis urna et risus vehicula, eu consectetur nulla convallis. Nullam vulputate non tortor sit amet elementum. Nulla eu est porttitor, euismod orci quis, iaculis tellus. Nunc mollis magna in quam luctus varius. Nulla enim risus, auctor id vehicula vel, cursus nec libero. In et arcu sed ipsum elementum sollicitudin. In lobortis ornare sapien a tempus. Maecenas ultrices enim non nunc venenatis luctus. Aenean dignissim magna et libero mattis lacinia. Curabitur fermentum odio ut eros commodo, et iaculis justo porttitor. In nec accumsan turpis. Etiam consequat mattis ligula, id egestas nibh congue interdum.",
		choices: [
			{
				text: "Kewl.",
				outcome: "In et arcu sed ipsum elementum sollicitudin. In lobortis ornare sapien a tempus. Maecenas ultrices enim non nunc venenatis luctus.",
				traits: {
					story: new Set(["zet", "yps"]),
					protagonist: new Set(["beh", "ceh"])
				}
			},
			{
				text: "Rad.",
				outcome: "Aenean dignissim magna et libero mattis lacinia. Curabitur fermentum odio ut eros commodo, et iaculis justo porttitor.",
				traits: {
					story: new Set(["vau"]),
					protagonist: new Set(["ah"])
				}
			}
		]
	}
];
