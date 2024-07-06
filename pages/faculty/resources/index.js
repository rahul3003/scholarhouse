import { FacultyResources } from "@/components/FacultyResources/FacultyResources";
import AdminLayout from "@/components/layout/AdminLayout";
import { selectUser } from "@/store/features/userSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Resources() {
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(user);
    !user && router.push("/signUp");
  }, [router, user]);
  return (
    <section>
      <AdminLayout
        headContent={
          <Head>
            <title>ScholarHouse || Sessions</title>
            <meta name="description" content="Learn your choice" />
            <meta property="og:image" content="/meta-image.png" />
          </Head>
        }
      >
        <FacultyResources userSelected={user} />
      </AdminLayout>
    </section>
  );
}
