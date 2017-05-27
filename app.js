var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var dust = require('dustjs-helpers');
var pg = require('pg');
var app = express();
var exphbs = require('express-handlebars');

var Sequelize = require('Sequelize');

//db connect string
var connection = 'postgres://postgres:admin@localhost:5432/recipebookdb';

// var Article = connection.define('article',{
// 	slug: {
// 		type: Sequelize.STRING,
// 		primaryKey: true
// 	},
// 	title: {
// 		type: Sequelize.STRING,
// 		unique: true,
// 		allowNull: false,
// 		validate:{
// 			len: {
// 				args: [10,150],
// 				msg: 'Please enter a title with at least 10 chars but no more than 150'
// 			}
// 		}
// 	},
// 	body: {
// 		type: Sequelize.TEXT,
// 		defaultValue: 'Coming soon...'
// 	}
// },{
// 	// 关闭时间戳功能
// 		timestamps: false,
// 	// 关闭自动把表名复数化，比如你建的表是article,实际建成的可能是articles
// 		freezeTableName: true
// 	});

// connection
// 	.sync({
// 		force: true,
// 		logging: console.log
// 	})
// 	.then(function() {
// 		return Article.create({
// 			title: 'ddhhhhjjkkkhkkkkk',
// 			slug: 'wib',
// 			body: 'body content'
// 		})
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	});

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.get('/',function (req,res) {
	// res.render('home');
	pg.connect(connection,function (err,client,done) {
		if(err){
			return console.error('error fetching client from pool',err);
		}
		client.query('SELECT * FROM recipes',function (err,result) {
			if (err) {
				return console.error('error runing query',err);
			}
			done();
			res.render('home', {recipes: result.rows});
			console.log(JSON.stringify(result.rows[0]));
		});
	});
	
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(3100,function() {
	console.log('APP RUNNING ON PORT 3100!');
});