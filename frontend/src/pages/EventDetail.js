import React from "react";
import {
  useParams,
  json,
  useLoaderData,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  //const { eventId } = useParams();
  //const data = useLoaderData();
  const data = useRouteLoaderData("event-detail");
  const eventData = data.event;

  return <EventItem event={eventData} />;
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const { eventId } = params;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
};

export const action = async ({ request, params }) => {
  const { eventId } = params;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
};

//using defer, await, suspense and so for its work, we nedd to change in components->EventsList.js-> <Link to={`/events/${event.id}`}>

// import { Suspense } from 'react';
// import {
//   useRouteLoaderData,
//   json,
//   redirect,
//   defer,
//   Await,
// } from 'react-router-dom';

// import EventItem from '../components/EventItem';
// import EventsList from '../components/EventsList';

// function EventDetailPage() {
//   const { event, events } = useRouteLoaderData('event-detail');

//   return (
//     <>
//       <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
//         <Await resolve={event}>
//           {(loadedEvent) => <EventItem event={loadedEvent} />}
//         </Await>
//       </Suspense>
//       <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
//         <Await resolve={events}>
//           {(loadedEvents) => <EventsList events={loadedEvents} />}
//         </Await>
//       </Suspense>
//     </>
//   );
// }

// export default EventDetailPage;

// async function loadEvent(id) {
//   const response = await fetch('http://localhost:8080/events/' + id);

//   if (!response.ok) {
//     throw json(
//       { message: 'Could not fetch details for selected event.' },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.event;
//   }
// }

// async function loadEvents() {
//   const response = await fetch('http://localhost:8080/events');

//   if (!response.ok) {
//     // return { isError: true, message: 'Could not fetch events.' };
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//     //   status: 500,
//     // });
//     throw json(
//       { message: 'Could not fetch events.' },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.events;
//   }
// }

// export async function loader({ request, params }) {
//   const id = params.eventId;

//   return defer({
//     event: await loadEvent(id),
//     events: loadEvents(),
//   });
// }

// export async function action({ params, request }) {
//   const eventId = params.eventId;
//   const response = await fetch('http://localhost:8080/events/' + eventId, {
//     method: request.method,
//   });

//   if (!response.ok) {
//     throw json(
//       { message: 'Could not delete event.' },
//       {
//         status: 500,
//       }
//     );
//   }
//   return redirect('/events');
// }
