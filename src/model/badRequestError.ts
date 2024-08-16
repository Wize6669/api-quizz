class BadRequestError extends Error {
  public statusCode: number;

  constructor({ message }: { message: string }) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequestError';

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export { BadRequestError };
