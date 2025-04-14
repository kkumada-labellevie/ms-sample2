export class ValidationError {
  public constructor(
    public readonly fieldName: string,
    public readonly message: string,
    public readonly errorObject?: Error
  ) {
    // console.error(`${name}: ${message}`);
    if (errorObject) {
      // console.error(`${name}: ${errorObject.message}`);
      // console.error(`${name}: ${errorObject.stack}`);
    }
  }
}
