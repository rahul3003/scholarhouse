import { MyProfileDiv } from "@/components/MyProfileDiv/MyProfileDiv";
import AdminLayout from "@/components/layout/AdminLayout";
import { selectUser } from "@/store/features/userSlice";

import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log(user);
  });

  return (
    <section>
      <AdminLayout
        headContent={
          <Head>
            <title>ScholarHouse || My Profile</title>
            <meta name="description" content="Learn your choice" />
            <meta property="og:image" content="/meta-image.png" />
          </Head>
        }
      >
        <MyProfileDiv userSelected={user} />
      </AdminLayout>
    </section>
  );
}
