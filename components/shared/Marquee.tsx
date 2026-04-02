"use client";

export default function Marquee() {
  return (
    <div
      className="overflow-hidden bg-black flex items-center justify-end"
      style={{
        width: "1518px",
        height: "79px",
        padding: "25.5px 0 24.5px 17px",
      }}
    >
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {/* First Set */}
          <span>join the moment [#bethat%]</span>
          <span>join the moment [#bethat%]</span>
          <span>join the moment [#bethat%]</span>
          <span>join the moment [#bethat%]</span>

          {/* Duplicate for seamless infinite scroll */}
          <span>join the moment [#bethat%]</span>
          <span>join the moment [#bethat%]</span>
          <span>join the moment [#bethat%]</span>
          <span>join the moment [#bethat%]</span>
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 80px;
          white-space: nowrap;
          animation: scroll 20s linear infinite;
        }

        .marquee-track span {
          color: #E6F749;
          font-family: "Poppins", sans-serif;
          font-size: 19px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-transform: lowercase;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
