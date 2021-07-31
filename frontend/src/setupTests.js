/* eslint-disable */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';


Enzyme.configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');
// process.env.REACT_X = 'http://test.com';

window.scrollTo = jest.fn();