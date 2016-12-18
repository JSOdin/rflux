
"use strict";

var React = require('react');

var About = React.createClass({/*
    statics:{
      willTransitionTo: function(transition, params, query, callback){
          // before getting to this page, run a check
          if (!confirm('Are you sure you read a page thats boring?')){
              transition.about(); // stop the transition
          } else {
              callback(); // allow transition to occur
          }
      },
      willTransitionFrom: function(transition,params,qyuery,callback){
          if (!confirm('Are you sure you want to leave a page thats exciting?')){
              transition.about();
          }
      }
    },*/
    render : function(){
        return (
            <div>
                <h1>About</h1>
                <p>
                    This application uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;
