import Hero from "@/components/Hero";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session = await getServerSession(options);

  console.log("session", session);

  return (
    <div>
      {/* Hero Section */}
      <div>
        <Hero />
      </div>
    </div>
  );
};

export default Home;
