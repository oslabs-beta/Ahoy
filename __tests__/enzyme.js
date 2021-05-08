import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocalChart from '../src/components/LocalChart';

configure({ adapter: new Adapter() });

describe('All enzyme tests', () => {
  describe('Local Chart Button Tests', () => {
    let wrapper;
    const props = {
      chart: {},
      id: 'id',
      key: 'keyString1',
      dirPath: jest.fn(),
      getDeployedCharts: jest.fn(),
      handleOpenChartClick: jest.fn(),
    };

    beforeAll(() => {
      wrapper = shallow(<LocalChart {...props} />);
    });

    describe('Install Button', () => {
      it('Should execute passed in function when clicked', () => {
        wrapper.find('#installBtn').simulate('click');
        expect(props.getDeployedCharts).toHaveBeenCalled();
      });
      xit('Should display a string value', () => {
        expect(typeof wrapper.find('#targetNode').props().children).toBe('string');
      });

      xit('Should display the correct text', () => {
        expect(wrapper.find('#targetNode').props().children).toBe('Set Target Node');
      });
    });
    xdescribe('Open Folder Button', () => {
      it('Should execute passed in function when clicked', () => {
        wrapper.find('#openChartBtn').simulate('click');
        expect(props.entryNodeMode).toHaveBeenCalled();
      });
      xit('Should display a string value', () => {
        expect(typeof wrapper.find('#wallNode').props().children).toBe('string');
      });

      xit('Should display the correct text', () => {
        expect(wrapper.find('#wallNode').props().children).toBe('Add Walls');
      });
    });
  });
});
