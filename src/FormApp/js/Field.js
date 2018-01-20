import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Field extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired
    };
    state = {
        value: this.props.value,
        error: false
    }

    componentWillReceiveProps(update) {
        this.setState({value: update.value});
    }

    /* from input to here, from here further up to the parent */
    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        // if validate func was passed in, validate it
        const error = this.props.validate ? this.props.validate(value) : false;
        this.setState({value, error});

        this.props.onChange({name, value, error});
    }

    render() {
        return (
            <div>
                <input
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.onChange}
                />
                <span style={{color:'red'}}>{this.state.error}</span>
            </div>
        );
    }
}
