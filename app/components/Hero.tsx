import Image from "next/image";

const Hero = () => {
  return (
    <>
      <section className="relative w-full aspect-[1440/856]">
        
        <Image
          src="/bg-image.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />


<div
  className="absolute z-10"
  style={{
    top: "180px",
    left: "236px",
    right: "236px",
  }}
>
  <div className="relative w-full h-[470px] bg-[#EEFF4E]">
    
    <h1
      className="absolute left-[49px] right-[49px] bottom-[-20px] z-10 text-center
                 text-white uppercase font-bold
                 text-[140px] leading-none"
      style={{
        fontFamily: "Poppins",
      }}
    >
      COLLECTION
    </h1>

  </div>
</div>


    {/* LADY IMAGE */}
    <div
      className="absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] z-20"
   
     >
     
      <img src="/lady.png" alt="Lady" className="w-full h-full object-cover" />
        </div>



        <div
          className="absolute z-20"
          style={{
            position: "absolute",
            left: "159px",
            top: "291px",
          }}
        >
          <Image
            src="/ellipse1.svg"
            alt="Sphere 1"
            width={155}
            height={155}
            className="w-[155px] h-[155px]"
            priority
          />
        </div>


<div
  className="absolute z-20"
  style={{
    top: "670px",
    left: "398px",
    width: "142px",
    height: "214px",
  }}
>
  <Image
    src="/export1.png"  
    alt="Model"
    width={142}
    height={214}
    priority
  />
</div>


<div
  className="absolute z-20"
  style={{
    top: "670px",
    left: "236px"
  }}
>
  <Image
    src="/export2.png"  
    alt="Model"
    width={142}
    height={213}
    priority
  />
</div>

<div
  className="absolute z-20"
  style={{
    top: "670px",
    left: "0px"
  }}
>
  <Image
    src="/export3.png"  
    alt="Model"
    width={225}
    height={213}
    priority
  />
</div>




        <div
          className="absolute z-20"
          style={{
            position: "absolute",
            left: "1255px",
            top: "670px",
          }}
        >
          <Image
            src="/ellipse2.png"
            alt="Sphere 1"
            width={271}
            height={271}
            className="w-[271px] h-[271px]"
            priority
          />
        </div>

  
      </section>


      <div className="w-full h-[209px] bg-[#EFEFEF] -mt-[120px]" />
    </>
  );
};

export default Hero;
