"use client";
import Image from "next/image";


export default function Categories() {
  const horizontalTop = 120;
  const horizontalHeight = 10;
  const verticalHeight = 119;

  const hoodieImages = [
    "/white.png",
    "/black.png",
    "/pink.png",
    "/yellow-hoodie.png",
  ];

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "2000px",
          background: "#EFEFEF",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${horizontalHeight}px`,
            borderRadius: "8px",
            position: "absolute",
            background:
              "linear-gradient(270deg, #B0B0B0 0%, #D9D9D9 100%)",
            top: `${horizontalTop}px`,
            left: 0,
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: `${horizontalTop}px`,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div className="rack-track">
            {[...hoodieImages, ...hoodieImages].map((img, index) => (
              <div key={index} className="hanger-unit">
                {/* Vertical Hanger Line */}
                <div className="hanger-line" />

                {/* Yellow Card */}
                <div className="hoodie-card">
                  <Image
                    src="/yellow-card.png"
                    alt="Yellow Card"
                    fill
                    style={{ objectFit: "cover" }}
                  />

                  <div className="hoodie-inner">
                    <Image
                      src={img}
                      alt="Hoodie"
                      width={220}
                      height={220}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Styles */}
        <style jsx>{`
          .rack-track {
            display: flex;
            gap: 80px;
            width: max-content;
            animation: scroll 25s linear infinite;
          }

          .rack-track:hover {
            animation-play-state: paused;
          }

          .hanger-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hanger-line {
            width: 3px;
            height: ${verticalHeight}px;
            background: linear-gradient(
              180deg,
              #b0b0b0 0%,
              #d9d9d9 100%
            );
            border-radius: 0 0 2px 2px;
          }

          .hoodie-card {
            position: relative;
            width: 280px;
            height: 350px;
            margin-top: 20px;
            flex-shrink: 0;
          }

          .hoodie-inner {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
      






 
<div
  style={{
    position: "absolute",
    top: `${horizontalTop + 1900}px`,
    left: 0,
    width: "100%",
    minHeight: "1500px",
    backgroundImage: "url('/white-fabric.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
  }}
>
    {/* WHY WE EXIST IMAGE + TEXT */}
<div
  style={{
    position: "absolute",
    top: "200px", // 🔥 adjust vertical placement
    left: "10%",  // 🔥 adjust horizontal placement
    width: "80%", // control layout width
  }}
>
  {/* Main Image */}
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "700px", // 🔥 control image height
    }}
  >
    <Image
      src="/why-we-exist-image.png" // your image
      alt="Why We Exist"
      fill
      style={{ objectFit: "cover" }}
    />
  </div>

  {/* TEXT ON IMAGE */}
  <div
    style={{
      position: "absolute",
      top: "1000px",   // 🔥 adjust vertical position of text
      left: "-60px",   // 🔥 adjust
      maxWidth: "700px",
    }}
  >
    <h1
      style={{
        color: "#373737",
        fontFamily: "Poppins, sans-serif",
        fontSize: "70px",
        fontWeight: 700,
        textTransform: "uppercase",
        margin: 0,
      }}
    >
      WHY WE EXIST
    </h1>

    <p
      style={{
        marginTop: "25px",
        fontFamily: "Poppins, sans-serif",
        fontSize: "18px",
        color: "#555",
        lineHeight: "1.6",
      }}
    >
      because modest women deserve to be seen differently.
      not softened. not simplified. not overlooked.
      we create pieces that reframe modesty through structure,
      silhouette, and scale — allowing women to take space,
      hold presence, and express themselves without compromise.
    </p>
  </div>
</div>

  {/* Ellipse 3 Image */}
  <div
    style={{
      position: "absolute",
      top: "600px",   // 🔥 CONTROL vertical position here
      left: "14%",   // 🔥 CONTROL horizontal position here
      transform: "translateX(-50%)",
      width: "108px",  // 🔥 CONTROL size here
      height: "108px",
    }}
  >
    <Image
      src="/ellipse3.svg"
      alt="Ellipse 3"
      fill
      style={{
        objectFit: "contain",
      }}
    />
  </div>
    {/* Ellipse 3 Image */}
  <div
    style={{
      position: "absolute",
      top: "1000px",   // 🔥 CONTROL vertical position here
      right: "-3px",   // 🔥 CONTROL horizontal position here
      width: "259px",  // 🔥 CONTROL size here
      height: "259px",
    }}
  >
    <Image
      src="/ellipse4.png"
      alt="Ellipse 4"
      fill
      style={{
        objectFit: "contain",
      }}
    />
  </div>
</div>







 


    </>
  );
}