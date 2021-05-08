import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import {
  Table, Button, List, Icon,
} from 'semantic-ui-react';

import Version from '../src/components/Version';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Version', () => {
    /* What do I want to test?

    ✓ Renders a table row
    ✓ Renders a single cell in the row
    ✓ Renders a list
    - Renders rollback icon button that runs the doHelmChartRollback function
    - Renders a list of 5 items
    - Renders content in each of those items

    */

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

    it('Generates two lists', () => {
      expect(wrapper.find('[data-testid="list"]')).toHaveLength(2);
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
  });
});
