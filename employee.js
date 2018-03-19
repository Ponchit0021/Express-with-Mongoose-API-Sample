var express = require('express');
var employee = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Employee = require('./Employee.model') //Se hace referencia al modelo Employee, definido previamente

var db = 'mongodb://localhost/lms'; //Conexión a la BD "lms" alojada en MongoDB

employee.use(bodyParser.json());
employee.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(db);

//Puerto por el cual levanta el servicio "employee"
var port = 8083;

employee.listen(port, function(){
	console.log('Express Server is listening on port ' + port);
});

//Land page
employee.get('/',function(req,res){
	 res.send('Welcome to Express with Mongoose API Sample for LMS');
});


//Operación GET del servicio "employee" el cual trae TODOS los empleados que se encuentran en la BD
employee.get('/employee',function(req,res){
	console.log('Getting employees with MongoDB and NodeJS');
	Employee.find({})
		.exec(function(err,employee){
			if(err){
				console.log(employee);
				res.send('Oh! Something went grong :(');
			} else {
				console.log(employee);
				res.json(employee);
			}
		});
});


//Operación GET del servicio "employee" el cual trae UN solo empleado idenfificado por su _id
employee.get('/employee/:id', function(req, res){
	console.log('Getting only one employee');
	Employee.findOne({
		_id: req.params.id
	})

	.exec(function(err, employee) {
		if(err) {
			res.send('Oh! Something went grong :(');
		} else {
			console.log(employee);
				res.json(employee);
		}
	});
});


//Operación POST del servicio "employee" el cual obtiene TODOS los empleados que se encuentran en la BD
employee.post('/employee',function(req,res){
	var newEmployee = new Employee();

	newEmployee.firstName = req.body.firstName;
	newEmployee.secondName = req.body.secondName;
	newEmployee.fatherName = req.body.fatherName;
	newEmployee.motherName = req.body.motherName;
	//newEmployee.employeeId = req.body.employeeId;
	newEmployee.birthDate = req.body.birthDate;
	newEmployee.age = req.body.age;
	newEmployee.startDate = req.body.startDate;

	newEmployee.save(function(err,employee){
		if(err){
			console.log(employee);
			res.send('Oh! Something went grong :(');
		} else {
			console.log(employee);
			res.send(employee);
		}

	});
});

//Operación PUT (UPDATE) del servicio "employee" el cual modifica a un empleado identificado por su _id:
employee.put('/employee/:id', function(req, res){
	Employee.findOneAndUpdate({
		_id: req.params.id
	},
	{ $set: {
		firstName: req.body.firstName,
		secondName: req.body.secondName,
		fatherName: req.body.fatherName,
		motherName: req.body.motherName,
		birthDate: req.body.birthDate,
		age: req.body.age,
		isActive: req.body.isActive
		}},
	{ upsert: true },

	function(err, newEmployee){

		if(err){
			res.send('Oh! Something went grong :(');
		} else {
			console.log(newEmployee);
			res.send(newEmployee);
		}

	});
});


//Operación DELETE del servicio "employee" el cual borra el registro de UN empleado identificado por su _id
employee.delete('/employee/:id', function(req, res) {
	Employee.findOneAndRemove({
		_id: req.params.id
	}, function (err, employee){
		if(err){
			console.log(employee);
			res.send('Oh! Something went grong :(');
		} else {
			console.log(employee);
			res.send('Employee was deleted');
		}
	});
});
