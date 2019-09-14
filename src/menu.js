const { InlineKeyboard } = require('node-telegram-keyboard-wrapper');
const { getFiles, getCoursesNumbers, getCoursesFiles } = require('./utils/timetable');
const { TIMETABLE, FULL_TIME_FORM, DISTANCE_FORM, EVENING_FORM } = require('./constants');

// Main menu
const main = new InlineKeyboard();

main.addRow(
    { text: "Расписание", callback_data: TIMETABLE }
);

// Education form menu
const educationForm = new InlineKeyboard();

educationForm.addRow(
    { text: "Очная", callback_data: FULL_TIME_FORM },
    { text: "Заочная", callback_data: DISTANCE_FORM },
    { text: "Вечерняя", callback_data: EVENING_FORM }
);

// Courses menu
function makeCoursesKeyboard(files, form) {
    const keyboard = new InlineKeyboard();
    const coursesFiles = getCoursesFiles(files, form);
    const courses = getCoursesNumbers(coursesFiles);
    const menu = courses.map(course => ({ text: course, callback_data: `${form}_${course}` }));

    if (menu.length) {
        keyboard.addRow.apply(keyboard, menu);

        return keyboard;
    }

    return null;
}

const timetableFiles = getFiles();

const fullTimeKeyboard = makeCoursesKeyboard(timetableFiles, FULL_TIME_FORM);
const distanceKeyboard = makeCoursesKeyboard(timetableFiles, DISTANCE_FORM);
const eveningKeyboard = makeCoursesKeyboard(timetableFiles, EVENING_FORM);

module.exports = {
    main: main,
    educationForm: educationForm,
    courseKeyboard: {
        [FULL_TIME_FORM]: fullTimeKeyboard,
        [DISTANCE_FORM]: distanceKeyboard,
        [EVENING_FORM]: eveningKeyboard
    }
};
