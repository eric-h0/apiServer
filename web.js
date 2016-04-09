var prompt = require('prompt');
var request = require('request');
var fs = require('fs');
var stringify = require("json-stringify-pretty-compact")
var http = require("http");


prompt.start();
prompt.get(['site'], function(err, result) {
    console.log('  site: ' + result.site);
    request(result.site, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var json = stringify(body, {maxLength: 0, indent: 1});
          fs.writeFile('index.html', json, function(err) {
          if (err) throw err;
          console.log("Information added.")
        }) //End of fs.appendFile
          http.createServer(function (request, response) {

           response.writeHead(200, {'Content-Type': 'application/json'});
           
           response.end(body);
           }).listen(3000);
           console.log('Server running at http://127.0.0.1:3000/');
 

          require("openurl").open('http://127.0.0.1:3000/')
        }
    });
});



// 1. Class Day (70-90 min)

// ---> Create a node application which takes in a URL - performs a GET request then writes the JSON to an HTML file.

// -- > Then immediately launches your browser to that page.

// -- > Code must be separated out into separate files. I.e. code for launching the page should be in a separate file from the code for running the ajax. You should be using ajax.

// --> Hint:

//     1. You will need to get the URL (will you use prompt? Will you use an argument?)

//     2. You will need to figure out how to perform a GET request using node. (You will probably need to find a node package for this)

//     3. You will need to figure out how to dump the data to an HTML or JSON file in a format that is readable.

//         --> I want the JSON to be formatted well. As in, it should be something like this (mean-google-maps.herokuapp.com/users)

//     4. You will need to figure out how to "launch" the page in node.
