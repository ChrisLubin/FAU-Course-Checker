const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function getCookie() {
  try {
    const res = await fetch(`${ROOT_URL}/searchResults/searchResults`, {
      method: 'GET',
      credentials: 'same-origin'
    });

    const cookies = res.headers.get('set-cookie');
    let cookie = `JSESSIONID=${cookies.match(/(?<=JSESSIONID=\s*).*?(?=\s*;)/gs)}; `;
    cookie += `BIGipServerboc22banxe_faup_StuRegSsb_pool=${cookies.match(/(?<=pool=\s*).*?(?=\s*;)/gs)}`;

    return cookie;
  } catch (err) {
    return 0;
  }
}

module.exports = getCookie;
