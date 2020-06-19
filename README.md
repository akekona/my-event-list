# My EVENT LIST

<img src="src/assets/logo.png" alt="my EVENT LIST logo" style="width:30%; float:right">

View the live demo here: [LINK to My EVENT LIST](https://myevent-list.herokuapp.com/)

## About

A single page application to add, view, edit, and remove personal event reminders created by the user.  
A login feature was implemented using vuex state management and session storage.  
Password encrypted using [bcryptjs](https://www.npmjs.com/package/bcryptjs).

## API Endpoints

| Method | Endpoint              | Req Params |                                                           Req Body |                                                                 Expected Outcome |
| :----: | --------------------- | ---------: | -----------------------------------------------------------------: | -------------------------------------------------------------------------------: |
|  GET   | /api/users/           |       None |                                                               None |                                              Retrieve all entries in users table |
|  GET   | /api/events/          |       none |                                                               None |                                             Retrieve all entries in events table |
|  GET   | /api/users/:username/ |   username |                                                               None |      Retrieve single entry in users table request param matches username col val |
|  GET   | /api/events/:id/      |    user_id |                                                               None | Retrieve all entries in events table where request param matches user_id col val |
|  POST  | /api/events/:id/      |    user_id |                New event object (event_name, date, time, location) |                              Add new entry to events table for specified user_id |
|  POST  | /api/users/           |       None | New user object (first_name, last_name, unique username, password) |                                Add new entry to users table and generate user_id |
|  PUT   | /api/events/:id/      |   event_id |            Updated event object (event_name, date, time, location) |               Replace values of specified cols in existing entry of events table |
|  DEL   | /api/events/:id/      |   event_id |                                                               None |     Delete entry from events table where request params matches event_id col val |

## Technologies used

- [Node.js](https://nodejs.org/en/)
- [Vue.js](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Knex](http://knexjs.org/)
- [Express](https://expressjs.com/)
- [Postgresql](https://www.postgresql.org/docs/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Heroku](https://heroku.com/)
