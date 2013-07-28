Template.beerAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var beer = {
			name: $(e.target).find('[name=name]').val()
		};

		Meteor.call('add', beer, function(error, id) {
			if (error) {
				return alert(error.reason);
			}

			Meteor.Router.to('beersList');
		});
	}
});