require('module-alias/register');

import App from "./src/app";

const app = new App();

app.listen();

export default app;
