const WaveDivider = () => {
  return (
    <div className="relative h-48 w-full overflow-hidden bg-transparent">
      <svg
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,96 350,96 600,48 C850,0 1050,0 1200,48 L1200,120 L0,120 Z"
          fill="#000000"
          fillOpacity="0.3"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,0 C150,96 350,96 600,48 C850,0 1050,0 1200,48 L1200,120 L0,120 Z;
              M0,48 C150,0 350,0 600,96 C850,96 1050,48 1200,0 L1200,120 L0,120 Z;
              M0,0 C150,96 350,96 600,48 C850,0 1050,0 1200,48 L1200,120 L0,120 Z
            "
          />
        </path>
        <path
          d="M0,24 C200,72 400,72 600,24 C800,24 1000,72 1200,24 L1200,120 L0,120 Z"
          fill="#000000"
          fillOpacity="0.5"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,24 C200,72 400,72 600,24 C800,24 1000,72 1200,24 L1200,120 L0,120 Z;
              M0,72 C200,24 400,24 600,72 C800,72 1000,24 1200,72 L1200,120 L0,120 Z;
              M0,24 C200,72 400,72 600,24 C800,24 1000,72 1200,24 L1200,120 L0,120 Z
            "
          />
        </path>
        <path
          d="M0,48 C300,96 500,96 600,48 C700,0 900,0 1200,48 L1200,120 L0,120 Z"
          fill="#000000"
          fillOpacity="1"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,48 C300,96 500,96 600,48 C700,0 900,0 1200,48 L1200,120 L0,120 Z;
              M0,96 C300,48 500,48 600,96 C700,96 900,48 1200,96 L1200,120 L0,120 Z;
              M0,48 C300,96 500,96 600,48 C700,0 900,0 1200,48 L1200,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
};

export default WaveDivider;
