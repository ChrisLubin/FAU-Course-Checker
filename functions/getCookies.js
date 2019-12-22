const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function getCookies() {
  try {
    const res = await fetch(ROOT_URL, {
      method: 'GET',
      credentials: 'include'
    });
    return res.headers.get('set-cookie');
  } catch (err) {
    return 0;
  }
}

module.exports = getCookies;
