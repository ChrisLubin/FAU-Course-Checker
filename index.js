/* eslint-disable global-require */
// eslint-disable-next-line func-names
(async function () {
  const Course = require('./models/course');
  const getCookies = require('./functions/getCookies'); // Required to get data from API

  const courses = [];

  // Add individual courses to check for
  courses.push(new Course('ARH', 2000, 12614, true, true));

  const cookies = await getCookies();
  if (!cookies) {
    throw new Error('No cookie data was generated.');
  }
}());
