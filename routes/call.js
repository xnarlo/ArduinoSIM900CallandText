const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { serialPort } = require('../serial');
=======
const { SerialPort } = require('serialport');

const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 });
>>>>>>> 732ba5e3f7ee132f57616276bb5b40999bc6b4b0

router.get('/callpage', (req, res) => {
  res.render('callpage');
});

router.post('/call', (req, res) => {
  const { number } = req.body;
  const atCommand = `ATD${number};\r`;
  console.log(`Initiating call to ${number}`);
  serialPort.write(atCommand, (err) => {
    if (err) {
      console.error('Error making call:', err);
      return res.send('<script>alert("Error making call"); window.location.href="/callpage";</script>');
    }
    console.log('Call initiated');
    res.send('<script>alert("Call initiated"); window.location.href="/callpage";</script>');
  });
});

router.post('/drop', (req, res) => {
  const atCommand = 'ATH\r';
  console.log('Dropping call');
  serialPort.write(atCommand, (err) => {
    if (err) {
      console.error('Error dropping call:', err);
      return res.send('<script>alert("Error dropping call"); window.location.href="/callpage";</script>');
    }
    console.log('Call dropped');
    res.send('<script>alert("Call dropped"); window.location.href="/callpage";</script>');
  });
});

module.exports = router;
