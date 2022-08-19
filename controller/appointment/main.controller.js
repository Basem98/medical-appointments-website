const { addAppointment } = require('./addAppointment.controller');
const { getUpcomings } = require('./getUpcomings.controller');
const { getPrevious } = require('./getPrevious.controller');
const { bookAppointment } = require('./bookAppointment.controller');
const { editAppointment } = require('./editAppointment.controller');
const { cancelAppointment } = require('./cancelAppointment.controller');
const { getAvailable } = require('./getAvailable.controller');

module.exports = {
    addAppointment,
    getUpcomings,
    getPrevious,
    bookAppointment,
    editAppointment,
    cancelAppointment,
    getAvailable
}