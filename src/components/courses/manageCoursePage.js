"use strict";

var React = require('react');
var CourseForm = require('./courseForm');
var Router = require('react-router');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');
var AuthorStore = require('../../stores/authorStore');
var lodash = require('lodash');


var ManageCoursePage = React.createClass({
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
        var author = AuthorStore.getAllAuthors()[0]
        var fullName = author.firstName+ ' ' + author.lastName;
        return {
            course: {
                id: "",
                title: "",
                watchHref: "",
                author: {
                    id: author.id,
                    name: fullName
                },
                length: "",
                category: ""
            },
            errors:{},
            dirty: false
        }
    },
    componentWillMount: function() {
        var courseId = this.props.params.id; //from the path '/course:id'

        if (courseId) {
            this.setState({course: CourseStore.getCourseById(courseId) });
        }
    },
    setCourseState: function(event){    // called for every key press
        this.setState({dirty:true})
        var field = event.target.name;
        var id = event.target.value;

        console.log(event.target.name)
        if (field == 'author'){
            var author= _.find(AuthorStore.getAllAuthors(), {id: id});
            this.state.course[field] = {
               name: author.firstName+' '+author.lastName,
               id: id
            }

            console.log(this.state.course[field]);
        } else {
            this.state.course[field] = value;
        }

        return this.setState({course:this.state.course})
    },
    courseFormIsValid:function(){
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.course.title.length < 5){
            this.state.errors.title = 'Title must be at least 5 characters';
            formIsValid = false;
        }

        if (this.state.course.author.name.length < 5){
            console.log(this.state.course.author)
            this.state.errors.author= 'Author must be at least 5 characters';
            formIsValid = false;
        }

        if (this.state.course.category.length < 3){
            this.state.errors.category= 'Category must be at least 3 characters';
            formIsValid = false;
        }

        this.setState({errors:this.state.errors});
        return formIsValid;
    },
    saveCourse: function(event){
        event.preventDefault();
        if (!this.courseFormIsValid()) {
            return;
        }
        if (this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }
        this.setState({dirty:false});
        this.transitionTo('courses'); // redirect to courses page after save
        toastr.success('Course saved.');
    },
    getAuthors: function(){
       return  AuthorStore.getAllAuthors();
    },
    render: function(){
        return (
            <CourseForm
                course={this.state.course}
                onChange={this.setCourseState}
                onSave={this.saveCourse}
                errors={this.state.errors}
                authors={this.getAuthors()}
            />
        );
    }
});

module.exports = ManageCoursePage;