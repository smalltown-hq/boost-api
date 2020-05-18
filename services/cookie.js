const TOKEN_NAME = "token";

function getAuthToken(cookies) {
  return cookies[TOKEN_NAME];
}

export default { getAuthToken };
