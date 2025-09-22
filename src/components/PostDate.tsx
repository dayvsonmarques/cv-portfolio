"use client";
import React from "react";
import { useApp } from "@/contexts/AppContext";

interface PostDateProps {
  date: string;
}

const PostDate: React.FC<PostDateProps> = ({ date }) => {
  const { language } = useApp();
  return (
    <p className="text-sm text-gray-800">
      {new Date(date).toLocaleDateString(
        language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es-ES",
        { year: "numeric", month: "long", day: "numeric" }
      )}
    </p>
  );
};

export default PostDate;
