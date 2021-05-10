import fs from 'fs';
const path = require('path');
const { verifyLocalChartDir, getLocalCharts } = require('../src/helpers/FileSystemHelper');

describe('Helper Unit Tests', () => {
  describe('FileSystemHelper.js', () => {
    const testPath = path.join(__dirname, Math.random().toString(36).substring(2));
    const testSubfolder1 = path.join(testPath, '1');
    const testSubfolder2 = path.join(testPath, '2');

    beforeAll(() => fs.mkdirSync(testPath));
    beforeAll(() => fs.mkdirSync(testSubfolder1));
    beforeAll(() => fs.mkdirSync(testSubfolder2));

    afterAll(() => fs.rmdirSync(testPath));
    afterAll(() => fs.rmdirSync(testSubfolder1));
    afterAll(() => fs.rmdirSync(testSubfolder2));

    it('verifyLocalChartDir() should not return undefined', () => {
      expect(verifyLocalChartDir(testPath)).not.toBeUndefined();
    });

    // Test that verifyLocalChartDir returns true OR the same path as passed in

    // Test that getLocalCharts returns an array
  });

});
