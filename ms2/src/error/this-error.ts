export class ThisError {
  public constructor(
    public readonly name: string,
    public readonly message: string,
    public readonly errorObject?: Error
  ) {
    // console.error(`${name}: ${message}`);
    if (errorObject) {
      // console.error(`${name}: ${errorObject.message}`);
      // console.error(`${name}: ${errorObject.stack}`);
    }
  }

  public static invalidArgumentError(message: string): ThisError {
    return new ThisError('InvalidArgumentError', message);
  }
}
