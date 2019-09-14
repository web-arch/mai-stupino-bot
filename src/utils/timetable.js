var fs = require('fs');

// Read dir
function getFiles() {
    const timetableFolder = './public/timetable/';

    return fs.readdirSync(timetableFolder);
}

// Get courses files
function getCoursesFiles(files, form) {
    return files.filter(file => file.indexOf(form) !== -1);
}

function getCoursesNumbers(files) {
    return files.map(file => file.match(/\d+/)[0]);
}

module.exports = { getFiles, getCoursesFiles, getCoursesNumbers };
