const test = require('ava');

const writeEnvFile = require('../lib/writeEnvFile');

test('writeEnvFile writes to the right place', t => {
	const fs = mockFS();
	const destination = 'generated';
	t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');

	writeEnvFile(fs)(destination, 'env.js', 'my url');

	t.is(fs.spy.file, `${destination}/env.js`);
});

test('writeEnvFile writes JSON with the socket server url', t => {
	const fs = mockFS();
	t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');
	const expectedKey = 'such key'
	const expectedValue = 'many value';
	const input = {};
	input[expectedKey] = expectedValue;

	writeEnvFile(fs)('', '', input);

	const fileContents = fs.spy.data;
	const parts = fileContents.split('=');
	const scriptification = parts[0];
	const data = parts[1];
	const parsed = JSON.parse(data);

	t.is(parsed[expectedKey], expectedValue);
	t.is(scriptification, 'var env ');
});

test('writeEnvFile creates directory if needed', t => {
	const fs = mockFS(false);
	const destination = 'test destination';
	t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');

	writeEnvFile(fs)(destination, 'something');

	t.is(fs.spy.createdDirectory, destination);
});

test('writeEnvFile skips mkdir if it exists', t => {
	const fs = mockFS(true);
	t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');

	writeEnvFile(fs)('destination', 'something');

	t.is(fs.spy.createdDirectory, undefined);
});

const mockFS = (tempDirAlreadyExists) => {
	return {
		spy: {},
		writeFileSync: function(file, data) {
			this.spy.file = file;
			this.spy.data = data;
		},
		existsSync: function() {
			return tempDirAlreadyExists === undefined ? true : tempDirAlreadyExists;
		},
		mkdirSync: function(directory) {
			this.spy.createdDirectory = directory;
		}
	};
};
