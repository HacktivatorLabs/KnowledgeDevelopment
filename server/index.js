import * as express from 'express'
import * as bodyParser from 'bodyParser'
import * as knex from 'knex'

const knexConfig = require('../db/knexfile');
const db = knex(knexConfig);

const app = express();

app.use(bodyParser.urlencoded({ 'extended': true}))
app.use(bodyParser.json())

app.use(express.static('../client'))


// TODO: API   ===========================================
  // AUTHENTICATE

    // POST request to API


  // AUTHORIZE

    // POST request to create new USER


// TODO: SERVER TO DATABASE ROUTES  ===========================================



  // POST request to insert new card
app.post('/cards', (req, res) => {
  let data = req.body;
  return db('cards')
    .insert({
      title: data.title,
      description: data.description,
      url: data.url,
      status: data.status,
      user_id: data.user_id,
      taxon_id: data.taxon_id
    })
    .then(data => res.send(data))
    .catch(err => console.error(err));
})

  // PUT request to update existing card
app.post('/cards', (req, res) => {
  let data = req.body;
  return db('cards')
    .where({
      id: data.id
    })
    .update({
      title: data.title,
      description: data.description,
      url: data.url,
      status: data.status
    })
    .then(data => res.send(data))
    .catch(err => console.error(err));
})

  // DELETE request to delete existing card
    // use .del()
app.put('/cards', (req, res) => {
  let data = req.body;
  return db('cards')
    .where({
      id: data.id
    })
    .del()
    .then(data => res.send(data))
    .catch(err => console.error(err));
})

  // GET request to retrieve * from CARDS where CARDS.USER_ID = {user} && CARD.STATUS from CARDS with (STATUS)
    // used to populate lists and cards on login
app.get('/cards', (req, res) => {
  let data = req.body;
  return db('cards')
    .where({
      status: req.body.status,
      user_id: req.body.user_id
    })
    .select('*')
    .then(data => res.send(data))
    .catch(err => console.error(err));
})

  // GET request to taxonomy
    // used to populate taxonomy for nav
app.get('/taxonomy', (req, res) {
  return db('taxonomy')
    .select('*')
    .then(data => res.send(data))
    .catch(err => console.error(err));
})

const port = 4040;
app.listen(port)
console.log('Listening on port: ', port)

module.exports = app;
