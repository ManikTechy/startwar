var express = require("express");
var app     = express();
var path    = require("path");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser  = require("body-parser");
var Constants = require('./constants');
var api_url = Constants.BEURL;
var Client = require('node-rest-client').Client;
var client = new Client();

// session and cookies
app.use(cookieParser());
app.use(session({secret: "secret"}));
// body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



app.get('/',function(req,res){
	 if(req.session && req.session.isAuthenticated){
        res.sendFile(path.join(__dirname+'/private/index.html'));
      }
      else{
        res.redirect('/login');
      }
});

app.get('/login',function(req,res){
	 if(req.session && req.session.isAuthenticated){
        res.redirect('/');
      }
      else{
        res.sendFile(path.join(__dirname+'/private/index.html'));
      }
});


app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/")
});

app.get('/search',function(req,res){
	if(!req.session.isAuthenticated){
		res.redirect('/');
		return;
	}
	 var query = req.query.q;
	 if(query == ""){
   		res.send({"results" : []});

	 	return;
	 }
	 var url = api_url + 'planets?search=' + query;
	client.get(url, function (data, response) {
   		res.send({"results" : data.results});
   	})
 
});

app.get('/getPlanetInfo',function(req,res){	
	if(!req.session.isAuthenticated){
		res.redirect('/');
		return;
	}
	 var planetName = req.query.planet;
	 var url = api_url + 'planets?search=' + planetName;
	client.get(url, function (data, response) {
   		res.send({"results" : data.results});
   	})
});


//authenticate

app.post('/authenticate', function(request, response){
	
	if(request.session && request.session.isAuthenticated){
		response.redirect('/');
		return;
	}
    var username = request.body.username;
    var password = request.body.password;
    var authenticated = false;
    client.get(api_url + 'people?search=' + username, function (data, res) {
   	data.results.map((item,index) =>{
   		if(item.name.toLowerCase() == username.toLowerCase() && password == item.birth_year){
   				request.session.isAuthenticated = true;
   				request.session.name = item.name;
   				response.cookie('name',item.name, { maxAge: 900000, httpOnly: false });
   				authenticated = true;
   				response.redirect('/');
   		}

   	})
   		if(!authenticated){

   			response.redirect('/login?retry=true');

   		}
});

});


app.listen(process.env.PORT || 8081);



console.log("Running at Port 8081");

