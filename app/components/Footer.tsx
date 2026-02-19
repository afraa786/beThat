import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative w-full h-[649px] overflow-hidden bg-[#e9e9e9] font-[Poppins]">

      {/* Background */}
      <Image
        src="/footer.jpg"
        alt="Background texture"
        fill
        priority
        className="object-cover object-center"
      />



   <div className="relative w-full max-w-[1440px] h-full mx-auto">

<Image
  src="/zeroone.png"
  alt="01"
  width={201}
  height={197}
  className="absolute left-[-39px] bottom-[214px] z-10"
/>
<Image
  src="/slash.png"
  alt="02"
  width={201}
  height={197}
  className="absolute left-[-40px] bottom-0 z-10"
/>
<Image
  src="/zerotwo.png"
  alt="03"
  width={201}
  height={197}
  className="absolute left-[158px] bottom-0 z-10"
/>


  {/* Social Icons */}
  <div className="absolute left-[80px] top-[80px] flex gap-[16px]">

        </div>

        {/* Social Icons */}
        <div className="absolute left-[80px] top-[80px] flex gap-[16px]">
          <Image src="/instagram.svg" alt="Instagram" width={40} height={40}/>
          <Image src="/facebook.svg" alt="Facebook" width={40} height={40}/>
          <Image src="/tiktok.svg" alt="TikTok" width={40} height={40}/>
          <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40}/>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="absolute flex gap-[48px]"
          style={{
            left: "778px",
            right: "80px",
            top: "59px",
            bottom: "312px",
          }}
        >

          {/* Resources */}
          <div>
            <h3 className="text-[18px] font-medium text-[#373737] mb-[18px]">
              Resources
            </h3>

            <div className="text-[16px] font-normal leading-[32px] text-[#373737]">
              <p>Our Story</p>
              <p>Products</p>
              <p>Categories</p>
              <p>Contact us</p>
              <p>Privacy Policy</p>
              <p>Return Policy</p>
              <p>Terms Of Services</p>
            </div>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-[18px] font-medium text-[#373737] mb-[18px]">
              My Account
            </h3>

            <div className="text-[16px] font-normal leading-[32px] text-[#373737]">
              <p>Cart</p>
              <p>My Account</p>
              <p>My Orders</p>
              <p>Wishlist</p>
              <p>Track Order</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[18px] font-medium text-[#373737] mb-[18px]">
              Contact
            </h3>

            <div className="text-[16px] font-normal leading-[32px] text-[#373737] flex flex-col gap-[18px]">

              <div className="flex items-center gap-[8px]">
                <Image
                  src="/phone.png"
                  alt="Phone"
                  width={18}
                  height={18}
                />
                <p>(255) 710 - 222 - 444</p>
              </div>

              <div className="flex items-center gap-[8px]">
                <Image
                  src="/mail.png"
                  alt="Mail"
                  width={18}
                  height={18}
                />
                <p>bethat%@gmail.com</p>
              </div>

            </div>
          </div>

        </div>

        <div className="absolute bottom-[20px] left-0 w-full flex justify-between px-[80px] text-[16px] font-normal leading-[32px] text-[#373737]">

          <p>bethat% © 2026. All rights reserved.</p>

          <p>
            Designed & Developed by
            <span className="font-medium ml-[4px]">
              DotSyndicate
            </span>
          </p>

          <div className="flex gap-[24px]">
            <p>Privacy Policy</p>
            <p>T&C</p>
          </div>

        </div>

      </div>

    </footer>
  )
}
