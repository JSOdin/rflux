"use strict";
var React = require('react');
var Input = require('../common/textInput');
var DropDown = require('../common/dropDown');

var CourseForm = React.createClass({
    propTypes: {
        course:	React.PropTypes.object.isRequired,
        onSave:	React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },
    render: function() {

        return (
            <form>
                <h1>Manage Course</h1>
                <Input
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title}
                />
                <br/>
                <DropDown name="author" label="Author" options={this.props.authors} value={this.props.course.author} onChange={this.props.onChange} error={this.props.errors.author}/>
                <br/>
                <Input
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category}
                />
                <br/>
                <Input
                    name="length"
                    label="Length"
                    value={this.props.course.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.length}
                />
                <br/>
                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
})

module.exports = CourseForm;