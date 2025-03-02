const express = require('express');
const router = express.Router();
const { SerialPort } = require('serialport');

const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 });

router.get('/sendsmspage', (req, res) => {
  res.render('sendsmspage');
});

router.post('/sendsms', (req, res) => {
  const { number, message } = req.body;
  const atCommand = `AT+CMGS="${number}"\r`;
  console.log(`Sending SMS to ${number} with message: ${message}`);
  serialPort.write(atCommand, (err) => {
    if (err) {
      console.error('Error sending SMS:', err);
      return res.send('Error sending SMS');
    }
    setTimeout(() => {
      serialPort.write(message, (err) => {
        if (err) {
          console.error('Error sending SMS:', err);
          return res.send('Error sending SMS');
        }
        setTimeout(() => {
          serialPort.write(String.fromCharCode(26), (err) => {
            if (err) {
              console.error('Error sending SMS:', err);
              return res.send('Error sending SMS');
            }
            console.log('SMS sent successfully');
            res.send('SMS sent successfully');
          });
        }, 500); // Add a delay of 0.5 seconds before sending the end character
      });
    }, 1000); // Add a delay of 1 second before sending the message
  });
});

module.exports = router;
