const path = require('path');
const fs = require('fs');
const readline = require('readline');

const getArrayOfLogs = async (start, end) => {
  /* Create a line reading interface using the readline module */
  const readLineOfLogs = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, '../../logs/general.log'))
  });
  const logs = [];

  /* Create a promise that resolves with the array of logs */
  const logProcessingPromise = new Promise((reslove, reject) => {
    let startLineIndex = 0;
    try {
      readLineOfLogs.on('line', (line) => {
        if (startLineIndex >= start && startLineIndex < end && line.length > 0) {
          const arrOfLogParts = line.split(' ');
          const formattedLine = {
            date: arrOfLogParts[0],
            time: arrOfLogParts[1].match(/\d+:\d+:\d+/)[0],
            level: arrOfLogParts[2].match(/[a-z]+/i)[0],
            senderIP: arrOfLogParts[3].match(/(?<=::).+/i)[0],
            method: arrOfLogParts[4],
            route: arrOfLogParts[5],
            statusCode: arrOfLogParts[6]
          };
          formattedLine.message = formattedLine.level === 'error' ? arrOfLogParts.slice(8).join(' ') : '';
          logs.push(formattedLine);
        } else {
          readLineOfLogs.close();
        }
        startLineIndex = line.length > 0 ? startLineIndex + 1 : startLineIndex;
      });
      readLineOfLogs.on('close', () => {
        reslove(logs);
      })
    } catch (err) {
      reject(err);
    }
  });

  return logProcessingPromise;
}

const getLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;
    console.log(page, limit)
    getArrayOfLogs(page * limit, (page * limit) + limit)
      .then(logs => {
        res.status(200).json({ data: logs });
      })
      .catch(err => { throw err });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getLogs;