export const parseDate = (searchDates) => {
    let queryData = { ...searchDates }
    let initialDateProps = ['dateFromMonth', 'dateFromDay', 'dateToMonth', 'dateToDay'];
    initialDateProps.forEach(prop => {
        if (queryData[prop] !== "") {
            if (prop === "dateFromMonth" || prop === "dateToMonth") { queryData[prop] = queryData[prop] + 1; }
            if (queryData[prop] < 10) queryData[prop] = '0' + queryData[prop];
        }
        if (queryData.dateFromMonth && queryData.dateFromDay) {
            queryData.dateFrom = `${new Date().getFullYear()}-${queryData.dateFromMonth}-${queryData.dateFromDay}`;
        }
        if (queryData.dateToMonth && queryData.dateToDay) {
            queryData.dateTo = `${new Date().getFullYear()}-${queryData.dateToMonth}-${queryData.dateToDay}`;
        }
        delete queryData[prop];
    });

    return queryData;
}