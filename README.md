## Installation

```bash
$ npm install
```

## Create .env.*
cat <<EOF> .env.test
DB_NAME=test.sqlite
COOKIE_KEY=ajdfkl
EOF

## Running the app

```bash
# development
$ npm run start:test

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## License

Nest is [MIT licensed](LICENSE).
