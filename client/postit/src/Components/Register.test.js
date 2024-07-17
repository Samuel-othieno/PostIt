import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';

describe('Register Component', () => {
  it('should render correctly', () => {
    const component = shallow(<Register />);
    expect(component).toMatchSnapshot();
  });
});
