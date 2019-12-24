const Course = require('./course');

const courses = [];

// Add individual courses to check for
courses.push(new Course('ARH', 2000, 10014));
courses.push(new Course('ARH', 2000, 13866));
courses.push(new Course('ENC', 1101, 10069));
courses.push(new Course('STA', 4821, 12336));

module.exports = courses;
