const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function search(course, cookie, semesterId) {
  try {
    const params = `txt_subject=${course.subject}&txt_courseNumber=${course.number}&txt_term=${semesterId}`;
    const res = await fetch(`${ROOT_URL}/searchResults/searchResults?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      credentials: 'include'
    });
    const query = await res.json();

    return query.data;
  } catch (err) {
    return null;
  }
}

module.exports = search;