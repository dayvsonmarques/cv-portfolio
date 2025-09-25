'use client';

import React from 'react';

/**
 * Renderiza o resultado da pen "Spipa circle" do CodePen como plano de fundo animado.
 * A pen é carregada através de um iframe com apenas a aba de resultado visível.
 */
const CodePenBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <iframe
        className="w-full h-full scale-[1.08] origin-center"
        src="https://codepen.io/alexandrix/embed/oQOvYp?default-tab=result&theme-id=dark&animations=run"
        title="Spipa circle by Alex Andrix"
        loading="lazy"
        allow="accelerometer; ambient-light-sensor; autoplay; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr"
        style={{ border: 'none', pointerEvents: 'none', filter: 'brightness(1.15) contrast(1.05)' }}
      />
      {/* Sobreposição adaptativa para equilibrar legibilidade e destacar o efeito */}
  <div className="absolute inset-0 bg-neutral-900/15 dark:bg-black/45" />
  <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-white/15 to-transparent mix-blend-screen pointer-events-none" />
    </div>
  );
};

export default CodePenBackground;
