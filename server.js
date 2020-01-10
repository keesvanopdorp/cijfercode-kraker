let express = require('express');
let app = express();
const secure = require('express-force-https');
let server = require('http').Server(app);

app.use(express.static('docs'));
app.use(secure);

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/docs/index.html');
});

// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 8080);
