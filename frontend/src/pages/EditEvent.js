import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");
  const eventData = data.event;

  return <EventForm event={eventData} method="PATCH" />;
};

export default EditEventPage;
