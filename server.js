const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { serialPort } = require('./serial');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const smsRoutes = require('./routes/sms');
const callRoutes = require('./routes/call');

app.use('/sms', smsRoutes);
app.use('/call', callRoutes);

app.get('/sendsmspage', (req, res) => {
  res.redirect('/sms/sendsmspage');
});

app.get('/callpage', (req, res) => {
  res.redirect('/call/callpage');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
