import CommunitySidebar from "@/components/community/communitySidebar";
import SubCommunitySidebar from "@/components/community/subCommunitySidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import PollsCard from "@/components/posts/pollsCard";
import { selectPoll, setPolls } from "@/store/features/postsSlice";
import { selectUser } from "@/store/features/userSlice";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PollsPage = () => {
  const polls = useSelector(selectPoll);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // const polls = [
  //   {
  //     question: "How much time do you spend using [product or service]?",
  //     answers: [
  //       { text: "Answer 1", votes: 52 },
  //       { text: "Answer 2", votes: 12 },
  //     ],
  //     totalVotes: 64,
  //   },
  //   {
  //     question: "How satisfied are you with [product or service]?",
  //     answers: [
  //       { text: "Very Satisfied", votes: 30 },
  //       { text: "Somewhat Satisfied", votes: 20 },
  //       { text: "Not Satisfied", votes: 10 },
  //     ],
  //     totalVotes: 60,
  //   },
  // ];

  useEffect(() => {
    dispatch(setPolls(user?.unifiedUserId?.id));
  }, [user, dispatch]);
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Polls</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex h-[90vh] overflow-hidden">
        <CommunitySidebar />
        <SubCommunitySidebar />
        <div className="w-[80%] px-4 pt-4 pb-2  gap-1  ">
          <PollsCard polls={polls} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default PollsPage;
