import EventsCard from "@/components/events/eventCard.";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

const Events = () => {
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || event</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex flex-col gap-3 py-2 w-full px-6 ">
        <div className="flex items-end justify-end w-full">
          <Button variant="contained">Create</Button>
        </div>
        <div>
          {/* <Typography className="text-[14px] font-semibold">
            Live event
          </Typography> */}
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 px-3 py-2 gap-6">
            <EventsCard/>
            <EventsCard/>
            <EventsCard/>
            <EventsCard/>
            <EventsCard/>
            <EventsCard/>
            <EventsCard/>
          </div>
        </div>
     
      </div>
    </AdminLayout>
  );
};

export default Events;
