var _ = require('lodash');

var Ec2InstanceMetadata = require('./lib/Ec2InstanceMetadata.js');

module.exports = function(defaults) {
	var metadata = new Ec2InstanceMetadata(defaults);
	return _.bind(metadata.get, metadata);
}