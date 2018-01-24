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
    const threadIndex = state.threads.findIndex(
      (t) => t.threadId === action.threadId
    );

    // need to create a new thread object with modified message array in it
    const oldThread = state.threads[threadIndex];
    const newThread = {
      ...oldThread,
      messages: oldThread.messages.concat(newMessage)
    }

    return {  // return a totally new object based on old plus overwritten pieces 
      ...state, // all the old pieces
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(
          threadIndex + 1, state.threads.length
        )
      ]
    };
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

const initialState = {
  activeThreadId: '1234',
  threads: [
    {
      threadId: '1234',
      title: "Mark",
      messages: [
        {
          text: "hello there",
          timestamp: Date.now(),
          id: uidgen.generateSync()
        }
      ]
    },
    {
      threadId: '567',
      title: "Bob",
      messages: []
    }
  ]
};
const store = createStore(reducer, initialState);

export default class Chat extends React.Component {
  // re-render after every update from the store
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    // state is retrieved from the store
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads;
    const messages = store.getState().messages;
    const activeThread = threads.find((t) => {return t.threadId === activeThreadId});
    const tabs = threads.map((t) => { // a tab object
      return {
        title: t.title,
        active: t.threadId === activeThreadId
      }
    });

    // ... and flows down into the child components
    return (
      <div className='ui segment'>
        <ThreadTabs tabs={tabs} />
        <ThreadView thread={activeThread} />
      </div>
    );
  }
}

class ThreadTabs extends React.Component {
  render() {
    const tabs = this.props.tabs.map((tab, index) => (
        <div key={index} className={tab.active ? 'active item' : 'item'}>
          {tab.title}
        </div>
      )
    );

    return (
      <div className='ui top attached tabular menu'>
        {tabs}
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
      threadId: this.props.threadId
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

class ThreadView extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
    });
  };

  render() {
    // state from above was passed in as a prop
    const messages = this.props.thread.messages.map((message, index) => (
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
      <div className="ui center aligned basic segment">
        <div className='ui comments'>
          {messages}
        </div>
        <MessageInput threadId={this.props.thread.threadId}/>
      </div>
    );
  }
}


