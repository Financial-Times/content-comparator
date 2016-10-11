'use strict';

const moment = require('moment');

let publishDateTime, now, todayStartOfDay, publishStartOfDay;

function isWithinHours() {
    return Math.ceil(now.diff(publishDateTime, 'hours', true));
}

function isToday() {
    return (todayStartOfDay.format() === publishStartOfDay.format());
}

function isYesterday() {
    return moment(todayStartOfDay).diff(publishStartOfDay, 'days', true) === 1;
}

function format(datetime) {
    let outcome = moment(datetime).format('MMMM DD, YYYY');

    if (isToday()) {
        outcome = isWithinHours(datetime) < 6 ? isWithinHours(datetime) + ' hours ago' : 'today';
    } else if (isYesterday()) {
        outcome = 'yesterday';
    }

    return outcome;
}

function handle(datetime) {
    publishDateTime = moment(datetime);
    publishStartOfDay = moment(datetime).startOf('day');
    now = moment();
    todayStartOfDay = moment().startOf('day');

    return format(datetime);
}

module.exports = {
    handle: handle
};
