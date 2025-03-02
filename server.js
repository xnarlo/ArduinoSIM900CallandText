const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { SerialPort } = require('serialport');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 });

app.get('/sendsmspage', (req, res) => {
  res.render('sendsmspage');
});

app.post('/sendsms', (req, res) => {
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

app.get('/callpage', (req, res) => {
  res.render('callpage');
});

app.post('/call', (req, res) => {
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

app.post('/drop', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
