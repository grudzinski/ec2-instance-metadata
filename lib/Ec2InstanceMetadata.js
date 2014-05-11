var _ = require('lodash');
var debug = require('debug');
var request = require('request');

function Ec2InstanceMetadata(defaults) {
	this._debug = debug('Ec2InstanceMetadata');
	this._defaults = _.isObject(defaults) ? defaults : {};
}

var p = Ec2InstanceMetadata.prototype;

p.get = function(key, callback) {
	this._debug('getData');
	var url = 'http://169.254.169.254//latest/' + key;
	var onGot = _.bind(this._onGot, this, key, callback);
	request(url, { timeout: 100 }, onGot);
};

p._onGot = function(key, callback, err, res, value) {
	var debug = this._debug;
	debug('_onDataGot');
	if (err) {
		debug('Value not found for key %s, because of an error' , key, err);
		this._useDefault(key, callback);
		return;
	}
	var statusCode = res.statusCode;
	if (statusCode !== 200) {
		debug('Value not found for key %s, because of status code is %s, but expected 200', key, statusCode);
		this._useDefault(key, callback);
		return;
	}
	callback(null, value);
};

p._useDefault = function(key, callback) {
	var debug = this._debug;
	debug('_useDefault');
	var value = this._defaults[key];
	if (_.isUndefined(value)) {
		callback('Value is not found for key ' + key + ' in the defaults');
		return;
	}
	debug('Default value %s is used for key %s', value, key);
	callback(null, value);
}

delete p;

module.exports = Ec2InstanceMetadata;