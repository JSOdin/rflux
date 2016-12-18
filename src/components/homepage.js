"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
    render: function(){
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>React, React Router, and Flux for ultra-responsive web</p>
                <Link to="about" className="btn btn-primary btn-lg">Click to learn more</Link>
            </div>
        );
    }
});

module.exports = Home;