const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const smsRoutes = require('./routes/sms');
const callRoutes = require('./routes/call');

app.use('/sms', smsRoutes);
app.use('/call', callRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
