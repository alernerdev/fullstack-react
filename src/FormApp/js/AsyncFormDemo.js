import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import validator from 'validator';
import Field from './Field';
import CourseSelect from './CourseSelect';
import apiClient from './api';

// using ref gives direct access to the DOM element
export default class AsyncFormDemo extends React.Component {
    state = {
        fields: { // individual fields
            name: '',
            email: '',
            course: null,
            department: null
        },
        people: [],
        fieldErrors: {},
        _loading: false,
        _savingStatus: 'READY'
    };

    componentWillMount() {
        this.setState({_loading: true});
        apiClient.loadPeople().then((people) => {
            this.setState({_loading: false, people: people});
        });
    }

    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

        if (!person.name)
            return true;
        if (!person.email)
            return true;
        if (!person.course)
            return true;
        if (!person.department)
            return true;
        if (errMessages.length)
            return true;

        return false;
    }

    // this function is involded by Field
    onInputChange = ({name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        fields[name] = value;
        fieldErrors[name] = error;
        this.setState({fields, fieldErrors, _saveStatus: 'READY'});
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        if (this.validate())
            return;

        const person = this.state.fields;
        const people = [...this.state.people, person];
        this.setState({_saveStatus: 'SAVING'});
        apiClient.savePeople(people)
            .then(() =>{
                this.setState({
                    people: people,
                    fields: {
                        name:'',
                        email:'',
                        course: null,
                        department: null
                    },
                    _saveStatus: 'SUCCESS'
                });
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line no-console
                this.setState({_saveStatus: 'ERROR'});
            });
        }

    render() {
        if (this.state._loading) {
            return (<img alt='loading' src='../images/loading.gif' />);
        }

        return (
            <div>
                <h1> Sign Up Sheet </h1>
                <form onSubmit={this.onFormSubmit}>
                    <Field
                        placeholder="Name"
                        name="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        validate={(val)=> (val ? false : 'Name Required')}
                    />
                    <br/>
                    <Field
                        placeholder="Email"
                        name="email"
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        validate={(val)=> (validator.isEmail(val) ? false : 'Invalid Email')}
                    />
                    <br/>
                    <CourseSelect
                        department = {this.state.fields.department}
                        course = {this.state.fields.course}
                        onChange={this.onInputChange}
                    />
                    <br/>

                    {/* 4 different buttons here */}
                    {{
                        SAVING: <input value='Saving...' type='submit' disabled />,
                        SUCCESS: <input value='Saved!' type='submit' disabled />,
                        ERROR: <input
                            value='Save Failed - Retry?'
                            type='submit'
                            disabled={this.validate()}
                        />,
                        READY: <input
                            value='Submit'
                            type='submit'
                            disabled={this.validate()}
                        />,
                    }[this.state._saveStatus]}
                </form>
                <div>
                    <h3>People</h3>
                    <ul>
                        {/* return li element for each name in the array */}
                        {this.state.people.map(({name, email, department, course}, index) => {
                            return <li key={index}>{[name, email, department, course].join(' - ')}</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}