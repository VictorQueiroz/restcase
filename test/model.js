describe('Model', function () {
	it('should create a model class', function () {
		var MyModel = Restcase.Model.extend();
		var model = new MyModel();
		expect(typeof model).toBe('object');
	});

	it('should set attributes of the model by the parameters of the cronstruction', function () {
		var MyModel = Restcase.Model.extend();
		var model = new MyModel({
			name: 'Restcase Library',
			age: 0.01
		});
		expect(model.get('name')).toBe('Restcase Library');
		expect(model.get('age')).toBe(0.01);
	});

	it('should own functions from parent model', function () {
		var MyModel = Restcase.Model.extend({
			myNewFunction: function () {
				return this.get('sayMyName');
			}
		});
		
		var model = new MyModel({
			sayMyName: 'Heisenberg'
		});

		expect(model.myNewFunction()).toBe('Heisenberg');
	});

	it('should trigger events', function () {
		var throwed = false;

		var MyModel = Restcase.Model.extend({
			triggerThatEvent: function () {
				var myData;
				
				if(this.has('myData')) {
					myData = this.get('myData');
				}

				return this.trigger('myEvent', myData);
			},
			initialize: function () {
				this.on('myEvent', this.myEventHandle);
			},
			myEventHandle: function (myData) {
				throwed = true;
			}
		});

		var model = new MyModel();
		var event = model.triggerThatEvent();

		expect(event._pending).toBe(false);
		expect(throwed).toBe(true);
	});

	it('should deep extend a model', function () {
		var Model = Restcase.Model.extend({
			methods: {
				method1: {
					headers: {
						'X-CSRF-Token': 'something_here'
					}
				}
			}
		});

		var MyNewModel = Model.extend({
			methods: {
				method1: {
					headers: {
						'Other-Header': 'here_is_my_value'
					}
				}
			}
		});

		expect(MyNewModel.prototype.methods.method1.headers['Other-Header']).toBe('here_is_my_value');
		expect(MyNewModel.prototype.methods.method1.headers['X-CSRF-Token']).toBe('something_here');
	});
});