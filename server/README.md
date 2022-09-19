# Back-end

## Entidades
  - Um Game pode ter vários anúncios (ADS);

### Game
  - id;
  - title;
  - bannerUrl;

### ADS (Anúncio)
  - id;
  - gameId (id do jogo, id da entidade game);
  - name (nome da pessoa/nickname no jogo);
  - yearsPlaying;
  - discord;
  - weekDays;
  - hourStart;
  - hourEnd;
  - useVoiceChannel;
  - createdAt;

## Casos de uso

- Listagem dos games;
- Publicar novos anúncios;
- Listagens de anúncios de acordo com o jogo;
- Buscar discord pelo ID do anúncio;

## ⚒ Tecnologias

- Node;
- Express;
- Cors;
- Prisma ORM com SQLite;