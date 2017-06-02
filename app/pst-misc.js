// ProceduralStoryTeller: Helper functions
// Author: Felix Sjöö
// Source: https://developer.mozilla.org/
"use strict";

// bla
// blubb
Set.prototype.addSetElements = function(setB) {
	for (var elem of setB) { this.add(elem); }
};

// bla
// blubb
Set.prototype.delSetElements = function(setB) {
	for (var elem of setB) { this.delete(elem);	}
};

// Expands Set-Object to check if one set ist superset of the other
// Checks every element in subset: If one element is not in superset, return false
Set.prototype.isSuperset = function(subset) {
	for (var elem of subset) {
		if (!this.has(elem)) {
			return false;
		}
	}
	return true;
};

// Expands Set-Object to check if one set ist subset of the other
// Checks every element in superset: If one element is not in subset, return false
Set.prototype.isSubset = function(superset) {
	for (var elem of this) {
		if (!superset.has(elem)) {
			return false;
		}
	}
	return true;
};
