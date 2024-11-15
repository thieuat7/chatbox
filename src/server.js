import express from 'express';
import initWebRoutes from './routers/web';
import viewEngine from './config/viewEngine';
import bodyParser from 'body-parser';
require('dotenv').config();

let app = express();

//config view engine

viewEngine(app);

//parse request to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});