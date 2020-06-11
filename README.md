# improved-sniffle

Create React App, Apollo and Jayson built with TypeScript.

## Getting started 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequsites

What things you need to run the software:

- Node.js (>=12.16.2)
- [Yarn](https://classic.yarnpkg.com/lang/en/) (~1.22.4)
- Docker
- docker-compose

### Build

Run postgre container
```
docker-compose up -d
```

Install deps
```
yarn install
```

Start in dev mode
```
yarn start
```

**or if you are lazy**

Make script executable
```
chmod +x ./build.sh
```

Run previous commands in one line
```
./build.sh
````
