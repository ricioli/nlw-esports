import express from 'express'

const app = express()

app.get('/ads', (request, response) => {
  response.json({teste: 2})
});

app.listen(3333)
