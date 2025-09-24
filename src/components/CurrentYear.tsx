'use client';

import { useEffect, useState } from 'react';

const CurrentYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Durante a hidratação, retorna um placeholder que é o mesmo no servidor
  if (year === null) {
    return <span>2024</span>;
  }

  return <span>{year}</span>;
};

export default CurrentYear;