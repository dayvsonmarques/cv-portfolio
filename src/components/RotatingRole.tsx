'use client';

import React from 'react';

type RotatingRoleProps = {
  roles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
};

function commonPrefixLength(a: string, b: string): number {
  const max = Math.min(a.length, b.length);
  let i = 0;
  while (i < max && a[i] === b[i]) i++;
  return i;
}

const RotatingRole = ({
  roles,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 1800,
  className,
}: RotatingRoleProps) => {
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [text, setText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const handleChange = () => setReducedMotion(query.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    if (reducedMotion) return;

    const currentRole = roles[roleIndex % roles.length];
    const nextRole = roles[(roleIndex + 1) % roles.length];
    const stopAt = isDeleting ? commonPrefixLength(currentRole, nextRole) : 0;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text.length === stopAt) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.slice(0, text.length - 1)
        : currentRole.slice(0, text.length + 1);
      timeout = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseDuration, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{roles[0]}</span>;
  }

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text}
        <span className="inline-block w-[2px] ml-1 h-[1em] align-middle bg-current animate-pulse" />
      </span>
      <span className="sr-only">{roles[0]}</span>
    </span>
  );
};

export default RotatingRole;
