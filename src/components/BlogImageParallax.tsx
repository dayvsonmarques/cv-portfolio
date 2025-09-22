"use client";
import React from "react";
import { Parallax } from "react-parallax";

export default function BlogImageParallax({ src, alt }: { src: string; alt: string }) {
  return (
    <Parallax bgImage={src} strength={400} bgImageAlt={alt}>
      <div style={{ height: "600px", width: "100%", marginBottom: "3rem" }} />
    </Parallax>
  );
}
