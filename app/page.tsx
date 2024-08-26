'use client'; 

import * as React from "react";

// 1. import `NextUIProvider` component
import {Link, NextUIProvider} from "@nextui-org/react";


export default function Home() {
  return (
    <NextUIProvider>
      <div className="w-screen h-screen">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/assistance">Asistencia</Link></li>
          </ul>
        </nav>
      </div>
    </NextUIProvider>
  );
}
