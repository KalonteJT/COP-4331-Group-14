Sprint #1 - Design Draft
================================

Proposed Stack
--------------------------------

###Language(s)
   - JavaScript

###Tools 
   - React.JS     (JS)     -     Web (Splash Page)
   - React Native (JS)     -     Mobile (Android/iOS)
   - Node.js      (JS)     -     Web Services ()
   - MongoDB      (JSON)   -     DB
   

###TODO 
   - Look into oAuth
   - Look into JS
   - Look into [https://mlab.com/aws/](MLAB) for MongoDB
   - Look into RESTful Architecture 


Roles
---------------------------------

   1. *Product Owner:* [Unknown]
   2. *Scrum Master:* [Unknown]
   3. *Development Team:* [Unknown] [Unknown] [Unknown]

User Stories
---------------------------------

*UI*
   1. As a USER I want a Page/Screen that lists the "events/queues near me"
      - Validation: When I open the app a screen appears listing open events/queues

   2. As a USER I want to be able to refresh the list of "events/queues" near me
      - Validation: I can refresh the page in order to see new "events/queues"

   3. As a USER I want a button that allows me to create an event
      - Validation: When I press this button a screen appear allowing me to enter event details

   4. As a USER I want to be able to see when people have joined the queue that I'm in
      - Validation: I can see how many others are in my queue


Requirements / Tasks
---------------------------------

   1. Setup the DB (MongoDB)

   2. Determine messaging protocol (Setup JSON from client to DB)
         - Message flow: DB <--> Web Services <--> Client

   3. Create preliminary UI 
      - Show List of Events (Refresh on pull-down)
      - Create Event (and Push to DB)
