'use client'; 

import * as React from "react";

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import EventPage from "@/pages/events";

export default function Home() {
  return (
    <NextUIProvider>
      <div className="w-screen h-screen">
        <EventPage></EventPage>
      </div>
    </NextUIProvider>
  );
}
