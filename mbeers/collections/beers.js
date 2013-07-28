Beers = new Meteor.Collection('beers');

Meteor.methods({
	add: function(postAttributes) {
		var user = Meteor.user();

		// Ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, "You need to login to add a beer");
		};

		// Ensure beer has a name
		if (!postAttributes.name) {
			throw new Meteor.Error(422, "Please fill in a name");
		}

		// Picks out whitelisted keys
		var beer = _.extend(_.pick(postAttributes, 'name'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var beerId = Beers.insert(beer);

		return beerId;
	}
});

Beers.allow({
	insert: function(userId, doc) {
		// Only allows posting if logged in
		return !! userId;
	}
});