import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Version from '../src/components/Version';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Version', () => {
    let wrapper;

    const details = {
      revision: 7,
      updated: '2021-05-01T15:37:58.109638-05:00',
      status: '',
      chart: 'wordpress-10.10.1',
      app_version: '5.7.0',
      description: 'Upgrade complete',
    };
    const release = 'chartVersion';
    const doHelmChartRollBack = jest.fn();

    beforeAll(() => {
      wrapper = shallow(<Version
        key={1}
        details={details}
        release={release}
        doHelmChartRollBack={doHelmChartRollBack}
      />);
    });

    it('Generates a Semantic UI Table Row', () => {
      expect(wrapper.find('[data-testid="VersionRow"]')).toHaveLength(1);
    });

    it('Generates a single cell in the table', () => {
      expect(wrapper.find('[data-testid="tableCell"]')).toHaveLength(1);
    });

    it('Generates a primary list', () => {
      expect(wrapper.find('[data-testid="mainList"]')).toHaveLength(1);
    });

    describe('Rollback icon', () => {
      it('Renders a rollback icon if status does not equal "deployed"', () => {
        expect(wrapper.find('[name="undo"]')).toHaveLength(1);
      });

      it('Calls function when clicked', () => {
        wrapper.find('[name="undo"]').simulate('click');
        expect(doHelmChartRollBack).toHaveBeenCalled();
      });
    });

    describe('Details list', () => {
      it('Renders a list with 6 items', () => {
        const subList = wrapper.find('[data-testid="subList"]');
        expect(subList).toHaveLength(1);
        expect(subList.children()).toHaveLength(6);
      });
    });
  });
});
