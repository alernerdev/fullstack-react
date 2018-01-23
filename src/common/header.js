import React from 'react';

export default class Header extends React.Component {
  state = {
    active: ""
  };

  onMenuClick = ((evt)=> {
    const menu = evt.target;
    this.setState({active: menu.name});
  });

  render() {
    let activeName = this.state.active;

    let choices = [];
    choices.push({name: 'red', value: 'Voting', className: 'red item', href: '/votingapp'});
    choices.push({name: 'orange', value: 'Timers', className: 'orange item', href: '/timersapp'});
    choices.push({name: 'green', value: 'List', className: 'green item', href: '/listapp'});
    choices.push({name: 'yellow', value: 'Components', className: 'yellow item', href: '/components'});
    choices.push({name: 'olive', value: 'Form', className: 'olive item', href: '/formapp'});
    choices.push({name: 'teal', value: 'Basic Routing', className: 'teal item', href: '/basicroutingapp'});

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