import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <footer>
        <div className="h-40 bg-[#909CC2] mt-6">
          <div className="max-w-7xl flex p-10 items-center justify-around h-full mx-auto">
            <div>
              <Image
                src={"/footer_logo.jpg"}
                height={10}
                width={165}
                alt="allinone pdf logo"
              ></Image>
            </div>
            <div className="flex gap-25">
              <div className="text-gray-200 text-lg hover:text-[#F8D0A8] cursor-pointer">
                <span>Legal & Privacy</span>
              </div>
              <div className="text-gray-200 text-lg hover:text-[#F8D0A8] cursor-pointer">
                <span>Contact</span>
              </div>
              <div className="text-gray-200 text-lg hover:text-[#F8D0A8] cursor-pointer">
                <span>About Us</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="h-8 bg-[#084887] text-center
         flex items-center justify-center text-gray-200"
        >
          <span>© Allin one pdf 2025 ® - Your PDF Editor</span>
        </div>
      </footer>
  )
}

export default Footer
