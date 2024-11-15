require('dotenv').config();

let getHomePage = (req, res) => {
    return res.send("Hello , I am a chatbot");
};

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    console.log(VERIFY_TOKEN);

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

let postWebhook = (req, res) => {
    let body = req.body;

    //check this is an event from page subscription
    if (body.object === 'page') {
        //return a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');

        //iterate over each entry
        body.entry.forEach(function(entry) {
            //get the message. entry.messaging is an array, but
            //will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
    }
    else {
        //return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

module.exports = {
    getHomePage: getHomePage, // key : value
    getWebhook : getWebhook,
    postWebhook : postWebhook
};