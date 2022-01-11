import { useEffect, useState } from 'react';
import { authentication, db } from "../../firebase";

var gapi = window.gapi;

function isEnabled(){
    db.collection('users').doc(authentication.currentUser.uid).get().then(doc => {
        return doc.data().dailyNotif;
    })
}

function addOneHour(time){
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];
    if(hour >= 23 ) {
        return "23:59";
    }
    const newHour = parseInt(hour) + 1;
    return `${newHour}:${minute}`;
}

function toBase32(str) {
  return str
    .toLowerCase()
    .replace(/w/g, '1')
    .replace(/x/g, '2')
    .replace(/y/g, '3')
    .replace(/z/g, '4')
    .toLowerCase();
}

function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const useGoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  //   const [access_token, setAccess_token] = useState();

  function signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  function createEvent(id, date) {
    const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      .access_token;

    if (!access_token) {
      signIn();
    }
    var timeZone = getTimeZone();

    console.log('id: ', id);
    console.log('id to base32: ', toBase32(id));

    var event = {
      id: toBase32(id),
      summary: 'NUEVO',
      start: {
        dateTime: `${date.toString()}T08:00:00`,
        // dateTime: `${date.toString()}T00:00:00`,
        timeZone,
      },
      end: {
        dateTime: `${date.toString()}T9:00:00`,
        // dateTime: `${date.add({ days: 1 }).toString()}T00:00:00`,
        timeZone,
      },
      //   reminders: {
      //     useDefault: false,
      //     overrides: [
      //       //   {'method': 'email', 'minutes': 24 * 60},
      //       //   { method: 'popup', minutes: 0 },
      //     ],
      //   },
    };

    var request = gapi.client.calendar.events.insert({
      resource: event,
      calendarId: 'primary',
    });

    request.execute(event => {
      console.log('event: ', event);
      console.log('event link: ', event.htmlLink);
    });
  }

  function updateEvent({ id, date, text, repeatTime, notifTime }) {
    console.log("repeatTime: ", repeatTime);

    const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      .access_token;

    if (!access_token) {
      signIn();
    }

    var timeZone = getTimeZone();

    var event = {
      summary: text,
      start: {
          dateTime: `${date.toString()}T${notifTime || '08:00'}:00`,
          // dateTime: `${date.toString()}T${notifTime || '00:00'}:00`,
        timeZone,
      },
      end: {
        dateTime: notifTime
          ? `${date.toString()}T${addOneHour(notifTime)}:00`
          : `${date.toString()}T09:00:00`,
        // dateTime: notifTime
        //   ? `${date.toString()}T${notifTime}:01`
        //   : `${date.add({ days: 1 }).toString()}T00:00:00`,
        timeZone,
      },
      recurrence:
        repeatTime && repeatTime !== 'never' && [
              repeatTime == '5 year'
                ? 'RRULE:FREQ=YEARLY;INTERVAL=5'
                : `RRULE:FREQ=${repeatTime.toUpperCase()}LY`,
            ],
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 0 }],
      },
    };

    var request = gapi.client.calendar.events.update({
      calendarId: 'primary',
      eventId: toBase32(id),
      resource: event,
    });

    request.execute(event => {
      console.log('event: ', event);
      console.log('event link: ', event.htmlLink);
    });
  }

  async function getEvents() {
    const _events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      // timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 50,
      orderBy: 'startTime',
    });
    setEvents(_events.result.items);
    return _events.result.items;
  }

  function signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  useEffect(() => {
    // var user = gapi.auth2.getAuthInstance().currentUser.get();
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });

      await gapi.client.load('calendar', 'v3');

      //   const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
      //   console.log('access_token: ', access_token);
    });
    // getEvents();
  }, []);

  return { events, signOut, signIn, createEvent, updateEvent, isEnabled };
};

export default useGoogleCalendar;
