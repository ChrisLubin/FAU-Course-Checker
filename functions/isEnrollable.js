function isEnrollable(result, targetCourse) {
  return result.some(course => {
    if (parseInt(course.courseReferenceNumber) === targetCourse.crn) {
      if (course.waitCapacity === 0 && course.seatsAvailable > 0) {
        // Course does not have a waitlist and there are seat(s) available
        return true;
        // eslint-disable-next-line no-else-return
      } else if (course.waitCount === 0 && course.seatsAvailable > 0) {
        // No one is on waitlist and there are seat(s) available to enroll
        return true;
      } else {
        return false;
      }
    }
  });
}

module.exports = isEnrollable;
