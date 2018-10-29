import * as chrome from 'sinon-chrome/extensions';
import insertFakeCommand from '../command';

describe('send message', () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.reset();
  });

  it('should query chrome tabs', () => {
    insertFakeCommand('insert-fake');

    expect(chrome.tabs.query.callCount).toBe(1);
  });

  it('should send message to first tab with proper arguments', () => {
    const sampleTabs = [{ id: 123 }, { id: 456 }, { id: 789 }];

    chrome.tabs.query.callsFake(function (query, callback) {
      callback(sampleTabs);

      expect(chrome.tabs.sendMessage.callCount).toBe(1);
      expect(chrome.tabs.sendMessage.args[0][0]).toBe(sampleTabs[0].id);
      expect(chrome.tabs.sendMessage.args[0][1]).toEqual({});
      expect(chrome.tabs.query.callCount).toBe(1);
    });

    insertFakeCommand('insert-fake');
  });
});
