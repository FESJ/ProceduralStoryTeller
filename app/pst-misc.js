Set.prototype.isSuperset = function(subset) {
	for (var elem of subset) {
		if (!this.has(elem)) {
			return false;
		}
	}
	return true;
};

Set.prototype.isSubset = function(superset) {
	for (var elem of this) {
		if (!superset.has(elem)) {
			return false;
		}
	}
	return true;
};
