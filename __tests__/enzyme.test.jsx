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
  // let container = null;

  // beforeEach(() => {
  //   container = document.createElement('div');
  //   document.body.appendChild(container);
  // })

  // afterEach(() => {
  //   unmountComponentAtNode(container);
  //   container.remove();
  //   container = null;
  // })

  describe('Version', () => {
    /* What do I want to test?

    ✓ Renders a table row
    ✓ Renders a single cell in the row
    - Renders a list
    - Renders rollback icon button that runs the doHelmChartRollback function
    - Renders a list of 5 items
    - Renders content in each of those items

    */

    let wrapper;

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

    const { details, release, doHelmChartRollBack } = props;

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
  });
});
