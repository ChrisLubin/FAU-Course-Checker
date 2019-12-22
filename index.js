/* eslint-disable global-require */
// eslint-disable-next-line func-names
(async function () {
  const Course = require('./models/course');
  const getCookie = require('./functions/getCookie'); // Required to get data from API
  const startNewSession = require('./functions/startNewSession'); // Also required
  const search = require('./functions/search');

  const courses = [];

  // Add individual courses to check for
  courses.push(new Course('ARH', 2000, 12614, true, true));

  const cookie = await getCookie();
  if (!cookie) {
    throw new Error('No cookie data was generated.');
  }

  const sessionStarted = await startNewSession(cookie);
  if (!sessionStarted) {
    throw new Error('The session was not successfully started.');
  }

  const res = await search(courses[0], cookie);
  if (res === null) {
    throw new Error('No course data was found.');
  }
}());
