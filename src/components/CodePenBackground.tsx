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
        className="w-full h-full scale-110"
        src="https://codepen.io/alexandrix/embed/oQOvYp?default-tab=result&theme-id=dark&animations=run"
        title="Spipa circle by Alex Andrix"
        loading="lazy"
        allow="accelerometer; ambient-light-sensor; autoplay; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr"
        style={{ border: 'none', pointerEvents: 'none' }}
      />
  {/* Sobreposição adaptativa para equilibrar legibilidade entre os temas */}
  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-transparent dark:from-slate-900/70 dark:via-slate-800/40 dark:to-transparent" />
    </div>
  );
};

export default CodePenBackground;
