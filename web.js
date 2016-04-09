var prompt = require('prompt');
var request = require('request');
var fs = require('fs');
var http = require("http");

prompt.start();
prompt.get(['site'], function(err, result) {
  //www.omdbapi.com/?t=Inside+out&y=&plot=short&r=json
  var sitePlus = "http://" + result.site;
  request(sitePlus, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        //Saves searched that you've done in a html file. Still tweaking.
        var json = JSON.stringify(body);
        fs.appendFile('log.html', '<pre id="json">' + json + '</pre>' + '\n\n', function(err) {
                if (err) throw err;
                console.log("Information added.")
            }) //End of fs.writeFile
        http.createServer(function(request, response) {

            response.writeHead(200, { 'Content-Type': 'application/json' });

            response.end(body);
        }).listen(3000);
        console.log('Opening: server running at http://127.0.0.1:3000/');
        require("openurl").open('http://127.0.0.1:3000/')
      }
  });
});
