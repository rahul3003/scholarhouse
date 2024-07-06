import ProjectCard from "@/components/Project/projectCard";
import CommunitySidebar from "@/components/community/communitySidebar";
import SubCommunitySidebar from "@/components/community/subCommunitySidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import api from "@/utils/apiSetup";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Projects</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex h-[90vh] overflow-hidden">
        <CommunitySidebar />
        <SubCommunitySidebar />

        <div className="  w-[80%] px-4 pt-4 pb-2  ">
          <div className=" mx-auto flex flex-wrap gap-2 gap-y-10 justify-start pt-10">
            {projects?.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectPage;
