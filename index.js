const TelegramBot = require('node-telegram-bot-api');
const { timeToLearnin } = require('./src/utils/time');
const { format } = require('date-fns');
const menu = require('./src/menu');
const { getFiles, getCoursesFiles } = require('./src/utils/timetable');
const {
    TIMETABLE,
    FULL_TIME_FORM,
    DISTANCE_FORM,
    EVENING_FORM,
    TIMETABLE_DATE,
    TIMETABLE_IMAGES_URL
} = require('./src/constants');

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', msg => {
    const chatId = msg.chat.id;
    //bot.sendMessage(chatId, 'resp');
});

bot.onText(/\/start/i, (msg) => {
    const message = `Привет! В этом боте ты можешь посмотреть расписание Cтупинского филиала МАИ ✈. ${timeToLearnin()}`;
    bot.sendMessage(msg.from.id, message, menu.main.build());
});

bot.on('callback_query', query => {
    if (query.data === TIMETABLE) {
        const message = 'Выбери форму обучения:';
        bot.sendMessage(query.from.id, message, menu.educationForm.build());

        return;
    }

    if (query.data === FULL_TIME_FORM || query.data === DISTANCE_FORM || query.data === EVENING_FORM) {
        const learningForm = query.data;
        const files = getFiles();
        const learningFormFiles = getCoursesFiles(files, learningForm);

        if (learningFormFiles.length) {
            bot.sendMessage(query.from.id, 'Выбери курс:', menu.courseKeyboard[learningForm].build());
            return;
        }

        bot.sendMessage(
            query.from.id,
            'Я не нашёл расписание для этой формы обучения 😔. ' +
            'Если расписание уже есть, отправь, пожалуйста, PullRequest сюда https://github.com/web-arch/mai-stupino-bot'
        );

        return;
    }
    
    const isFormWithCousre = query.data.match(/FULL_TIME_FORM_\d+/).length || query.data.match(/DISTANCE_FORM_\d+/).length || query.data.match(/EVENING_FORM_\d+/).length;

    if (isFormWithCousre) {
        bot.sendMessage(query.from.id, `Расписание с ${format(TIMETABLE_DATE,'dd.MM.yyyy')}:`);

        const imageUrl = `${TIMETABLE_IMAGES_URL}${query.data}.jpg`;

        bot.sendPhoto(query.from.id, imageUrl);
        return;
    }
        
});

bot.on('polling_error', err => console.log(err));
