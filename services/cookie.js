// _BoostId
const NAME = "_bid";

function getAuthToken(cookies) {
  return cookies[NAME];
}

export default { getAuthToken };
