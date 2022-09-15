import express, { query } from 'express'
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinuteToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json()); //permite o express a entender informações em json 
app.use(cors());//aberto para todos os front-end fazer requisição

const prisma = new PrismaClient({
  log: ['query']
});

// www.minhaapi.com/ads


/* 
  HTTP methods / API RESTful / HTTP Codes
  GET, POST, PUT, PATCH, DELETE

  Query: localhost:3333/ads?page=2
  Route: localhost:3333/ads/5
  Body: as informações passadas são usadas na requisição
*/


//rota de listagem de games
app.get('/games', async (request, response) => {

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games);
})


//rota para criação de anúncios (um anuncio sempre tem um jogo)
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);
})


//rota para listar os anúncios de uma game especifico
app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinuteToHourString(ad.hourStart),
      hourEnd: convertMinuteToHourString(ad.hourEnd),

    }
  }))
})

//Buscar o discord pelo id do anúncio
app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId
    }
  })

  return response.json({
    discord: ad.discord,
  })
})

app.listen(3333);