'use client'; 

import * as React from "react";

// 1. import `NextUIProvider` component
import {Link, NextUIProvider} from "@nextui-org/react";


export default function Home() {
  return (
    <NextUIProvider>
      <div className="w-screen h-screen">
      </div>
    </NextUIProvider>
  );
}
g