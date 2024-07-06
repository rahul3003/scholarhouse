import Head from "next/head";
import AdminLayout from "../layout/AdminLayout";

export function MySubs() {
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Admin Overview</title>
          <meta name="description" content="access your overview" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex flex-col md:flex-row gap-3 py-2">
        {/* <div className="p-[2vw] w-full">
          <div className=" text-[20px] font-bold">My subscription</div>
          <h1 className="text-[16px] mt-3">Current Plan</h1>
          <div className="w-full h-[150px] bg-slate-100 rounded-lg">
            <div className="flex gap-4 px-3">
              <h1 className="text-[24px] font-bold">Pro</h1>
              <Image src="/crown.svg" alt="" />
            </div>
          </div>
        </div> */}
        <div className="text-[30px] font-bold flex justify-center items-center">
          Coming Soon
        </div>
      </div>
    </AdminLayout>
  );
}
