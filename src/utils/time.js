const differenceInCalendarDays = require('date-fns/differenceInCalendarDays');

const DAYS_STRINGS = ['день', 'дня', 'дней'];

function num2str(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    
    if (n > 10 && n < 20) {
        return text_forms[2];
    }
    
    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }
    
    if (n1 == 1) {
        return text_forms[0];
    }
    
    return text_forms[2];
}

function timeToLearnin() {
    const today = new Date();
    const isLearningYear = today.getUTCMonth() >= 8 || today.getUTCMonth() <= 4;
    
    if (isLearningYear) {
        const isLearningEndsInThatYear = today.getMonth < 11;
        const lerningEndsYear = isLearningEndsInThatYear ? today.getFullYear() : today.getFullYear() + 1;
        const learningEndsDate = new Date(`June, 1,${lerningEndsYear} 00:00:00`);
        const days = differenceInCalendarDays(learningEndsDate, today);

        return `До конца учебного года ${days} ${num2str(days, DAYS_STRINGS)}.`;
    } else {
        const learningStartsDate = new Date(`September, 1,${today.getFullYear()} 00:00:00`);
        const days = differenceInCalendarDays(learningStartsDate, today);

        return `Учебный год еще не начался и расписание скорее всего не актуально. До начала учебного года ${days} ${num2str(days, DAYS_STRINGS)}. Хорошего отдыха ☀🌼🎉`;
    }
}

module.exports = { timeToLearnin };
