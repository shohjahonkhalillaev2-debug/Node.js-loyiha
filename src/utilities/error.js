export class conflictErorr extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
export class NotFoundErorr extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
export class ValidationErorr extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
export class InternalServerErorr extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
