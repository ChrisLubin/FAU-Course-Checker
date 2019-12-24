const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function resetSearch(cookie) {
  try {
    await fetch(`${ROOT_URL}/classSearch/resetDataForm`, {
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

module.exports = resetSearch;
