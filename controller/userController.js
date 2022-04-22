const otpGenerator = require("otp-generator");
const Joi = require("joi");
const Users = require('../models/userModel');
const Token = require('../models/tokenModel');
const EmailServiceOtp = require('../helper/EmailServiceOtp');
const PhoneServiceOtp = require('../helper/PhoneServiceOtp');

const register = (req, res) => {
	const personInfo = req.body;

		const schema = Joi.object({
			unique_id:Joi.number(),
			email: Joi.string().email().required(),
			phone: Joi.number().required(),
			username: Joi.string().required(),
			password: Joi.string().required(),
			passwordConf: Joi.string().required(),
		});
		
    const { error } = schema.validate(personInfo);
        if (error) return res.status(400).send(error.details[0].message);

	if (personInfo.password == personInfo.passwordConf) {

		Users.findOne({email:personInfo.email},function(err,data){
				if(!data){
					let c;
					Users.findOne({},function(err,data){

						if (data) {
							c = parseInt(data.unique_id) + 1;
						}else{
							c=1;
						}

						const newPerson = new Users({
							unique_id:c,
							email:personInfo.email,
							phone:`${personInfo.phone}`,
							username: personInfo.username,
							password: personInfo.password,
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
}

const login = (req, res) => {
	const schema = Joi.object({ 
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});
	const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

	Users.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				res.send({"Success": data});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
}

const allUsers = (req, res) => {
	Users.find(function(err,data){
		if(!data){
			res.send('Data Not Found');
		}else{
			return res.send(data);
		}
	});
}

const forgotCredentials = (req, res) => {

	if(req.body.email == null || req.body.phone != null)
	{
		Users.findOne({phone:req.body.phone},function(err,userData){
			if(!userData){
				res.status(500).send({"Success":"This Number Is not regestered!"});
			}else{
				Token.findOne({ userId: userData.unique_id },function(err,tokenData){
					if(!tokenData){
						OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
						const token = new Token({
							userId: userData.unique_id,
							otp: OTP,
					    });
						token.save(function(err, token){
							if(err)
				     	  		console.log('otp save error-->', err);
				        	else{
				        		// PhoneServiceOtp(userData.phone,OTP);
				           		res.send({"Success":"Done otp!"});
							}
					});
					}else{
						res.send({"Success":"Otp Not Found!"})
					}
				});
			}
		});
	} else {
		Users.findOne({email:req.body.email},function(err,userData){
			if(!userData){
				res.status(500).send({"Success":"This Email Is not regestered!"});
			}else{
				Token.findOne({ userId: userData.unique_id },function(err,tokenData){
					if(!tokenData){
						OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
						const token = new Token({
							userId: userData.unique_id,
							otp: OTP,
					    });
						token.save(function(err, token){
							if(err)
				     	  		console.log('otp save error-->', err);
				        	else{
				        		// EmailServiceOtp(userData.email, OTP);
				           		res.send({"Success":"Done otp!"});
							}
					});
					}else{
						res.send({"Success":"otp Not Found!"})
					}
				});
			}
		});
	}
}

const forgototp = (req, res) => {

	if(req.body.email == null || req.body.phone != null)
	{
		Users.findOne({phone:req.body.phone},function(err,userData){
			if(!userData){
				res.status(500).send({"Success":"This Number Is not regestered!"});
			}else{
				Token.findOne({ userId: userData.unique_id },function(err,tokenData){
					if(tokenData){
						
					}else{
						res.send({"Success":"Otp Not Found!"})
					}
				});
			}
		});
	} else {
		// email
	}
    // Users.findOne({email:userEmail},function(err,data){
	// 	if(!data){
	// 		res.send({"Success":"This Email Is not regestered!"});
	// 	}else{
	// 		if (userOtp == data.otp) {
	// 			res.send({"Success":"Successfully Otp varification"});
	// 		}else{
	// 			res.send({"Success":"OTP does not matched !!!"});
	// 	}
	// 	}
	// });
}

const postforgetpass = (req, res) => {
    Users.findOne({email:req.body.email},function(err,data){
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
}

module.exports = { register, login, allUsers, forgotCredentials, forgototp, postforgetpass };