Meteor.Router.add({
	'/': 'beersList',
	'/beers/:_id': {
		to: 'beersPage',
		and: function(id) { Session.set('currentBeerId', id);}
	},
	'/add': 'beerAdd'
});

Meteor.Router.filters({
	'requireLogin': function(page) {
		if (Meteor.user()) {
			return page;
		} else if (Meteor.loggingIn()) {
			return 'loading';
		} else {
			return 'accessDenied';
		}
	}
});

Meteor.Router.filter('requireLogin', {
	only: 'beerAdd'
});