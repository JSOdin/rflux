var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var DropDown = React.createClass({
    render: function(){
        var selectClass = 'form-control';
        if (this.props.error && this.props.error.length> 0){
            selectClass += ' ' + 'has-error';
        }
        var createOption = function(option){
            return (
                <option key={option.id} value={option.id}>{option.firstName+' '+option.lastName}</option>
            )
        }
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select className={selectClass} name={this.props.name} value={this.props.value.id} onChange={this.props.onChange}>
                    {this.props.options.map(createOption,this)}
                </select>
                <div className="input">{this.props.error}</div>
            </div>
        )
    }
});

module.exports = DropDown;