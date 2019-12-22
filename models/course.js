class Course {
  constructor(subject, number, crn, online, hasWaitlist) {
    this.subject = subject;
    this.number = number;
    this.crn = crn;
    this.online = online; // Is the course only online
    this.hasWaitlist = hasWaitlist; // Should be true if trying to get onto a full waitlist
  }
}

module.exports = Course;
