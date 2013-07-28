Template.beersPage.helpers({
	currentBeer: function() {
		return Beers.findOne(Session.get('currentBeerId'));
	}
});