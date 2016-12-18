Just a data flow pattern

its a centralized dispatcher for your data (like a factory in angular)

unidirectional data flows

flux deals with actions and data changes.

this module is for facebook's implementation flux.

flow of execution from some Action to the View updating is linear (one direction)
    Action notifies ==> dispatcher ==> store ==> React View

three crucial components in uni-data flow
    Action
        -user interactions that occur on your react component
        -ex. clicks a button

    Dispatcher
        -these actions are handled by dispatcher
        -a singleton registry
        -centralized list of callbacks
        -makes calls to stores

    Store
        -holds app's data

    View
        -when store's data changes, view updates


Action
    -encapsulates specific events that occur on the app
    -triggered by user actions and server.
    -passed to dispatcher

    -save user, delete item, etc etc
    -exposes a method that allows us to trigger a dispatch to the stores.
    -and to include a paylod of data called action.
    -action creators are dispatcher helper methods
        -describes all the actions that are possible in the app
    -actions are triggered in a few places:
        -when a user interacts with the UI, the view will call the appropriate action
        -from the server, like during page load or calls to the server

    -action creator functions are typically grouped in files that have related actions
        -ex. createAuthor, deleteAuthor, editAuthor

    -action payloads have type and data

    {
        type: USER_SAVED,
        data:{
            firstName: 'Cory',
            lastName: 'House'
        }
    }

Dispatcher
    -only one dispatcher per app. it is a central hub
    -dispatches actions
    -stores are registered with the dispatcher so they can be notified when data changes
    -holds a list of callbacks
    -invokes callbacks registered with the dispatcher and broadcasts paylod to registered callbacks
    -this dispatches the actions to the relevant stores

    -each action updates specific stores based on callbacks registered with the dispatcher (stores do the registering)

    Constants
    -a constants file helps keeps things organized
    -provides high level view of what the app actually does

 Store
    -this is the most important part of flux.
    -the only part handling data

    -holds app state, logic, data retrieval
    -its not a model. it CONTAINS models
    -an app can have one or many stores
    -stores get updated because they have callbacks registered with the dispatcher
    -only your stores are allowed to register or dispatch with your callbacks
    -your components should never interact directly with the dispatcher
    -extended with Node's EventEmitter (allows stores to both listen to and broadcast events, and also allow react components to update based on those events)
    -components listen to our stores. stores emit changes using eventemitter. and this is how our components find our state has changed.

    Structure of a store
    1) Extend EventEmitter
    2) addChangeListener and removeChangeListener
    3) emitChange

Controller views
    -the top level component that interacts with stores
    -the CV receives the update from stores and pass the updated data to its children copmonents via props

Example flux flow
    1) Action - user clisk something or made call to an API
    2) Action payload sent to dispatcher
        {
            type: USER_SAVED,
            data:{
                fname: 'Cory',
                lname: 'inthehouse'
            }
        }
     3) dispatcher checks its registered list of callbacks to determine which stores should receive payload
     4) dispatcher sends payload to all registered callbacks
     5) store updates its internal storage based on the payload it receives
     6) once store finishes update, it emits a change event
     7) notifies react that data has changed and need to update the UI to reflect the change

Two way binding
    -reduces amount of code written
    -but difficult to understand what app does if viewmodels fire cascading updates to other views and viewmodels

unidirectional flow
    -more code but easy to navigate and debug

Explained layman's terms
    React: "Hey CourseAction, someone clicked this 'Save Course' button"
    Action: "Thanks React! I registered an action creator with the dispatcher, so the dispatcher should take care of notifying all the stores that care."
    Dispatcher: "Let me see who cares about a course being saved. Ah! looks like the courseStore has registered a callback with me, so Ill let her know."
    Store: "Hi dispatcher! Thanks for the update! i'll update my data with the payload you sent. then i'll emit an event for the react components that care."
    React: "ooo, shiny new data from the store! i'll update the UI to reflect this!"

Flux is not a pub-sub model
    differs in two ways:

    1) every payload is dispatched to all registered callbacks
    2) callbacks can wait for other callbacks via waitForAPI

summary
    Flux is a pattern for unidirectional data flow

    Actions encapsulate events

    Dispatcher is a central hub that holds callbacks

    Stores hold app state