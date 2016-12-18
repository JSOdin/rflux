"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.js');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
    createAuthor: function(author){     // an action creator
        var newAuthor = AuthorApi.saveAuthor(author);

        // "hey dispatcher, go tell all the stores that an author was just created."
        Dispatcher.dispatch({   // the action (object payload) passed into dispatch
            actionType: ActionTypes.CREATE_AUTHOR,  // an action always has a type and data.
            author: newAuthor
        });
    },
    updateAuthor: function(author){     // an action creator
        var updatedAuthor = AuthorApi.saveAuthor(author);

        Dispatcher.dispatch({   // the action (object payload) passed into dispatch
            actionType: ActionTypes.UPDATE_AUTHOR,  // an action always has a type and data.
            author: updatedAuthor
        });
    },
    deleteAuthor: function(id) {
        debugger;
        AuthorApi.deleteAuthor(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: id
        });
    }
};

module.exports = AuthorActions;