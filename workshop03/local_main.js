const { join } = require('path');
const fs = require('fs');
// load library eTag
const preconditions = require('express-preconditions')

const cors = require('cors');
const range = require('express-range')
const compression = require('compression')

const { Validator, ValidationError } = require('express-json-validator-middleware')
const OpenAPIValidator = require('express-openapi-validator').OpenApiValidator;

const schemaValidator = new Validator({ allErrors: true, verbose: true });

const express = require('express')

const data = require('./zips')
const CitiesDB = require('./zipsdb')

//Load application keys
const db = CitiesDB(data);

const app = express();

//diasable express etag
app.set('etag',false)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start of workshop

// TODO 1/2 Load schemans
new OpenAPIValidator({
  apiSpec: join(__dirname, 'schema', 'zips.yaml')
}).install(app)
  .then(() => {
    // workshop02
    app.get('/api/states',
      (req, resp) => { //handler
        const result = db.findAllStates();
        // console.log(result)
        // status code
        resp.status(200)
        //set content type
        resp.type('application/json')
        resp.set('Cache-Control', "public, max-age=300")
        resp.set('X-generated-on', (new Date()).toDateString())
        resp.set('Acess-Conrol-Allow-Origin', '*')
        resp.json(result)
      }
    )

    const options = {
      stateAsync: (req) => {
        const state = req.params.state
        const limit = parseInt(req.query.limit) || 10
        const offset = parseInt(req.query.offset) || 0
        console.log('hello')
        return Promise.resolve({
          etag: `"${state}_${offset}_${limit}"`
        })
      }
    }



    // TODO GET /api/state/:state
    //Get /api/state/CA state=CA
    app.get('/api/state/:state',
      preconditions(options),
      (req, resp) => { //handler
        // Read the value from the route :state
        const state = req.params.state
        // Read te query string
        const limit = parseInt(req.query.limit) || 3;
        const offset = parseInt(req.query.offset) || 1;
        // 10 result from the top
        const result = db.findCitiesByState(state,
          { offset, limit })
        // {offset: offset,limit:limit})}
        resp.status(200)
        //set content type
        resp.type('application/json')
        resp.set('X-generated-on', (new Date()).toDateString())
        resp.set('Acess-Conrol-Allow-Origin', '*')
        resp.set('ETag', `"${state}_${offset}_${limit}"`)
        resp.json(result)
      }
    )

    // TODO GET /api/city/:cityId
    app.get('/api/cityId/:cityId',
      (req, resp) => { //handler
        const cityId = req.params.cityId
        const result = db.findCityById(cityId)
        // status code
        resp.status(200)
        //set content type
        resp.type('application/json')
        resp.set('X-generated-on', (new Date()).toDateString())
        resp.set('Acess-Conrol-Allow-Origin', '*')
        resp.json(result)
      }
    )

    // TODO POST /api/city
    app.post('/api/city',
      (req, resp) => { // handler
        const body = req.body
        //			console.info ('body =', body)
        /*       if (!db.validateForm(body)) {
                 resp.status(400)
                 resp.type('application/json')
                 resp.json({ 'message': 'incomplete form' })
                 console.info('valid =', 'no')
                 return
               }
       */
        //      reformat location
        //       const array = body['loc'].split(',').map(Number)
        //       body['loc'] = array
        //       console.info('body =', body['loc'])
        db.insertCity(body)
        resp.status(201)
        resp.type('application/json')
        resp.json({ 'message': 'created' })
      }
    )

    app.use('/schema', express.static(join(__dirname, 'schema')));

    app.use((error, req, resp, next) => {

      if (error instanceof ValidationError) {
        console.error('Schema validation error: ', error)
        return resp.status(400).type('application/json').json({ error: error });
      }

      else if (error.status) {
        console.error('OpenAPI specification error: ', error)
        return resp.status(400).type('application/json').json({ error: error });
      }

      console.error('Error: ', error);

      resp.status(400).type('application/json').json({ error: error });

    })

    const PORT = parseInt(process.argv[2] || process.env.APP_PORT) || 3040;
    app.listen(PORT, () => {
      console.info(`Application started on port ${PORT} at ${new Date()}`);
    });
  })
  .catch(error => {
    console.log("error", error)

  })


// Start of workshop
// TODO 2/2 Copy your routes from workshop02 here

// End of workshop
