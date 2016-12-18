"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');
var Router = require('react-router');
var Link = Router.Link;


var AuthorPage = React.createClass({
    getInitialState: function(){
        return {
            authors:AuthorStore.getAllAuthors()
        }
    },
    componentDidMount:function(){
   /*     if (this.isMounted()){
            this.setState({authors: AuthorStore.getAllAuthors()})
        }*/
    },
    _onChange:function(){
        debugger;
      this.setState({authors:AuthorStore.getAllAuthors()});
    },
    componentWillMount: function() {
        AuthorStore.addChangeListener(this._onChange);
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function() {
        AuthorStore.removeChangeListener(this._onChange);
    },
    render: function() {    // the AuthorPage, top level component passes down authors state down to its children (which receive these states as props)
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});

module.exports = AuthorPage;