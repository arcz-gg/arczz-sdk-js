# Arczz SDK for JavaScript | Typescript

> A simple and easy to uese client for the Arczz API

## Instalation

```
pnpm i @arczz/sdk
```

## Usage

> Get Arczz [here 😉](https://killian-moudery.fr) to get started with the Arczz API.

Import and initialize the client using an **Auth Token** pr en OAuth **access token**

```ts
import { Client } from '@arczz-dev/client';
const client = new Client({
    auth: process.env.API_TOKEN
});
```
