import express from 'express';
import http from 'http';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import {routes} from './routes';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
    // res.render('index');

    match({routes, location: req.url}, (err, redirectLocation, props) => {
        if(err) {
            // oops
            res.status(500).send(err.message);
        } else if(redirectLocation) {
            // we matched a react router redirect
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (props) {
            // we matched a react component
            const markup = renderToString(<RoutingContext {...props} />);
            res.render('index', {markup});
        } else {
            // not found
            res.sendStatus(404);
        }
    });
});

const server = http.createServer(app);

server.listen(3000);

server.on('listening', () => {
    console.log('listening on port 3000');
});
