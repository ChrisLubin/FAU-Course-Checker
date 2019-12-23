function isWaitlistJoinable(res, targetCourse) {
  return res.some(course => {
    if (parseInt(course.courseReferenceNumber) === targetCourse.crn) {
      return course.waitAvailable > 0;
    }
  });
}

module.exports = isWaitlistJoinable;
