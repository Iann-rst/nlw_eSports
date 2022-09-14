# Back-end

## Entidades
  - 1 Game pode ter vários anúncios (ADS);

### Game
  - id;
  - title;
  - bannerUrl;

### ADS
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


 ##### Estudar qual a melhor forma de salvar no banco de dados
 - Salvar as horas em minutos!
 - Lidar com datas (fuso horário / formatos diferentes);
 - Lidar com pontos flutuantes;

## Casos de uso

- Listagem dos games;
- Publicar novos anúncios;
- Listagens de anúncios de acordo com o jogo;
- Buscar discord pelo ID do anúncio;