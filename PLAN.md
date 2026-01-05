# Plan #

## Backend ##

### API ###


**[POST]** 
Pubs add themselves to events - meaning they appear when an event is searched for

`/api/v1/event-showings`

**[GET]**
Pubs can search for upcoming events, which will then allow them to select themselves as showing

`/api/v1/events`

**[DELETE]**
Pub can remove themselves from the list of places showing an event

`/api/v1/pub/event/{event_id}`

---

**User Endpoints**

**[GET]**
User can search for nearby pubs

`/api/v1/pubs`

**[GET]**
User can see a specific pub

`/api/v1/pubs/{pub\_id}`


---

### Frontend ###

**Components**

**Search For Pubs**

- Search bar to search for pubs
- Typeahead dropdown
- Display: Pub Name, Location, Distance, View-Btn
- [STRETCH]: Fetch user location to sort by distance

---

**Search For Events**

- Search bar to search for events
- Typeahead dropdowmn
- Display: Event Name, Date, Time, View-Btn
- Filtering: Upcoming, Sport etc
- Tab from ListView to MapView

---

**Show Event**

- Name
- Date
- Time
- Countdown till event
- [STRETCH]: Click to search for nearby pubs that are displaying the event

---

**Show Pub**

- Name
- Distance (through Longitude, Latitude)
- List all events pub is displaying
- Follow Pub
