import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { authentication, db } from '../../firebase';
import useLocalStorage from './useLocalStorage';

// var gapi = window.gapi;

function addOneHour(time) {
  const hour = time.split(':')[0];
  const minute = time.split(':')[1];
  if (hour >= 23) {
    return '23:59';
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
  const [token, setToken] = useLocalStorage('access_token', null);

  async function isEnabled() {
    const res = await db.collection('users').doc(authentication.currentUser.uid).get();

    const data = await res.data().dailyNotif;

    return data;
  }

  async function signIn() {
    await gapi.auth2.getAuthInstance().signIn();
    // const new_access_token = await gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
    const new_access_token = await gapi.auth.getToken()
    console.log('new_access_token', new_access_token);
    setToken(new_access_token);
  }

  function signOut() {
    gapi.auth2.getAuthInstance().signOut();
    setToken(null);
  }

  async function createEvent(id, date) {
    // const access_token = await gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
    const access_token = await gapi.auth.getToken()
    console.log('access_token', access_token);
    console.log('token', token);

    if (!token) {
      await signIn();
    }

    if (true) {
      // await gapi.auth2.setToken(access_token);
      await gapi.auth.setToken(access_token);
      // await gapi.client.setToken(access_token);
      // await gapi.auth.setToken({access_token: token });
      // await gapi.client.setToken({access_token: token});

      const new_access_token = await gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse();
      console.log('new_access_token', new_access_token);
    }
    var timeZone = getTimeZone();

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

  async function updateEvent({ id, date, text, repeatTime, notifTime }) {
    console.log('token en updateEvent: ', token);

    const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      .access_token;

    if (!token) {
      await signIn();
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
      recurrence: repeatTime &&
        repeatTime !== 'never' && [
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

  async function deleteEvent(id) {
    const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      .access_token;

    if (!token) {
      await signIn();
    }

    var request = gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId: toBase32(id),
    });

    request.execute();
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

  //   useEffect(() => {
  //     if (token) {
  //       gapi.auth?.setToken(token);
  //     }

  //     // var user = gapi.auth2.getAuthInstance().currentUser.get();
  //     gapi.load('client:auth2', async () => {
  //       await gapi.client.init({
  //         apiKey: process.env.NEXT_PUBLIC_API_KEY,
  //         clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  //         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  //         scope: 'https://www.googleapis.com/auth/calendar.events',
  //       });

  //       gapi.client.load('calendar', 'v3');

  //       //   const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
  //       console.log('token: ', token);
  //     });
  //     // getEvents();
  //   }, [token]);

  useEffect(() => {

    gapi.load('client', async () => {
      await gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      await gapi.client.load('calendar', 'v3');

      console.log('loaded');

      // if (token) {
      //   console.log("set token ", token);
      //   gapi.auth.setToken(token);
      // }
    });
  }, []);

  return { events, signOut, signIn, createEvent, updateEvent, deleteEvent, isEnabled };
};

export default useGoogleCalendar;
