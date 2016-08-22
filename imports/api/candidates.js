import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
let Candidates = new Mongo.Collection('candidates');

export default Candidates

if (Meteor.isServer){

	Meteor.methods({
		'sendEmail': function(options){

			// var host = this.connection.httpHeaders.host;
			// var data = {
			//   from: 'EzyRefG <EzyRefG@gmail.com>',
			//   to: options.email,
			//   subject: 'Job Offer ✔',
			//   html: '<div>Hi ' + options.name + '! You have been invited to apply for job.Please visit this link below to recommend your colleagues to best describe you.<br><a href="http://'+ host + '/#/candidate/'+options.positionId+'/' + options.candidateId + '">Apply</a></div>'
			// };
			// var trans = Async.runSync(function(done){
			// 	mailgun.messages().send(data, function (error, body) {
			// 	  if (error){
			// 			done(error);
			// 		}
			// 		done(null, body);
			// 	});
			// });
			// console.log(trans);
			// console.log('result');
			// // console.log(trans);
			// return trans;
			// var  nodemailer = Meteor.npmRequire('nodemailer');
			// var smtpConfig = {
			// 	host: 'smtp.gmail.com',
			// 	port: 465,
			// 	secure: true, // use SSL
			// 	auth: {
			// 		user: 'bikrambasnet1@gmail.com',
			// 		pass: 'stevejobs15220715'
			// 	}
			// };
			// var host = this.connection.httpHeaders.host;
			// var mailOptions = {
			// 	from: 'EzyRefG <EzyRefG@gmail.com>', // sender address
			// 	to: options.email, // list of receivers
			// 	subject: 'Job Offer ✔', // Subject line
			// 	text: 'Job Offer', // plaintext body
			// 	html: '<div>Hi ' + options.name + '! You have been invited to apply for job.Please visit this link below to recommend your colleagues to best describe you.<br><a href="http://'+ host + '/#/candidate/'+options.positionId+'/' + options.candidateId + '">Apply</a></div>' // html body
			// };
			// var transporter = nodemailer.createTransport(smtpConfig);
			//
			// // var transporter = nodemailer.createTransport('smtps://docmailforyou%40gmail.com:beatles12@smtp.gmail.com');
			//
			// var trans = Async.runSync(function(done){
			// 	transporter.sendMail(mailOptions, function(error, info){
			// 		console.log(info);
			// 		console.log(error);
			// 		if(error){
			// 			done(error);
			// 		}
			// 		done(null, info);
			// 	});
			// });
			// return trans;
			// console.log(options);
			// options.host = this.connection.httpHeaders.host;
			// SSR.compileTemplate( 'htmlEmail', Assets.getText( 'email.html' ) );
			// Email.send({
			// 	to: options.email,
			// 	from: 'EzyRefG <EzyRefG@gmail.com>',
			// 	subject: 'Job offer',
			// 	html: SSR.render( 'htmlEmail', options )
			// });
			// var Em = Email.send({
			//   to: options.email,
			//   from: 'Bikram Basnet <bikrambasnet1@gmail.com>',
			//   subject: 'Test',
			//   text: 'This is test to check meteor email sending features.'
			// });
			// return {
			// 	success: 1,
			// 	message: 'Successfully sent email'
			// }
		},
		'emailToColleagues': function(options){
			var host = this.connection.httpHeaders.host;
			var candidate = Candidates.findOne({_id:options.candidateId});
			var position = Positions.findOne({_id: options.positionId});
			for(var i =0; i <= options.emails.length; i++){
				if (options.emails[i]){
					var number = i + 1;
					Email.send({
						to: options.emails[i],
						from: 'Bikram Basnet <admin@ezyref.com.au>',
						subject: 'Recommendation ✔',
						html: '<div>Hi, ' + candidate.name + ' wants you to get your recommendation for the position ' + position.name + '. Please Click Recommend to write more about him<br><a href="https://'+ host +'/#/reference/'+ options.positionId + '/' + options.candidateId + '/' + number + '">Recommend</a></div>'
					});


				}
			}
			return {
				success: 1,
				message: 'Successfully sent email'
			}
		}
	})
}
