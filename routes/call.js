const express = require('express');
const router = express.Router();
const { serialPort } = require('../serial');

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
