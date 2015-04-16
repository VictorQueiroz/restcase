# restcase

Based on Backbone.js and Bookshelf.js, is just a simple RESTful helper which will bring Models and Collections logic without Backbone.js entirely.

## Installation
```
bower install --save restcase
```

## Why Restcase?
```
Because Restcase is just a smaller RESTful helper wrapper.
```

## Dependencies
- Lodash

## Usage/Examples
```js
var User = Restcase.Model.extend({
	idAttribute: 'id',
	initialize: function () {
		this.on('saving', this.onSaving);
	},
	sayMyName: function () {
		alert(this.get('name'));
	},
	save: function () {
		this.trigger('saving');
	},
	onSaving: function () {
		console.log('You are saving this model... We don\'t anything about that');
	}
});

var user = new User();
user.set('name', 'Heisenberg');
user.sayMyName();
user.save();
```

```js
angular.module('app', [])
														 /* Another wrapper which you can do by yourself,
														    following your application needs */
	.factory('User', function ($restcase) {
		return $restcase.Model('/api/user/{userId}');
	})
	.controller('UserCtrl', function (User) {
		var user = new User();

		this.store = function () {
			return user.save().then(function () {
				alert('You saved the user!');
			}, function (err) {
				console.error(err);
				alert('An error has been ocurred');
			});
		};
	});
```