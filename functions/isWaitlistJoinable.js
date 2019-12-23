function isWaitlistJoinable(result, targetCourse) {
  return result.some(course => {
    if (parseInt(course.courseReferenceNumber) === targetCourse.crn) {
      return course.waitAvailable > 0;
    }
  });
}

module.exports = isWaitlistJoinable;
