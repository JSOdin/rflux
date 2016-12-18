"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var CourseList = require('./courseList');
var CourseStore = require('../../stores/courseStore');
var Router = require('react-router');
var Link = Router.Link;


var CoursePage = React.createClass({
    getInitialState: function(){
        return {
            courses : CourseStore.getAllCourses()
        }
    },
    componentDidMount:function(){
        /*     if (this.isMounted()){
         this.setState({authors: AuthorStore.getAllAuthors()})
         }*/
    },
    _onChange:function(){
        debugger;
        this.setState({courses:CourseStore.getAllCourses()});
    },
    componentWillMount: function() {
        CourseStore.addChangeListener(this._onChange);
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._onChange);
    },
    render: function() {    // the AuthorPage, top level component passes down authors state down to its children (which receive these states as props)
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses}/>
            </div>
        );
    }
});

module.exports = CoursePage;

