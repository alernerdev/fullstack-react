import React from 'react';
import {createStore} from 'redux';
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(); // Default is a 128-bit UID encoded in base58

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uidgen.generateSync() // eslint-disable-line no-undef
    };

    return {messages: state.messages.concat(newMessage) };
  }
  else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages:
        state.messages.filter((m) => {
          m.id !== action.id
        })};
  }
  else {
    return state;
  }
}

const initialState = { messages: [] };
const store = createStore(reducer, initialState);

export default class Chat extends React.Component {
  // re-render after every update from the store
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    // state is retrieved from the store
    const messages = store.getState().messages;

    // ... and flows down into the child components
    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.state.value,
    });
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  }
}

class MessageView extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
    });
  };

  render() {
    // state from above was passed in as a prop
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(index)}
      >
        <div className='text'>
          {message.text}
          <span className='metadata'>@{message.timestamp}</span>
        </div>
      </div>
    ));
    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
}


