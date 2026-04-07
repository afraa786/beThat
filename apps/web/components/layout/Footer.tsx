"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("");
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
          className="absolute left-[-50px] bottom-[214px] z-10"
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
     <div className="absolute left-[5px] top-[80px] flex gap-[16px] z-20">
  {[
    { src: "/instagram.svg", alt: "Instagram" },
    { src: "/facebook.svg",  alt: "Facebook"  },
    { src: "/tiktok.svg",    alt: "TikTok"    },
    { src: "/whatsapp.svg",  alt: "WhatsApp"  },
  ].map(({ src, alt }) => (
    <div
      key={alt}
      className="flex items-center justify-center"
      style={{
        width: "55px",
        height: "55px",
        borderRadius: "32px",
        background: "rgba(230, 247, 73, 0.32)",
      }}
    >
      <Image src={src} alt={alt} width={32} height={32} />
    </div>
  ))}
</div>

        {/* RIGHT SECTION */}
        <div className="absolute flex flex-col gap-[32px] z-50 right-[50px] top-[59px]">
          <div className="flex gap-[48px]">

          {/* Resources */}
          <div>
            <h3 className="text-[24px] font-semibold text-[#373737] mb-[18px]">
              Resources
            </h3>
            <div className="text-[16px] font-normal leading-[32px] text-[#373737] flex flex-col">
              <Link href="/about-us">Our Story</Link>
              <Link href="/products">Products</Link>
              <Link href="/collections">Categories</Link>
              <Link href="/contact">Contact us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/return-policy">Return Policy</Link>
              <Link href="/terms">Terms Of Services</Link>
            </div>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-[24px] font-semibold text-[#373737] mb-[18px]">
              My Account
            </h3>
            <div className="text-[16px] font-normal leading-[32px] text-[#373737] flex flex-col">
              <Link href="/cart">Cart</Link>
              <Link href="/account/profile">My Account</Link>
              <Link href="/account/orders">My Orders</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/track-order">Track Order</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[24px] font-semibold text-[#373737] mb-[18px]">
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

          </div>{/* end links row */}

          {/* Newsletter */}
          <div>
            <h3 className="text-[24px] font-bold text-[#373737] uppercase mb-[14px]">
              Subscribe to our newsletter
            </h3>
            <div className="flex items-center border border-[#373737] bg-white" style={{ width: "480px", height: "48px" }}>
              <input
                type="email"
                placeholder="ADD EMAIL ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-[16px] text-[13px] text-[#999] outline-none bg-transparent"
              />
              <button
                onClick={() => setEmail("")}
                className="px-[20px] h-full text-[13px] font-bold text-[#373737] border-l border-[#373737] hover:bg-[#EEFF4E] transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </div>

        </div>{/* end right section */}

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
