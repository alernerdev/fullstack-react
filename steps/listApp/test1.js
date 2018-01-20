import React from 'react';
import { shallow } from 'enzyme';
import List from '../js/List';

/* expect works, but eslint is complaining */
/* eslint-disable no-undef */

describe('ListApp', () => {
	var wrapper;

	beforeEach(() =>
	{
		wrapper = shallow(
			<List />
		);
	});

	it('should have the `th` "Items"', () => {
		expect(wrapper.contains(<th>Items</th>)).toBe(true);
	});

	it('should have a button element', () => {
		expect(wrapper.containsMatchingElement(
			<button>Add item</button>
		)).toBe(true);
	});

	it('button should be disabled', () => {
		const button = wrapper.find('button').first();
		expect(button.props().disabled).toBe(true);
	});

	it('should have a input element', () => {
		expect(wrapper.containsMatchingElement(
			<input />
		)).toBe(true);
	});
});

