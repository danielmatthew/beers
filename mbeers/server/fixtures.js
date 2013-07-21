if (Beers.find().count() === 0) {
	Beers.insert({
		name: 'Dead Pony Club'
	});
	Beers.insert({
		name: 'Punk IPA'
	});
	Beers.insert({
		name: '5AM Saint'
	});
}