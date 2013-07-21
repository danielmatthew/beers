var beersData = [
	{
		name: 'Dead Pony Club'
	},
	{
		name: 'Punk IPA'
	},
	{
		name: '5AM Saint'
	}
];

Template.beersList.helpers({
	// beers: beersData
	beers: function() {
		return Beers.find();
	}
});