# [Beers](http://danmatthew.co.uk/beers)

## Todo:
* Port to Meteor
* Build profile page
* Start generating and displaying stats: highest rated beer, most popular beer yadda yadda
* Validation/sanitation on inputs
* Auto-suggest from previous entries when entering a beer
* Use sessionStorage rather than PHP sessions for confirming whether a user is logged in or not
* Search? Wouldn't it be cool to get to the bar and quickly discover the description and user ratings of a particular beer?
* ~~Implement templates with Mustache JS in order to reduce yanky code to build up form elements etc~~
Not a fan of this now: I don't like having to use innerHTML for the various actions. It feels sluggish when adding a list item, plus pagination reveals tell-tale flicker :(

## Update: 15th July
Long time between updates... I've been using the app personally, and noticed that the live version was not adding the latest record on submission. The error returned seems to indicate I may have made a typo in my `addBeer()` function. Data gets through to the database, but the page can't update itself.
An annoyance with running the site as an app on iOS - the default behaviour seems to kill off the PHP session on close, which means each launch requires the user to login. This may chance when I switch to using `sessionStorage()`

I'm thinking about branching the project and porting it over to [Meteor](http://meteorjs.com). I took some time to read Discover Meteor and I feel I can take what I learned following the tutorial in that book to this project. I'm a fan of the almost instantaeneous transactions that happen in a Meteor-powered site, as updates to the local store happen immediately. These changes are then replicated on the remote store.

## Update: 12th May
App is now live! Register and start using. I'm happy to receive any feedback.

This little web-app is both a tool to 'scratch my own itch' and a learning device to help discover the ins-and-outs of modern web application development. I'm hoping to go from Javascript noob to pro* during this process.

*Potentially.

Any feedback welcome at beerapp@danmatthew.co.uk

Cheers,
Dan
