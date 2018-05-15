# node-write-env-file
A bridge for sending backend variables to the frontend

We use this to get environment-specific variables into our deployed web-apps. ElasticBeanstalk best supports environment variables, but it'll generally work for other ways, too.

## Usage

`yarn add node-write-env-file`

ExpressJS example server bits
```
const envWriter = require('node-write-env-file');
const generatedDirectory = 'generated';
const configOptions = {
	protocol: process.env.BACKEND_PROTOCOL || 'http://',
	root: process.env.BACKEND_ROOT || 'localhost:8080',
	version: process.env.BACKEND_API_VERSION || 'v3'
};
envWriter(generatedDirectory, 'env.js', configOptions);
app.use(express.static(generatedDirectory));
```

In your index.html
```
<script type="text/javascript" src="env.js"></script>
```

In your code that needs those variables
```
export const DataService = {
	protocol : env.protocol,
	root : env.root,
	version : env.version,
	...
	...
```
