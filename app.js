var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var ejs = require('ejs');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.render('index', { title: 'Computer Not Working?' });
});

app.get('/pokemon', function (req, res) {
	res.render('pokemon');
});

app.get('/contact', function (req, res) {
	res.render('contact');
});

app.post('/contact/send', function (req, res) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'your@email.com',
			pass: 'password'
		}
	});

	var mailOptions = {
		from: 'Milk Boi <milkmasterflash@gmail.com>',
		to: 'vonds13@gmail.com',
		subject: 'Website Submission',
		text: `You have a submission with the following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
		html: `<p>You have a submission with the following details...</p><ul><li>Name: ${req.body.name} </li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: ' + info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000...');