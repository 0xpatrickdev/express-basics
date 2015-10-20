'use strict';

var express = require('express');
var posts = require('./mock/posts.json');

var app = express();

app.set('view engine', 'jade'); //`app.set` defines different settings in express
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
	res.render('index') // res.render('index.jade') not necessary bc we set engine to jade
});

app.get('/blog/:title?', function(req, res) {
	// makes the param the id: /blog/:id
	// makes the param optional: /blog/:title?
	// `debugger;` --> tells node-inspector to stop here.  typing `res` in the console will allow you to see the entire response object
	var title = req.params.title;
	if (title === undefined) {
			res.status(503);
			res.send("This page is under construction. My b.");
	}	else {
			var post = posts[title] || {};
			res.render('post', { post: post});
	}
});

app.listen(3000, function(){
	console.log("The frontend server is running on port 3000!") // can have an express server running an api or admin view
});