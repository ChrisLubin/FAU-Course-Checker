const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function getLatestSemesterId() {
  try {
    const params = 'dataType=json&searchTerm=&offset=1&max=10';
    const res = await fetch(`${ROOT_URL}/classSearch/getTerms?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const semesters = await res.json();
    let code;

    semesters.some(semester => {
      // The first semester that is not 'View Only'
      if (semester.description.match(/^((?!View Only).)*$/)) {
        code = semester.code;
        return true;
      }
    });

    return code;
  } catch (err) {
    return 0;
  }
}

module.exports = getLatestSemesterId;
