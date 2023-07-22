"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const Butt = () => {
  const ses = useSession();
  console.log(ses.data);
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        sign Out
      </button>
      <p className="font-bold text-4xl text-red-600">{ses.data?.user.name || "he"}</p>
    </div>
  );
};

export default Butt;
