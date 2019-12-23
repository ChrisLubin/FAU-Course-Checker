/* eslint-disable global-require */
// eslint-disable-next-line func-names
(async function () {
  const Course = require('./models/course');
  const getCookie = require('./functions/getCookie'); // Required to get data from API
  const getLatestSemesterId = require('./functions/getLatestSemesterId');
  const startNewSession = require('./functions/startNewSession'); // Also required
  const search = require('./functions/search');
  const isEnrollable = require('./functions/isEnrollable');
  const isWaitlistJoinable = require('./functions/isWaitlistJoinable');

  const courses = [];

  // Add individual courses to check for
  courses.push(new Course('ARH', 2000, 13866));

  const cookie = await getCookie();
  if (!cookie) {
    throw new Error('No cookie data was generated.');
  }

  const semesterId = await getLatestSemesterId();
  if (!semesterId) {
    throw new Error('The latest semester ID could not be found.');
  }

  const sessionStarted = await startNewSession(cookie, semesterId);
  if (!sessionStarted) {
    throw new Error('The session was not successfully started.');
  }

  const result = await search(courses[0], cookie, semesterId);
  if (result === null) {
    throw new Error('No course data was found.');
  }

  const courseEnrollable = isEnrollable(result, courses[0]);
  const courseWaitlistJoinable = isWaitlistJoinable(result, courses[0]);
  if (courseEnrollable) {
    // Send text/email alerting user that course enrollable
  } else if (courseWaitlistJoinable) {
    // Send text/email alerting user that course's waitlist is joinable
  }
}());
