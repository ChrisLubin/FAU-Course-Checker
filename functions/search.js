/* eslint-disable max-len */
const fetch = require('node-fetch');
const ROOT_URL = require('../models/rootUrl');

async function search(targetCourse, cookie, semesterId) {
  try {
    const params = `txt_subject=${targetCourse.subject}&txt_courseNumber=${targetCourse.number}&txt_term=${semesterId}&pageMaxSize=50`;
    const res = await fetch(`${ROOT_URL}/searchResults/searchResults?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      credentials: 'include'
    });
    const query = await res.json();

    // Only return course info that is being searched for
    return query.data.filter(course => parseInt(course.courseReferenceNumber) === targetCourse.crn)[0];
  } catch (err) {
    return null;
  }
}

module.exports = search;
