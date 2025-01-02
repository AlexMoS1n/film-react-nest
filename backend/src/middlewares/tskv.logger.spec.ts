import { TSKVLogger } from './tskv.logger';

describe('TSKVLogger tests', () => {
  let tskvLogger: TSKVLogger;

  beforeEach(() => {
    tskvLogger = new TSKVLogger();
  });

  it('.log() should be log in tskv format', () => {
    const mockFunction = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    const message = 'test text for tskv log';
    const optionalParams = 'test params';
    tskvLogger.log(message, optionalParams);
    const item = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(mockFunction).toHaveBeenCalledWith(item);
  });

  it('.error()should be error in tskv format', () => {
    const mockFunction = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const message = 'test text for tskv error';
    const optionalParams = 'test params';
    tskvLogger.error(message, optionalParams);
    const item = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(mockFunction).toHaveBeenCalledWith(item);
  });

  it('.warn()should be warn in tskv format', () => {
    const mockFunction = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const message = 'test text for tskv warn';
    const optionalParams = 'test params';
    tskvLogger.warn(message, optionalParams);
    const item = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(mockFunction).toHaveBeenCalledWith(item);
  });
});
