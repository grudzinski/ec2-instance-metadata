var ec2InstanceMetadata = require('../index.js');

describe('integration', function() {

	it('works', function(done) {

		var metadata = ec2InstanceMetadata({ testKey: 'testValue' });

		metadata('testKey', function(err, value) {

			done(err);
			console.log(value);

		});

	});

});