const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
<<<<<<< HEAD
const { serialPort } = require('./serial');
=======
>>>>>>> 732ba5e3f7ee132f57616276bb5b40999bc6b4b0

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const smsRoutes = require('./routes/sms');
const callRoutes = require('./routes/call');
<<<<<<< HEAD

app.use('/sms', smsRoutes);
app.use('/call', callRoutes);

app.get('/sendsmspage', (req, res) => {
  res.redirect('/sms/sendsmspage');
});

app.get('/callpage', (req, res) => {
  res.redirect('/call/callpage');
});
=======

app.use('/sms', smsRoutes);
app.use('/call', callRoutes);
>>>>>>> 732ba5e3f7ee132f57616276bb5b40999bc6b4b0

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
