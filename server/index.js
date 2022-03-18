import express from 'express';
import fs from 'fs';

const app = express();
const port = 3690;

app.get('/gettree', (req, res) => {
	res.sendStatus(501);
});

app.put('/file', (req, res) => {
	res.sendStatus(501);
});

app.put('/folder', (req, res) => {
	res.sendStatus(501);
});

app.get('/file', (req, res) => {
	res.sendStatus(501);
});

app.get('/files', (req, res) => {
	res.sendStatus(501);
});

app.listen(port, () => {
  console.log(`private-cloud backend server initialized on port ${port}`)
});