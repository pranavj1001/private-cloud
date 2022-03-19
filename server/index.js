const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const app = express();
const port = 3690;
const storageRootFolder = path.join(__dirname, '../storage');
const successResponse = {
	status: 200,
	statusMessage: "OK",
	resp: {}
}
const errorResponse = {
	status: 500,
	statusMessage: "Error",
	resp: {}
}
const getAndPrintErrorString = (url, error) => {
	const errorString = `Exception occurred at ${url}, Details \n ${util.inspect(error)}`;
	console.error(errorString);
	return errorString;
};

app.get('/gettree', (req, res) => {
	try {
		const folderPath = req.query.path ? path.join(storageRootFolder, req.query.path) : storageRootFolder;
		res.json({...successResponse, resp: fs.readdirSync(folderPath)});
	} catch(e) {
		res.json({...errorResponse, resp: getAndPrintErrorString(req.url, e)});
	}
});

app.put('/file', (req, res) => {
	res.sendStatus(501);
});

app.put('/folder', (req, res) => {
	res.sendStatus(501);
});

app.get('/file', (req, res) => {
	try {
		const filePath = req.query.path ? path.join(storageRootFolder, req.query.path) : storageRootFolder;
		res.download(filePath);
	} catch(e) {
		res.json({...errorResponse, resp: getAndPrintErrorString(req.url, e)});
	}
});

app.get('/files', (req, res) => {
	res.sendStatus(501);
});

app.listen(port, () => {
  console.log(`private-cloud backend server initialized on port ${port}`)
});