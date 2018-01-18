import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import apiClient from './api';

export default class CourseSelect extends React.Component {
    static propTypes = {
        department: PropTypes.string,
        course: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };
    state = {
        department: null,
        course: null,
        courses: [],
        _loading: false
    }

    componentWillReceiveProps(update) {
        this.setState({
            department: update.department,
            course: update.course
        });
    }

    fetch = (department) => {
        this.setState({_loading :true, courses: []});
        // async call
        apiClient(department).then((courses) => {
            this.setState({_loading: false, courses: courses});
        });
    }

    onSelectDepartment = (evt) => {
        const department = evt.target.value;
        const course = null;
        this.setState({department, course});
        this.props.onChange({name: 'department', value: department});
        this.props.onChange({name: 'course', value: course});

        if (department)
            this.fetch(department);
    }

    onSelectCourse = (evt) => {
        const course = evt.target.value;
        this.setState({course});
        this.props.onChange({name: 'course', value: course});
    }

    render() {
        return (
            <div>
                {this.renderDepartmentSelect()}
                <br/>
                {this.renderCourseSelect()}
            </div>
        );
    }
}
