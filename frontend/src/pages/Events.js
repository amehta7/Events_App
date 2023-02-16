import React, { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

const EventsPage = () => {
  //const data = useLoaderData();
  const { events } = useLoaderData();

  //   if (data.isError) {
  //     return <p>{data.message}</p>;
  //   }
  //const eventsData = data.events;

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const data = await response.json();
    return data.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
