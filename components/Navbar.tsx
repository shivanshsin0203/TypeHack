import { SiAnytype } from "react-icons/si";
import { FaKeyboard } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  return (
    <div className="flex flex-row items-center bg-[#323437] pt-6 pl-[8%] pr-[8%]  justify-between w-screen">
       <div className=" flex flex-row space-x-4 items-center">
         <SiAnytype className="h-8 w-8 text-yellow-400"/>
         <h1 className="text-3xl font-medium text-slate-400">typehack</h1>
         <FaKeyboard className="h-5 w-5 text-gray-400 hover:text-slate-100 hover:scale-110 " />
         <FaCrown className="h-5 w-5 text-gray-400 hover:text-slate-100 hover:scale-115 "/>
         <IoIosSettings className="h-5 w-5 text-gray-400 hover:text-slate-100 hover:scale-110 "/>
         </div>
       <div className=" flex flex-row space-x-5 items-center">
          <FaBell className="h-5 w-5 text-gray-400 hover:text-slate-100 hover:scale-110 "/>
            <CgProfile className="h-5 w-5 text-gray-400 hover:text-slate-100 hover:scale-110 "/>
       </div>
    </div>
  )
}

export default Navbar