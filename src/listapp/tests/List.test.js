import React from 'react';
import ReactDOM from 'react-dom';
import List from '../js/List';

it('ListApp renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<List />, div);
});
