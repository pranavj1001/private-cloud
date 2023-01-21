const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const fs = require('fs');
const path = require('path');
const util = require('util');

const port = 3690;
const storageRootFolder = path.join(__dirname, '../storage');
const SUCCESS_HTTP_CODE = 200;
const SERVER_ERROR_CODE = 500;
const BAD_REQ_ERROR_CODE = 400;
const successResponse = {
	status: SUCCESS_HTTP_CODE,
	statusMessage: "OK",
	resp: {}
}
const errorResponse = {
	status: SERVER_ERROR_CODE,
	statusMessage: "Error",
	resp: {}
}

const app = express();
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : `${storageRootFolder}/tmp`,
	createParentPath: true,
	limits: { fileSize: 50 * 1024 * 1024 }
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const getAndPrintErrorString = (url, error) => {
	const errorString = `Exception occurred at ${url}, Details \n ${util.inspect(error)}`;
	console.error(errorString);
	return errorString;
};

app.get('/gettree', (req, res) => {
	try {
		const folderPath = req.query.path ? path.join(storageRootFolder, req.query.path) : storageRootFolder;
		res.status(SUCCESS_HTTP_CODE).json({...successResponse, resp: fs.readdirSync(folderPath)});
	} catch(e) {
		res.status(SERVER_ERROR_CODE).json({...errorResponse, resp: getAndPrintErrorString(req.url, e)});
	}
});

app.post('/file', (req, res) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			res.status(BAD_REQ_ERROR_CODE).json({...errorResponse, status: BAD_REQ_ERROR_CODE, resp: `No files were uploaded.`});
			return;
		}
		const folderPath = req.query.path ? path.join(storageRootFolder, req.query.path) : storageRootFolder;

		for (const key in req.files) {
			console.log(key);
			const file = req.files[key];
			const uploadPath = `${folderPath}/${file.name}`;
			file.mv(uploadPath, (err) => {
				if (err) {
					res.status(SERVER_ERROR_CODE).json({...errorResponse, resp: `Error occurred while uploading ${file.name} on ${uploadPath}`});
					return;
				}
				console.log(`File: ${file.name} was successfully uploaded on ${uploadPath}`);
				res.status(SUCCESS_HTTP_CODE).json({...successResponse, resp: 'File was successfully uploaded'});
			})
		}
	} catch(e) {
		res.status(SERVER_ERROR_CODE).json({...errorResponse, resp: getAndPrintErrorString(req.url, e)});
	}
});

app.post('/createfolder', (req, res) => {
	res.sendStatus(501);
});

app.get('/file', (req, res) => {
	try {
		const filePath = req.query.path ? path.join(storageRootFolder, req.query.path) : storageRootFolder;
		res.download(filePath);
	} catch(e) {
		res.status(SERVER_ERROR_CODE).json({...errorResponse, resp: getAndPrintErrorString(req.url, e)});
	}
});

app.get('/files', (req, res) => {
	res.sendStatus(501);
});

app.listen(port, () => {
  console.log(`private-cloud backend server initialized on port ${port}`)
});