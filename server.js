import express from 'express';
import http from 'http';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import routes from './src/routes';

const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {

    match({routes, location: req.url}, (err, redirectLocation, props) => {
        if(err) {
            // oops
            res.status(500).send(err.message);
        } else if(redirectLocation) {
            // we matched a react router redirect
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (!props) {
            // not found
            res.sendStatus(404);
        } else {
            // we matched a react component
            const componentMarkup = renderToString(<RoutingContext {...props} />);
            const HTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Universal/Isomorphic React</title>
    </head>
    <body>
        <div id="app">${componentMarkup}</div>
        <script type="application/javascript" src="bundle.js"></script>
    </body>
</html>
`
            res.end(HTML);
        }
    });
});

const server = http.createServer(app);

server.listen(3000);

server.on('listening', () => {
    console.log('listening on port 3000');
});
