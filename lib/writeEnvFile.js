module.exports = fs => {
	return (destination, filename, dataObj) => {
		const stringified = 'window.env = ' + JSON.stringify(dataObj);

		const dir = destination;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		const path = `${dir}/${filename}`;
		fs.writeFileSync(path, stringified);
	}
};
