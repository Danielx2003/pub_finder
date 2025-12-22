# Plan #

## Backend ##

### API ###

** Pub Endpoints **

**[POST]** 
Pubs add themselves to events - meaning they appear when an event is searched for

`/api/v1/event-showings`

**[GET]**
Pubs can search for upcoming events, which will then allow them to select themselves as showing

`/api/v1/events`

**[DELETE]**
Pub can remove themselves from the list of places showing an event

`/api/v1/pub/event/{event_id}

---

** User Endpoints **

**[GET]**
User can search for nearby pubs

`/api/v1/pubs`

**[GET]**
User can see a specific pub

`/api/v1/pubs/{pub\_id}`

