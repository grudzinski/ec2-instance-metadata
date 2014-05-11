require('./index.js')()(process.argv[2], function (err, value) {
	if (err) {
		console.error(err);
	} else {
		console.log(value);
	}
});