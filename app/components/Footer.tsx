import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative w-full h-[649px] overflow-hidden bg-[#e9e9e9] font-[Poppins]">

      {/* Background */}
      <Image
        src="/footer.jpg"
        alt="Background texture"
        fill
        className="object-cover object-center z-0"
      />

      <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto">

        <Image
          src="/zeroone.png"
          alt="01"
          width={130}
          height={155}
          className="absolute left-[-39px] bottom-[214px] z-10"
        />
        <Image
          src="/slash.png"
          alt="02"
          width={268}
          height={250}
          className="absolute left-[-40px] bottom-0 z-10"
        />
        <Image
          src="/zerotwo.png"
          alt="03"
          width={201}
          height={197}
          className="absolute left-[120px] bottom-3 z-10"
        />

        {/* Social Icons */}
        <div className="absolute left-[80px] top-[80px] flex gap-[16px] z-20">
          <Image src="/instagram.svg" alt="Instagram" width={40} height={40}/>
          <Image src="/facebook.svg" alt="Facebook" width={40} height={40}/>
          <Image src="/tiktok.svg" alt="TikTok" width={40} height={40}/>
          <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40}/>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="absolute flex gap-[48px] z-50"
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#373737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.38 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <p>(255) 710 - 222 - 444</p>
              </div>

              <div className="flex items-center gap-[8px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#373737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <p>bethat%@gmail.com</p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-[20px] left-0 w-full flex justify-between px-[80px] text-[16px] font-normal leading-[32px] text-[#373737] z-50">
          <p>bethat% © 2026. All rights reserved.</p>
          <p>
            Designed & Developed by
            <span className="font-medium ml-[4px]">DotSyndicate</span>
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