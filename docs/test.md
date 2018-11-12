# *Test for QUp*
-------
## Test ID #1: Create Event
---- 
1. Start up the QUp app
2. Create account if you do not have an account created. Otherwise, login to app with credentials.
3. Once at the home screen, click the create event button in the upper right.
4. Type the name of your event in the name event text box i.e.: Test Event
5. Click the set location button
6. Place a marker on the map provided to set a location for your event
7. Click set location.
8. Click the select date field
9. Select a date for your event from the calendar provided i.e. November 10, 2018.
10. Select a time for your event from the clock provided i.e. 18:00.
11. After all of the event details fields have been populated, click the create event button.

## TestID #2: My Events
-----
1. Start up the QUp app
2. Create account if you do not have an account created. Otherwise, login to app with credentials.
3. Once at the home screen, click the MyEvents button in the upper right.
4. You should know see a lists of the events you have created.

## Test ID #3: Join Events
1. Start up the QUp app
2. Create account if you do not have an account created. Otherwise, login to app with credentials.
3. Once at the home screen, click the browse events button.
4. Select an event from the list on the screen.
5. Once the events details screen has come up for that particular event, click join event.
6. You have now joined this event and it can be viewed in the My Events screen.

## Test ID #4: Delete Event
---- 
1. Start up the QUp app
2. Create account if you do not have an account created. Otherwise, login to app with credentials.
3. Once at the home screen, click the create event button in the upper right.
4. Type the name of your event in the name event text box i.e.: Test Event
5. Click the set location button
6. Place a marker on the map provided to set a location for your event
7. Click set location.
8. Click the select date field
9. Select a date for your event from the calendar provided i.e. November 10, 2018.
10. Select a time for your event from the clock provided i.e. 18:00.
11. After all of the event details fields have been populated, click the create event button.
12. This should now bring up the home screen. Click the My Events button.
13. Once you see the list of your events, click the red "X" to the left of the event you wish to delete, and that should delete the event.

## Test ID #5: Browse Events
1. Start up the QUp app
2. Create account if you do not have an account created. Otherwise, login to app with credentials.
3. Once at the home screen, click the browse events button.
4. You should now see a list of the available events

## Test ID #6: Create an Account
1. Start up the QUp app
2. Allow Auth0 to open in a Google Chrome web browse
2. This will prompt you to create an account. Create an account through Auth0 or sign up and sign in automatically with a Google Account

## Test ID #7: Login to QUp
1. Start up the QUp app
2. Allow Auth0 to open in a Google Chrome web browse
2. This will prompt you to login to your account.
3. Enter your login credentials in the username and password fields

## Test ID #8: Access the API
1. Using postman, curl, a browser, program and hit the following urls.
    * Events: [GET]
        - https://104.248.112.100/events?id=[event_id]
        - https://104.248.112.100/events/near?lon=[longitude]&lat=[latitude]&dist=[distance in miles]
        - https://104.248.112.100/events?owner=[user_id]
    * Events: [PUT]
        - https://104.248.112.100/events/[event_id]
        Body: 
        ```json
        {
            "name" : "[event name]",
            "eventString" : "[description]",
            "time" : "[a time]",
            "members" : "[array of user ids]",
            "date" : "[a date]",
            "owner" : "[user id]",
            "loc" : {
                coordinates: [longitude, latitude]
            },
        }
        ```

    * Events: [POST]
        - https://104.248.112.100/events/[event_id]
        Body: [alter any field]
        ```json
        {
            "eventString" : "[new description]",
        }
        ```
    * Users: [GET]
        - https://104.248.112.100/users?id=[user_id]
        - https://104.248.112.100/users?email=[email]
    * Users: [PUT]
        - https://104.248.112.100/users?id=[user_id]
        - https://104.248.112.100/users?email=[email]
        Body:
        ```json
        {
            "name" : {
                "first": "first name",
                "last": "last name"
            },
            email: "[email]",
            status: "[status]",
        }
        ```
    * Users: [POST]
        - https://104.248.112.100/users?id=[user_id]
        - https://104.248.112.100/users?id=[email]
        Body: [alter any field]
        ```json
        {
            status: "[status]", 
        }
        ```

## Test Matrix

.|Test ID|1|2|3|4|5|6|7|8
---|---|---|---|---|---|---|---|---|---
User Story ID||||||||
1 | | | | | | |X| |
5 | | | | | | |X, Satisfied by creating an account through Auth0.| |
6 |X| | | | | | | |
7 |X| | | | | | | |
8 |X| | | | | | | |X
9 | |X| | | |X| | |
10| | | | | |X| | |
12| | | | | | | | |X
13| | | | | | | | |X
14| | | | | | |X| |
15| | | | | | | |X|
16| | | | | | | |X|
17| |X| | | |X| | |
19| | | | | | | |X|
20| | | X | | | | |
21| | | | | |X| | |X
22| | | | |X| | | |
23| |X| | | |X| |X|
24| | | | | | | |X|
25| | | | | |X| |X|
26|X| | | | | | | |
