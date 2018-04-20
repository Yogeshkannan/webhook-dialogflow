const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/getEmployees', (req, res) => {

    const reqUrl = 'https://reqres.in/api/users/2';
    request(reqUrl, function(error, responseFromAPI, body) {
		if (error) {
			console.log("ERR:", error);
		} else {
			const employees = JSON.parse(body);
			//console.log("Employeesss-->", employees)
            let dataToSend = "Employees list coming soon..."

            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: 'get-employees'
            });
		}
        
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});