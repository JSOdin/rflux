"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var Router = require('react-router');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');


var ManageAuthorPage = React.createClass({
    mixins:[
      Router.Navigation             // extends this component's functionality. will be used to redirect after save
    ],
    statics:{
        willTransitionFrom: function(transition, component){
            if (component.state.dirty && !confirm('leave without saving?')){
                transition.abort();
            }
        }
    },
    getInitialState:function(){
      return {
          author: {id: '', firstName: '', lastName:''},
          errors:{},
          dirty: false
      }
    },
    componentWillMount: function() {
        var authorId = this.props.params.id; //from the path '/author:id'

        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId) });
        }
    },
    setAuthorState: function(event){    // called for every key press
     this.setState({dirty:true})
      var field = event.target.name;
      var value = event.target.value;
      this.state.author[field] = value;
      return this.setState({author:this.state.author})
    },
    authorFormIsValid:function(){
      var formIsValid = true;
      this.state.errors = {};

      if (this.state.author.firstName.length < 3){
          this.state.errors.firstName = 'First name must be at least 3 characters';
          formIsValid = false;
      }

      if (this.state.author.lastName.length < 3){
          this.state.errors.lastName = 'Last name must be at least 3 characters';
          formIsValid = false;
      }

      this.setState({errors:this.state.errors});
      return formIsValid;
    },
    saveAuthor: function(event){
      event.preventDefault();
      if (!this.authorFormIsValid()) {
          return;
      }

      if (this.state.author.id){
          AuthorActions.updateAuthor(this.state.author);
      } else {
          AuthorActions.createAuthor(this.state.author);
      }
      this.setState({dirty:false});
      this.transitionTo('authors'); // redirect to authors page after save
      toastr.success('Author saved.');
    },
    render: function(){
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = ManageAuthorPage;