const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/getEmployees', (req, res) => {

    const reqUrl = 'http://bf52c5a8.ngrok.io/users/_search';
    request(reqUrl, function(error, responseFromAPI, body) {
		if (error) {
			console.log("ERR:", error);
		} else {
			var employees = JSON.parse(body).hits.hits;
			var employeeList = [];
			
			for (var i = 0; i < employees.length; i++) {
				employeeList.push(employees[i]._source.name);
			}
		
            let dataToSend = "Employees are " + employeeList.toString();

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