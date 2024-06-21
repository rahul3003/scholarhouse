import EventForm from "@/components/forms/EventForm";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

export default function eventCreate() {
  return (
    <AdminLayout
      headContent={
        <Head>
          <Head>
            <title>Create Event</title>
            <meta property="og:image" content="/meta-image.png" />
          </Head>
        </Head>
      }
    >
      <main className="flex flex-col  w-full flex-1 px-4 text-center">
        <EventForm />
      </main>
    </AdminLayout>
  );
}
