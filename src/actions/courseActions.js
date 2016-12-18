"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.js');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
    createCourse: function(course){     // an action creator
        var newCourse = CourseApi.saveCourse(course);

        // "hey dispatcher, go tell all the stores that an author was just created."
        Dispatcher.dispatch({   // the action (object payload) passed into dispatch
            actionType: ActionTypes.CREATE_COURSE,  // an action always has a type and data.
            course: newCourse
        });
    },
    updateCourse: function(course){     // an action creator
        var updatedCourse = CourseApi.saveCourse(course);

        Dispatcher.dispatch({   // the action (object payload) passed into dispatch
            actionType: ActionTypes.UPDATE_COURSE,  // an action always has a type and data.
            course: updatedCourse
        });
    },
    deleteCourse: function(id) {
        debugger;
        CourseApi.deleteCourse(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        });
    }
};

module.exports = CourseActions;