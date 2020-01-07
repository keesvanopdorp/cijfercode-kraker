let express = require('express');
let app = express();
let server = require('http').Server(app);

app.use(express.static('docs'));

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/docs/index.html');
});

// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 8080);
