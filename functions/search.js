const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function search(course, cookie) {
  const res = await fetch(`${ROOT_URL}/searchResults/searchResults?txt_subject=${course.subject}&txt_courseNumber=${course.number}&txt_term=202001`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie
    },
    credentials: 'include'
  });

  const query = await res.json();
  return query.data;
}

module.exports = search;
