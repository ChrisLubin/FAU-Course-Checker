const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function startNewSession(cookie) {
  try {
    await fetch(`${ROOT_URL}/term/search?mode=search&dataType=json&term=202001`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie
      },
      credentials: 'include'
    });
    return 1;
  } catch (err) {
    return 0;
  }
}

module.exports = startNewSession;
