## [Dormitory Management System](https://github.com/guyfrommilkyway/Dormitory-Management-System)

<p>
An application design and develop to help dormitory owners and maintenance personnel manage the day-to-day operations of their dormitories.
<br><br>
This project was a partial fulfillment for the requirements of BSCOE-ELEC2 - Database Management System.
</p>

---

### Web Technologies

- HTML5
- CSS3
- JavaScript
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Handlebars.js](https://handlebarsjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Material Design for Bootstrap](https://mdbootstrap.com/)
- Icons from [Material Design](https://material.io/resources/icons/?style=baseline)

### Download and Install on your PC

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Redis](https://redis.io/download)

### Setup Database

- Create a folder that will be used as a database storage.
- Run mongoDB in the terminal.

```
$ mongod --dbpath <your database folder path>
```

```
Example:

$ mongod --dbpath ~/Documents/mongodb-database
```

### Setup Redis

- Run redis-server in the terminal:

```
$ redis-server --port <your port>
```

```
Example:

$ redis-server --port 6380
```

### Setup Application

- Clone this repository and install the dependencies:

```bash
$ git clone https://github.com/guyfrommilkyway/Dormitory-Management-System.git
$ cd Dormitory-Management-System
$ npm i
```

- Create a file named 'config.env'.

```
Dormitory-Management-System
└───public
└───src
└───views
│   .gitignore
│   config.env
│   package-lock.json
│   package.json
│   README.md
```

- Paste this code inside the 'config.env' file:

```
PORT=<your port>
REDIS_HOST=<localhost>
REDIS_PORT=<your redis port>
MONGODB_URL=mongodb://localhost:<mongodb port>/<your database name>
JWT_SECRET=<some random strings>
COOKIE_SECRET=<some random strings>
```

```
Example:

PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6380
MONGODB_URL=mongodb://localhost:27017/dormitory-management-system
JWT_SECRET=nIqxawqgGFcYwIUeCyeWCaQcxREFiV
COOKIE_SECRET=cIBdzoGyyiMFgVQehkGQLJdAFedZxG
```

- Run the application in the terminal.

```
$ npm run dev
```

```
Note:

You have to run mongodb and redis first before running the application.
Otherwise, it will show an error message.

```

- Finally, you can view and use the application by going to:

```
localhost:<your port>
```

```
Example:

localhost:3000
```
