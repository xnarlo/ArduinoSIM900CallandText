const { SerialPort } = require('serialport');

const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 });

module.exports = { serialPort };
