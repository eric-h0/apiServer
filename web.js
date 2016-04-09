var prompt = require('prompt');
var request = require('request');
var fs = require('fs');
var stringify = require("json-stringify-pretty-compact")
var http = require("http");

prompt.start();
prompt.get(['site'], function(err, result) {
     var sitePlus = "http://" + result.site;
    request(sitePlus, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var json = stringify(body, {maxLength: 0, indent: 1});
          fs.writeFile('index.html', json, function(err) {
          if (err) throw err;
          console.log("Information added.")
        }) //End of fs.writeFile
          http.createServer(function (request, response) {

           response.writeHead(200, {'Content-Type': 'application/json'});
           
           response.end(body);
           }).listen(3000);
           console.log('Opening: server running at http://127.0.0.1:3000/');
           require("openurl").open('http://127.0.0.1:3000/')
        }
    });
});
