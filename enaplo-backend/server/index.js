// see https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0

import http from 'http';
import app from './server';

let currentApp = app;

const server = http.createServer(app);
server.listen(3000);

if (module.hot) {
	module.hot.accept('./server', () => {
		server.removeListener('request', currentApp);
		server.on('request', app);
		currentApp = app;
	});
}
