import { JsonLogger } from './json.logger';

describe('JsonLogger tests', () => {
  let jsonLogger: JsonLogger;

  beforeEach(() => {
    jsonLogger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('.log() should be log in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    const message = 'test text for json log';
    jsonLogger.log(message);
    const item = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });
    expect(mockFunction).toHaveBeenCalledWith(item);
  });

  it('.error()should be error in json format', () => {
    const mockFunction = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const message = 'test text for json error';
    jsonLogger.error(message);
    const item = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [],
    });
    expect(mockFunction).toHaveBeenCalledWith(item);
  });

  it('.warn()should be warn in json format', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'test text for json warn';
    jsonLogger.warn(message);
    const item = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(item);
  });
});
