"use client";
import React from "react";
import { Parallax } from "react-parallax";

export default function BlogImageParallax({ src, alt }: { src: string; alt: string }) {
  return (
    <Parallax bgImage={src} strength={400} bgImageAlt={alt}>
      <div className="h-56 sm:h-72 md:h-[450px] lg:h-[600px] w-full mb-8 sm:mb-12" />
    </Parallax>
  );
}
