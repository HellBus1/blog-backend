enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
}

enum HttpStatusMessage {
  INVALID_USERNAME_AND_PASSWORD = "Invalid username or password",
  SUCCESS = "Success",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
}

export { HttpStatusCode, HttpStatusMessage }