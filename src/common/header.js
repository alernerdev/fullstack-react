import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  state = {
    active: this.props.active
  };

  onMenuClick = ((evt)=> {
    const menu = evt.target;
    this.setState({active: menu.name});
  });

  render() {
    let activeName = this.state.active;

    let choices = [];
    choices.push({name: 'main', value: 'Main', className: 'blue item', href: '/'});
    choices.push({name: 'voting', value: 'Voting', className: 'red item', href: '/votingapp'});
    choices.push({name: 'timers', value: 'Timers', className: 'orange item', href: '/timersapp'});
    choices.push({name: 'list', value: 'List', className: 'green item', href: '/listapp'});
    choices.push({name: 'components', value: 'Components', className: 'yellow item', href: '/componentsapp'});
    choices.push({name: 'form', value: 'Form', className: 'olive item', href: '/formapp'});
    choices.push({name: 'basicRouting', value: 'Basic Routing', className: 'teal item', href: '/basicroutingapp'});

    /* go over the array of menus, and which ever one is active now, mark it as such */
    return (<div className="ui menu">
      {choices.map(({name, value, className, href}, index) => {
        return (
          <a key={index}
            className={ (name == activeName) ? className + " active" : className}
            name={name}
            href={href}
            onClick={this.onMenuClick}>{value}</a>
          );
      })}
      </div>
    );
  }
}

Header.propTypes = {
	active: PropTypes.string
  };
