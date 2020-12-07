# 2048-vue

### About

a clone of 2048 game

### Technology stack

- Vue 2
- Vuex
- Vanilla JavaScript

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run test

```
npm run test:unit
```


### Features

- a simple 4x4 grid that is randomly populated with two tiles

- Move the tiles when user presses arrow keys

- Generate new tiles for every turn

- Merge two colliding tiles into one

- Touch/mobile support

- Display a message when the game is ‘won’ or 'game over'

```
 tiles: [
   { row: 0, column: 0, value: 2 },
   { row: 0, column: 1, value: 4 },
   { row: 0, column: 2, value: 8 },
   { row: 0, column: 3, value: 16 },
   { row: 1, column: 0, value: 32 },
   { row: 1, column: 1, value: 64 },
   { row: 1, column: 2, value: 128 },
   { row: 1, column: 3, value: 256 },
   { row: 2, column: 0, value: 512 },
   { row: 2, column: 1, value: 1024 },
   { row: 2, column: 2, value: 2048 },
   { row: 2, column: 3, value: 4096 },
   { row: 3, column: 0, value: 8192 },
   { row: 3, column: 1, value: 16384 },
   { row: 3, column: 2, value: 32768 },
   { row: 3, column: 3, value: 65536 },
 ],


 grids: [
   [2, 4, 8, 16],
   [32, 64, 128, 256],
   [512, 1024, 2048, 4096],
   [8192, 16384, 32768, 65536],
 ],
```
