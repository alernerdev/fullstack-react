import React from 'react';
import { shallow } from 'enzyme';
import List from '../js/List';

/* expect works, but eslint is complaining */
/* eslint-disable no-undef */

describe('ListApp', () => {
	it('should have the `th` "Items"', () => {
		const wrapper = shallow(
			<List />
		);
		expect(wrapper.contains(<th>Items</th>)).toBe(true);
	});
});

