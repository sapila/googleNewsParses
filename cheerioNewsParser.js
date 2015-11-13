var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
request('https://news.google.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var result = "";

        $('span.titletext').each(function(i,element){
                var a = $(this).parent();
                if(a.attr('href')){
                   result+=$(this).text()+"</br>Source: "
			   +"<a href='"+a.attr('href')+"' target='_blank'>"
			   +a.attr('href')
			   +"</a></br></br>";
                }
        });

  }	
  res.send(result);
});

});
app.listen(8080);
console.log('Listen to 8080');

