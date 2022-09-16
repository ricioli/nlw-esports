import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import convertHourStringToMinutes from './utils/convert-hour-string-to-minutes';
import convertsMinuteToHourString from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json({ data: games });
});

app.post('/games/:id/ads', async (request, response) => {
  const { id: gameId } = request.params;
  const { body } = request;

  // validação com zod.js

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
    },
  });

  return response.json({
    data: {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertsMinuteToHourString(ad.hourStart),
      hourEnd: convertsMinuteToHourString(ad.hourEnd),
    },
  });
});

app.get('/games/:id/ads', async (request, response) => {
  const { id: gameId } = request.params;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json({
    data: ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertsMinuteToHourString(ad.hourStart),
      hourEnd: convertsMinuteToHourString(ad.hourEnd),
    })),
  });
});

app.get('/ads/:id/discord', async (request, response) => {
  const { id: adId } = request.params;
  const discord = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({ data: discord });
});

app.listen(3333);
