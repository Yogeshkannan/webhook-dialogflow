const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-employees', (req, res) => {

    const reqUrl = 'https://reqres.in/api/users/2';
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const employees = JSON.parse(completeResponse);
			//console.log("Employeesss-->", employees)
            let dataToSend = "Employees list coming soon..."

            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: 'get-employees'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-employees'
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});