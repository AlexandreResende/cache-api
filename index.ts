require('module-alias/register');

import App from "./src/app";

const server = new App();

server.listen();

export default server.app;
