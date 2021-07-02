import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/mcagar';

import Editor from 'tinymce/core/api/Editor';
import Plugin from 'tinymce/plugins/table/Plugin';
import Theme from 'tinymce/themes/silver/Theme';

import { tableSizingModeScenarioTest } from '../../module/test/TableSizingModeCommandUtil';

describe('browser.tinymce.plugins.table.command.TableSizingModeCommandTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    plugins: 'table',
    indent: false,
    width: 850,
    content_css: false,
    content_style: 'body { margin: 10px; max-width: 800px }',
    base_url: '/project/tinymce/js/tinymce'
  }, [ Plugin, Theme ]);

  it('TINY-6000: Percent (relative) to pixel (fixed) sizing', () => tableSizingModeScenarioTest(hook.editor(), false, {
    mode: 'relative',
    tableWidth: 100,
    rows: 3,
    cols: 2,
    newMode: 'fixed',
    expectedTableWidth: 800,
    expectedWidths: [
      [ 400, 400 ],
      [ 400, 400 ],
      [ 400, 400 ]
    ]
  }));

  it('TINY-6000: Percent (relative) to none (responsive) sizing', () => tableSizingModeScenarioTest(hook.editor(), false, {
    mode: 'relative',
    tableWidth: 100,
    rows: 3,
    cols: 2,
    newMode: 'responsive',
    expectedTableWidth: null,
    expectedWidths: [
      [ null, null ],
      [ null, null ],
      [ null, null ]
    ]
  }));

  it('TINY-6000: Pixel (fixed) to percent (relative) sizing', () => tableSizingModeScenarioTest(hook.editor(), false, {
    mode: 'fixed',
    tableWidth: 600,
    rows: 2,
    cols: 2,
    newMode: 'relative',
    expectedTableWidth: 75,
    expectedWidths: [
      [ 50, 50 ],
      [ 50, 50 ]
    ]
  }));

  it('TINY-6000: Pixel (fixed) to none (responsive) sizing', () => tableSizingModeScenarioTest(hook.editor(), false, {
    mode: 'fixed',
    tableWidth: 600,
    rows: 2,
    cols: 2,
    newMode: 'responsive',
    expectedTableWidth: null,
    expectedWidths: [
      [ null, null ],
      [ null, null ]
    ]
  }));

  it('TINY-6000: None (responsive) to percent (relative) sizing', () => tableSizingModeScenarioTest(hook.editor(), false, {
    mode: 'responsive',
    tableWidth: null,
    rows: 2,
    cols: 3,
    newMode: 'relative',
    expectedTableWidth: 16,
    expectedWidths: [
      [ 31, 31, 31 ],
      [ 31, 31, 31 ]
    ]
  }));

  it('TINY-6000: None (responsive) to pixel (fixed) sizing', () => tableSizingModeScenarioTest(hook.editor(), false, {
    mode: 'responsive',
    tableWidth: null,
    rows: 2,
    cols: 3,
    newMode: 'fixed',
    expectedTableWidth: 133,
    expectedWidths: [
      [ 41, 41, 41 ],
      [ 41, 41, 41 ]
    ]
  }));
});
