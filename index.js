/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
// eslint-disable-next-line func-names
(async function () {
  const getCookie = require('./functions/getCookie'); // Required to get data from API
  const getLatestSemesterId = require('./functions/getLatestSemesterId');
  const startNewSession = require('./functions/startNewSession'); // Also required
  const search = require('./functions/search');
  const resetSearch = require('./functions/resetSearch');
  const isEnrollable = require('./functions/isEnrollable');
  const isWaitlistJoinable = require('./functions/isWaitlistJoinable');
  const sendEmail = require('./functions/sendEmail');

  let courses = require('./models/courses');

  const semesterId = await getLatestSemesterId();
  if (!semesterId) {
    throw new Error('The latest semester ID could not be found.');
  }

  let cookie = await getCookie();
  if (!cookie) {
    throw new Error('No cookie data was generated.');
  }

  let sessionStarted = await startNewSession(cookie, semesterId);
  if (!sessionStarted) {
    throw new Error('The session was not successfully started.');
  }

  const interval = setInterval(async () => {
    for (const course of courses) {
      let result = await search(course, cookie, semesterId);
      if (!result) {
        // Generate another cookie because cookie may have expired
        cookie = await getCookie();
        sessionStarted = await startNewSession(cookie, semesterId);
        result = await search(course, cookie, semesterId);

        if (!result) {
          // Cookie didn't expire, course data was really not found
          throw new Error('No course data was found.');
        }
      }

      const searchReset = await resetSearch(cookie);
      if (!searchReset) {
        throw new Error('The search parameters were not successfully reset.');
      }

      const courseEnrollable = isEnrollable(result);
      const courseWaitlistJoinable = isWaitlistJoinable(result);
      if (courseEnrollable || courseWaitlistJoinable) {
        await sendEmail(courseEnrollable, courseWaitlistJoinable, course);
        // Stop sending notifications for specific course
        courses = courses.filter(aCourse => aCourse !== course);
      }
    }

    if (courses.length === 0) {
      clearInterval(interval);
      process.exit(0);
    }
  }, 135000);
}());
