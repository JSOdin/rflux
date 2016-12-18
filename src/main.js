"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, /*Router.HistoryLocation,*/ function(Handler){
   React.render(<Handler/>, document.getElementById('app'));
});

require('../node_modules/bootstrap/dist/css/bootstrap.css');    // for webpack
require('../node_modules/bootstrap/dist/css/bootstrap-theme.css'); // for webpack
require('../node_modules/toastr/build/toastr.css'); // for toaster



