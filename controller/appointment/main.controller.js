const { addAppointment } = require('./addAppointment.controller');
const { getUpcomings } = require('./getUpcomings.controller');
const { getPrevious } = require('./getPrevious.controller');
const { bookAppointment } = require('./bookAppointment.controller');
const { editAppointment } = require('./editAppointment.controller');

module.exports = {
    addAppointment,
    getUpcomings,
    getPrevious,
    bookAppointment,
    editAppointment
}