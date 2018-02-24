import * as express from 'express'
import * as bodyParser from 'bodyParser'
import * as knex from 'knex'

const knexConfig = require('../db/knexfile');
const db = knex(knexConfig);

const app = express();

app.use(bodyParser.urlencoded({ 'extended': true}))
app.use(bodyParser.json())

app.use(express.static('../client'))





const port = 4040;
app.listen(port)
console.log('Listening on port: ', port)

module.exports = app;
