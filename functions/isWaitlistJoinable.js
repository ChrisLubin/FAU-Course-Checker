function isWaitlistJoinable(course) {
  return course.waitAvailable > 0;
}

module.exports = isWaitlistJoinable;
