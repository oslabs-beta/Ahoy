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

    - Renders a table row
    - Renders a single cell in the row
    - Renders a list
    - Renders rollback icon button that runs the doHelmChartRollback function
    - Renders a list of 5 items
    - Renders content in each of those items

    */

    let wrapper;

    const mockFunc = jest.fn(() => 5 + 5);

    const props = {
      details: {
        revision: 7,
        updated: '2021-05-01T15:37:58.109638-05:00',
        status: 'deployed',
        chart: 'wordpress-10.10.1',
        app_version: '5.7.0',
        description: 'Upgrade complete',
      },
      release: 'chartVersion',
      doHelmChartRollBack: jest.fn(),
    };

    beforeAll(() => {
      wrapper = shallow(<Version {...props} />);
    });

    it('Generates a Semantic UI Table Row', () => {
      const newTableRow = document.querySelector('[data-testid="VersionRow"]');
      expect(wrapper.find(newTableRow)).to.have.lengthOf(1);
    });
  });
});
