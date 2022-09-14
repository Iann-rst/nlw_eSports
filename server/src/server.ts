import express, { response } from 'express'

const app = express();

// www.minhaapi.com/ads


/* 
  HTTP methods / API RESTful / HTTP Codes
  GET, POST, PUT, PATCH, DELETE

  Query: localhost:3333/ads?page=2
  Route: localhost:3333/ads/5
  Body: as informações passadas são usadas na requisição
*/


//rota de listagem de games
app.get('/games', (request, response) => {
  return response.json([]);
})


//rota para criação de anúncios
app.post('/ads', (request, response) => {
  return response.status(201).json([]);
})


//rota para listar os anúncios de uma game especifico
app.get('/games/:id/ads', (req, res) => {
  //const gameId = req.params.id;


  return res.json([
    {
      id: 1, name: 'Anúncio 1'
    },
    {
      id: 2, name: 'Anúncio 2'
    },
    {
      id: 3, name: 'Anúncio 3'
    },
    {
      id: 4, name: 'Anúncio 4'
    },
  ])
})

//Buscar o discord pelo id do anúncio
app.get('/ads/:id/discord', (request, response) => {
  return response.json([])
})

app.listen(3333);