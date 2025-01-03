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
    const result = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(mockFunction).toHaveBeenCalledWith(result);
  });

  it('.error()should be error in tskv format', () => {
    const mockFunction = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const message = 'test text for tskv error';
    const optionalParams = 'test params';
    tskvLogger.error(message, optionalParams);
    const result = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(mockFunction).toHaveBeenCalledWith(result);
  });

  it('.warn()should be warn in tskv format', () => {
    const mockFunction = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const message = 'test text for tskv warn';
    const optionalParams = 'test params';
    tskvLogger.warn(message, optionalParams);
    const result = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(mockFunction).toHaveBeenCalledWith(result);
  });
});
