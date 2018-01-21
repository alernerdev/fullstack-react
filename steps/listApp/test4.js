import React from 'react';
import { shallow } from 'enzyme';
import List from '../js/List';

/* expect works, but eslint is complaining */
/* eslint-disable no-undef */

describe('ListApp', () => {
	let wrapper;

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

	describe('user populates input', () => {
		const item = "Vancouver";
		beforeEach(() =>
		{
			const input = wrapper.find('input').first();
			input.simulate('change', {
				target: {value: item}
			});
		});

		it('should update state property `item`', () => {
			expect(wrapper.state().item).toEqual(item);
		});

		it('it should enable button', () => {
			const button = wrapper.find('button').first();
			expect(button.props().disabled).toBe(false);
		});

		describe('and then clears the input', () => {
			const item = "Vancouver";
			beforeEach(() =>
			{
				const input = wrapper.find('input').first();
				input.simulate('change', {
					target: {value: ''}
				});
			});

			it('it should disable button', () => {
				const button = wrapper.find('button').first();
				expect(button.props().disabled).toBe(true);
			});
		});


		describe('and then submits the form', () => {
			beforeEach(() =>
			{
				const form = wrapper.find('form').first();
				form.simulate('submit', {
					preventDefault: () => {}
				});
			});

			it('it should add item to state', () => {
				const button = wrapper.find('button').first();
				expect(wrapper.state().items).toContain(item);
			});

			it('it should render item to the table', () => {
				expect(wrapper.containsMatchingElement(<td>{item}</td>)).toBe(true);
			});

			it('it should clear the input element', () => {
				const input = wrapper.find('input').first();
				expect(input.props().value).toEqual('');
			});

			it('it should disable button', () => {
				const button = wrapper.find('button').first();
				expect(button.props().disabled).toBe(true);
			});
		});
	});
});

