import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';

import history from './routes/history';
import routes from './routes';


ReactDOM.render(
  <Router routes={routes} history={history} />,
  document.getElementById('app')
);
