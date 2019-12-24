/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
// eslint-disable-next-line func-names
(async function () {
  const Course = require('./models/course');
  const getCookie = require('./functions/getCookie'); // Required to get data from API
  const getLatestSemesterId = require('./functions/getLatestSemesterId');
  const startNewSession = require('./functions/startNewSession'); // Also required
  const search = require('./functions/search');
  const resetSearch = require('./functions/resetSearch');
  const isEnrollable = require('./functions/isEnrollable');
  const isWaitlistJoinable = require('./functions/isWaitlistJoinable');
  const sendEmail = require('./functions/sendEmail');

  let courses = [];

  // Add individual courses to check for
  courses.push(new Course('ARH', 2000, 10014));
  courses.push(new Course('ARH', 2000, 13866));
  courses.push(new Course('ENC', 1101, 10069));
  courses.push(new Course('STA', 4821, 12336));

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

  const interval = setInterval(async () => {
    for (const course of courses) {
      const result = await search(course, cookie, semesterId);
      if (!result) {
        throw new Error('No course data was found.');
      }

      const searchReset = await resetSearch(cookie);
      if (!searchReset) {
        throw new Error('The search parameters were not successfully reset.');
      }

      const courseEnrollable = isEnrollable(result);
      const courseWaitlistJoinable = isWaitlistJoinable(result);
      if (courseEnrollable || courseWaitlistJoinable) {
        sendEmail(courseEnrollable, courseWaitlistJoinable, course);
        // Stop sending notifications for specific course
        courses = courses.filter(aCourse => aCourse !== course);
      }
    }

    if (courses.length === 0) {
      clearInterval(interval);
      process.exit(1);
    }
  }, 120000);
}());
