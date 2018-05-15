module.exports = fs => {
	return (destination, dataObj) => {
		const stringified = 'var env = ' + JSON.stringify(dataObj);

		const dir = destination;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		const path = `${dir}/env.js`;
		fs.writeFileSync(path, stringified);
	}
};
