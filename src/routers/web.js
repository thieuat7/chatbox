import express from 'express';
import chatboxControllers from '../controllers/chatboxControllers';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', chatboxControllers.getHomePage);

    router.get('/webhook', chatboxControllers.getWebhook);

    router.post('/webhook', chatboxControllers.postWebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;