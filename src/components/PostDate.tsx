"use client";
import React, { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";

interface PostDateProps {
  date: string;
}

const PostDate: React.FC<PostDateProps> = ({ date }) => {
  const { language } = useApp();
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const formatted = new Date(date).toLocaleDateString(
      language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es-ES",
      { year: "numeric", month: "long", day: "numeric" }
    );
    setFormattedDate(formatted);
  }, [date, language]);

  // Durante a hidratação, mostra uma versão simplificada
  if (!formattedDate) {
    return <p className="text-sm text-gray-800">{date}</p>;
  }

  return (
    <p className="text-sm text-gray-800">
      {formattedDate}
    </p>
  );
};

export default PostDate;
