class TokenError extends Error {
  constructor(message, cause, ...args) {
    super(message, ...args);
    this.name = 'TokenError';
    this.httpCode = 401;
    this.cause = cause;
  }
}

module.exports = TokenError