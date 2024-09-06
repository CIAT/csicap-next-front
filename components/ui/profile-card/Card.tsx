import React from "react";
import style from "./card.module.css";
import Image from "next/image";
import type { Card } from "../../../interfaces";
import Link from "next/link";

export function Card({ chars }: { chars: Card }) {
  return (
    <div className={style["container"]}>
      <div className={style["left"]}>
        <Link href={chars.img} target="_blank">
          <Image alt="" src={chars.img} className={style["img"]} width={150} height={150} />
        </Link>
      </div>
      <div className={style["right"]}>
        <Link href={chars.href} target="_blank" className={style["underline"]}>
          <div className={style["title"]}>
            {chars.title}
          </div>
          <div className={style["description"]}>
            {chars.description}
          </div>
        </Link>
      </div>
    </div>
  );
}