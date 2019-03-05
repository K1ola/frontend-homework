'use strict';

QUnit.module('Тестируем функцию get', function () {
	QUnit.test('get работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			foo: 'bar',
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		assert.strictEqual(get(object, '.foo'), object.foo);
		assert.strictEqual(get(object, '.deep.hested.field'), object.deep.hested.field);

		assert.deepEqual(get(object, '.deep.hested'), object.deep.hested);
		assert.deepEqual(get(object, '.deep'), object.deep);
		assert.deepEqual(get(object, '.'), object);
	});

	QUnit.test('get работает правильно c массивами', function (assert) {
		const object = {
			foo: 'bar',
			baz: [ 1, 2, 3 ],
			deep: [
				{foobar: '42'}
			],
            a: 'a'
		};

		const array = [
			'bar',
			[ 1, 2, 3 ],
			[
				{foobar: '42'}
			],
            'a'
		];

		assert.strictEqual(get(object, '.foo.0'), object.foo[ 0 ]);
		assert.strictEqual(get(object, '.foo.length'), object.foo.length);
		assert.strictEqual(get(object, '.baz.0'), object.baz[ 0 ]);
		assert.strictEqual(get(object, '.baz.length'), object.baz.length);
		assert.strictEqual(get(object, '.deep.0.foobar'), object.deep[ 0 ].foobar);
		assert.strictEqual(get(array, '.0'), array[0]);
	});

	QUnit.test('get работает правильно c объектами без свойств', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get(object, '.foo.baz'), undefined);
		assert.strictEqual(get(object, '.baz.0'), undefined);
		assert.strictEqual(get(object, '.baz.length'), undefined);
		assert.strictEqual(get(object, '.0.1.2'), undefined);
	});

	QUnit.test('get работает правильно c пустыми объектами', function (assert) {
		const object = {};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get('.foo'), undefined);
		assert.strictEqual(get(), undefined);
		assert.strictEqual(get(null), undefined);
		assert.strictEqual(get(undefined), undefined);
	});

	QUnit.test('get работает правильно c пустым вторым параметром', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, ''), undefined);
		assert.strictEqual(get(object, '   '), undefined);
		assert.strictEqual(get(object, null), undefined);
		assert.strictEqual(get(object), undefined);
	});
	
	QUnit.test('get работает правильно c переопределенным методом hasOwnProperty()', function (assert) {
		const object = {
			hasOwnProperty: function() {
			  return false;
			},
			bar: 'baz'
		};

		assert.strictEqual(get(object, '.bar'), object.bar);		
	});	

	QUnit.test('get работает правильно cо вторым параметром не строкой', function (assert) {
		const object = {
			bar: 'baz'
		};

		const string1 = '.bar';
		const notString1 = ['.bar'];
		const notString2 = {
			bar: '.bar'
		};
		const notString3 = new Number(5);

		assert.strictEqual(get(object, string1), object.bar);	
		assert.strictEqual(get(object, notString1), undefined);		
		assert.strictEqual(get(object, notString2), undefined);		
		assert.strictEqual(get(object, notString3), undefined);				
	});
});
