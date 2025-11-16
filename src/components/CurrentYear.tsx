'use client';

const currentYear = new Date().getFullYear();

const CurrentYear = () => {
  return <span>{currentYear}</span>;
};

export default CurrentYear;