const envoodoo = require('envoodoo')
const express = require('express')
const request = require('request-promise-native')
const cheerio = require('cheerio')
const app = express()
envoodoo()

const DATA_URL = `http://api.digitalnz.org/records.json?api_key=${process.env.API_KEY}&and[tag]=WW100+-+Official+war+series&and[primary_collection]=TAPUHI`
const image_url = id => `http://natlib.govt.nz/records/${id}`
const image_source_selector = '#content > img'

var image_metadata = {}

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api/image/:id', (req, res) => {
  if (req.params.id) {
    request(image_url(req.params.id))
    .then(html => {
      const $ = cheerio.load(html)
      if (!$(image_source_selector).length) {
        res.status(400)
        res.send({ message: 'could not find data' })
      } else {
        const link = $(image_source_selector).attr('src').replace(/resize=664/, /resize=10801080/)
        res.header('Content-Type', 'image/jpeg')
        return request(link).pipe(res)
      }
    })
    .catch(err => {
      console.error('failed to get related image', err)
      res.status(500)
      res.send({ message: 'we failed to get the related image for ' + req.params.id })
    })
  } else {
    res.status(400)
    res.send({ message: 'bad request' })
  }
})

app.get('/api/data.json', (req, res) => {
  res.header('content-type', 'application/json')
  res.send(image_metadata)
})

// frontload the datas
request(DATA_URL)
.then(datas => {
  image_metadata = datas
  console.log('loaded image metadata from ', image_metadata)
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.error('it broke when starting the server...!', err)
    }
    console.log('server listening on 0.0.0.0:' + process.env.PORT)
  })
})
.catch((err) => {
  console.error('wtf! failed to get image metadata', err)
})
