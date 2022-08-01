const { addAppointment } = require('./addAppointment.controller');
const { getUpcomings } = require('./getUpcomings.controller');
const { getPrevious } = require('./getPrevious.controller');
module.exports = {
    addAppointment,
    getUpcomings,
    getPrevious
}