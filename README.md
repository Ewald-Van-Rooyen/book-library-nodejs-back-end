# Book Library

Back end Nodejs server for the book library.

Best Practices followed
    *[Github](https://github.com/goldbergyoni/nodebestpractices)

## Installation
The installation of this project requires the system to have [Node.js](http://nodejs.org/) present

```bash
npm install
```

To create and setup the database, run the following command (Assuming mysql in present on the system)

```bash
npm run db:setup
```

## Run the application

To run the application, this will serve on PORT 4000

```bash
npm start
```

## Tests

Using this command will run the jest tests on a tests database.

```bash
npm test
```

## Documentation

When the application is running using the /api-docs url will display all the swagger documentation in the browser

## Disclaimers

* I could not setup docker due to me not having a linux system or Windows professional license, tried to do it online. To no avail
* Sometimes the tests fail due to testing of deleting Category and Author that has been assigned to a Book.
The book does sometimes not exists yet, so the response is a 204 and not a 500

## Technologies

* [Express](http://expressjs.com/) Nodejs web framework
* [CORS](https://github.com/expressjs/cors#readme) Cross origin resources support
* [Body-parser](http://expressjs.com/en/resources/middleware/body-parser.html) - Manipulate request body
* [Nodemon](https://www.npmjs.com/package/nodemon) Server loader
* [Morgan](https://github.com/expressjs/morgan) HTTP request logger middleware
* [Sequilize](https://sequelize.org/v3/) ORM for mysql (and other db types)
* [Sequilize-cli](https://github.com/sequelize/cli) Database generation
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) Password encryption
* [compression](https://www.npmjs.com/package/compression) For file size compression
* [helmet](https://www.npmjs.com/package/helmet) HTTP headers security
* [eslint](https://eslint.org) For styling and best practices

## License
[MIT](https://choosealicense.com/licenses/mit/)
