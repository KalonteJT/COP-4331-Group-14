RESTFul API Documentation
==========================

**Overview:** The following serves as a cheat-sheet for the QUp REST API. 


Structure
==========================

The file structure can be found under the backup folder.

* [server.js](https://github.com/KalonteJT/COP-4331-Group-14/blob/master/backend/server.js)
   - Server definition and entrypoint
* [routes/users.js](https://github.com/KalonteJT/COP-4331-Group-14/blob/master/backend/routes/users.js)
   -  Contains USER endpoints
* [routes/events.js](https://github.com/KalonteJT/COP-4331-Group-14/blob/master/backend/routes/events.js)
   - Contains EVENT endpoints
* [package.json](https://github.com/KalonteJT/COP-4331-Group-14/blob/master/backend/package.json)
   - Defines the npm dependencies for the API


Building & Running
=========================

Prerequisites
-------------------------

**Required:**
   * [Node.js](https://www.nodejs.org)   - Serverside Javascript Runtime
   * [NPM](https://www.npmjs.com)       - Node.js Package Manager

**Recommended**
   * A Browser   - Preferably yours.
   * [CURL](https://curl.haxx.se)   - Hitting the API from your terminal.


Instructions
-------------------------

0. Ensure the required Prerequisites have been satisfied.
1. Navigate to the backend folder from your local terminal
2. Run the following in order:

```szh
# Installs the dependencies outlined in package.json
npm install

# Starts the RESTAPI
node server.js
```

At this point, you should see the message `Server running at: http://localhost:3000`. To change the hosted port, see [server.js](https://github.com/KalonteJT/COP-4331-Group-14/blob/master/backend/server.js).


Testing
-------------------------

Routes (endpoints) are defined in their respective files. The following is an example of how to test them. Ensure the previous instructions were followed and you have access to a web browser and/or curl


### Events

**Get a list of events**
```zsh
# In Browser: localhost:3000/events
curl -X GET -d http://localhost:3000/events
```

**Get a specific event (Will Change)** 
```zsh
# In Browser: localhost:3000/events/[event name]
# Hint: try final_space
curl -X GET -d http://localhost:3000/events/final_space
```

**Create an event (Will Change)**
```zsh
# Hint: try event=mike
curl -X PUT -d event=[an event] http://localhost:3000/events
```

**Update an event (Will Change)**
```zsh
# Hint: try event=mike
curl -X POST -d event=[an event] http://localhost:3000/events
```

**Delete an event (Will Change)**
```zsh
# Hint: try event=mike
curl -X DELETE -d event=[an event] event=[an event] http://localhost:3000/events
```


### Users

**Get a list of users**
```zsh
# In Browser: localhost:3000/users
curl -X GET -d http://localhost:3000/users
```

**Get a specific user (Will Change)**
```zsh
# In Browser: localhost:3000/users/[a user name]
curl -X GET -d http://localhost:3000/users/[a user name]
```

... 

*Note:* Have fun.
