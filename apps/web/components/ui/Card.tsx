import Image from "next/image";

const Card = () => {
  return (
    <div
      style={{
        width: "232.716px",
        height: "348.179px",
        position: "relative",
        marginTop: "10px",
      }}
    >
      <svg
        width="232.716"
        height="348.179"
        viewBox="0 0 232.716 348.179"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <mask id="cardMask">
            <rect x="0" y="0" width="232.716" height="348.179" fill="white" />
            <circle cx="116.358" cy="26" r="8.0555" fill="black" />
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="232.716"
          height="348.179"
          fill="#DDDDDD"
          mask="url(#cardMask)"
          stroke="white"
          strokeWidth={0.8}
        />

        <circle
          cx="116.358"
          cy="26"
          r="8.0555"
          fill="none"
          stroke="#BBBBBB"
          strokeWidth={1}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center mt-[60px]">
        <Image
          src="/logo-percent.svg"
          alt="Logo Percent"
          width={189.222}
          height={177.223}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Card;
