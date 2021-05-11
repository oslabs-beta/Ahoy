import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocalChart from '../src/components/LocalChart';
import InstalledChart from '../src/components/InstalledChart';

configure({ adapter: new Adapter() });

describe('All enzyme tests', () => {
  let wrapper;

  describe('Local Chart Button Tests', () => {
    // let wrapper;
    const props = {
      chart: {},
      id: 'id',
      key: 'keyString1',
      dirPath: jest.fn(),
      getDeployedCharts: jest.fn(),
      handleOpenChartClick: jest.fn(),
      installHelmChart: jest.fn(),
    };

    beforeAll(() => {
      wrapper = shallow(<LocalChart {...props} />);
    });

    describe('Install Button', () => {
      it('Should render an install button', () => {
        expect(wrapper.find('#installBtn')).toHaveLength(1);
      });
    });
    describe('Open Folder Button', () => {
      it('Should execute passed in function when clicked', () => {
        wrapper.find('#openChartBtn').simulate('click');
        expect(props.handleOpenChartClick).toHaveBeenCalled();
      });
    });
  });

  describe('Installed Chart Button Tests', () => {
    let wrapper2;
    const props = {
      key: {},
      id: 'id',
      chart: {},
      history: {},
      getDeployedCharts: jest.fn(),
      toggleHistory: jest.fn(),
      doHelmChartRollBack: jest.fn(),
    };

    beforeAll(() => {
      wrapper = shallow(<InstalledChart {...props} />);
    });

    describe('Uninstall Popup Button', () => {
      it('Renders a popup when pressed', () => {
        wrapper.find('Popup').simulate('click');
        expect(wrapper.find('#confirm').exists()).toEqual(true);
      });
    });
    describe('History Button', () => {
      it('Should execute passed in function when clicked', () => {
        wrapper.find('#historyBtn').simulate('click');
        expect(props.toggleHistory).toHaveBeenCalled();
      });
    });
  });
});
