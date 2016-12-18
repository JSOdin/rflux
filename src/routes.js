"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute; // this is like $urlRouterProvider.otherwise() in angular
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = ( // if a path is not specified for a route, React assumes "name" to be the path.
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homePage')} />
        <Route name="about" handler={require('./components/about/aboutPage')} />
        <Route name="authors" handler={require('./components/authors/authorPage')} />
        <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')}/>
        <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')} />
        <Route name="courses" handler={require('./components/courses/coursePage')} />
        <Route name="addCourse" path="course" handler={require('./components/courses/manageCoursePage')}/>
        <Route name="manageCourse" path="course/:id" handler={require('./components/courses/manageCoursePage')} />
        <NotFoundRoute handler={require('./components/notFoundPage')}/>
        <Redirect from="about-us" to="about" />
        <Redirect from="awthers" to="authors"/>
        <Redirect from="about/*" to="about" />
    </Route>
);

module.exports = routes;

