Meteor.publish('beers', function() {
	return Beers.find();
});