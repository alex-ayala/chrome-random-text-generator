import * as chrome from 'sinon-chrome/extensions';
import messageHandler from '../message';
import Random from '../Random';

jest.mock('../Random');
describe('send message', () => {
  beforeAll(() => {
    global.chrome = chrome;
    document.body.innerHTML = `
      <div>
        <form id="mock-form">
          <input id="mock-text-field-1" type="text" />
          <textarea id="mock-textarea-field-1" />
          <input id="mock-text-field-3" type="text" />
        </form>
      </div>
    `;
    document.execCommand = jest.fn();
  });

  afterEach(() => {
    chrome.reset();
  });

  describe('different field type functionality', () => {
    // @ts-ignore
    const mockRandomInstance = Random.mock.instances[0];
    const mockLength = 5;
    const mockSendResponse = jest.fn();
    const mockLorem = 'some fake data';
    window.prompt = jest.fn().mockImplementation(() => mockLength);
    mockRandomInstance.getLorem = jest.fn().mockImplementation(() => mockLorem);

    it('should set fake data to text field', () => {
      const inputField = document.getElementById('mock-text-field-1');
      let focusedField;
      if (inputField) {
        focusedField = inputField;
        focusedField.focus();
      }

      messageHandler(expect.any(Object), expect.any(Object), mockSendResponse);

      const fieldAfterFakeInput = document.getElementById(focusedField.id) as HTMLInputElement;

      expect(document.activeElement == fieldAfterFakeInput).toBe(true);
      expect(fieldAfterFakeInput.value).toBe(mockLorem);
    });

    it('should set fake data to text area field', () => {
      const textAreaField = document.getElementById('mock-textarea-field-1');
      let focusedField;
      if (textAreaField) {
        focusedField = textAreaField;
        focusedField.focus();
      }

      messageHandler(expect.any(Object), expect.any(Object), mockSendResponse);

      const fieldAfterFakeInput = document.getElementById(focusedField.id) as HTMLInputElement;

      expect(document.activeElement == fieldAfterFakeInput).toBe(true);
      expect(fieldAfterFakeInput.value).toBe(mockLorem);
    });
  });

  describe('user messaging', () => {
    it('should send successful response', () => {
      const mockLength = 5;
      const mockSendResponse = jest.fn();
      const inputFields = document.getElementsByTagName('input');
      window.prompt = jest.fn().mockImplementation(() => mockLength);

      if (inputFields && inputFields.length > 0) {
        inputFields[0].focus();
      }

      messageHandler(expect.any(Object), expect.any(Object), mockSendResponse);

      expect(mockSendResponse).toBeCalledWith({ data: 'Copy Successfull' });
    });

    it.only('should prompt for required text length', () => {
      const mockSendResponse = jest.fn();
      window.prompt = jest.fn().mockImplementation((promptMessage) => {
        expect(promptMessage).toBe('Enter the required text length');

        return null;
      });

      messageHandler(expect.any(Object), expect.any(Object), mockSendResponse);
    });

    it.only('should alert user that input is not a number', () => {
      const mockSendResponse = jest.fn();

      window.prompt = jest.fn().mockImplementation((promptMessage) => {
        // @ts-ignore
        if (window.prompt.mock.calls.length > 1) {
          return 1;
        }

        expect(promptMessage).toBe('Enter the required text length');
        return 'abc';
      });
      window.alert = jest.fn().mockImplementation((alertText) => {
        // @ts-ignore
        if (window.alert.mock.calls.length > 1) {
          expect(alertText).toBe('Select any Input element first');
          return;
        }

        expect(alertText).toBe('Dude!! Enter a number');
        return;
      });

      messageHandler(expect.any(Object), expect.any(Object), mockSendResponse);
    });
  });


});
