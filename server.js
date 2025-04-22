var express = require('express');
var app = express();
const port = process.env.PORT || 3000

app.use('/', require('./routes'))

app.listen(3000, () => {
    console.log('Sevrver is running on port ${port}');
});
