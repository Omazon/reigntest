<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
# Reign Test Nestjs
#### Test for Reign from Omar Boza
#### Eslint certificate, you can see setting in .eslintrc.js

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## API Reference
If it local, you should localhost:3000, if you use Docker, you should localhost:8080

#### You can use the postman file including in repo
#### Database is MongoAtlas
#### There is a cron, the main API call exec every hour

#### Get all items

```http
  GET /news/get-product-from-api
```
The first call, this call News API and save them into DATABASE

#### Get item

```http
  GET /news?page=2&limit=2?author=jrjaadoo&tag=comment&title=hiring
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | If you want page 1 or 2, it's paginated |
| `limit`      | `number` | Default is 5, you can receive data wherever you like |
| `author`      | `string` | Find using author name |
| `tag`      | `string` | The news API has a array as tag, you can find them wrinting one of them |
| `title`      | `string` | You can find using title, the News API has a title as null, you can use 'story_title' indead |

#### Delete item

```http
  GET /news/delete?productID=30946190
```
##### The documents dont't delete completely from DB, use a flag, isActive true as default, using the "Get all items" endpoint, you only see isActive true
#### When a document is deleted, isActive false
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productID`      | `number` | Use ObjectID, not ID |

## Dockerize
There is a file with all setting, use the following commands

```http
cd..
docker build .\reigntest -t omar-reign/nestjs-dockerize
docker run -p 8080:3000 omar-reign/nestjs-dockerize
```
Where "reigntest" is where the files are.
localhost:8080 is the final URL using Docker

## Swagger
#### You can play in api/docs :)