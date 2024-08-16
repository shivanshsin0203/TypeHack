import { SiAnytype } from "react-icons/si";
import { FaKeyboard } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  return (
    <div className=" flex flex-row items-center bg-[#323437] pt-6 pl-[8%] pr-[8%]  justify-between">
       <div className=" flex flex-row space-x-4 items-center">
         <SiAnytype className="h-8 w-8 text-yellow-400"/>
         <h1 className="text-3xl font-medium text-slate-300">typehack</h1>
         <FaKeyboard className="h-6 w-6 text-gray-300 hover:text-slate-200 hover:scale-110 " />
         <FaCrown className="h-6 w-6 text-gray-300 hover:text-slate-200 hover:scale-115 "/>
         <IoIosSettings className="h-6 w-6 text-gray-300 hover:text-slate-200 hover:scale-110 "/>
         </div>
       <div className=" flex flex-row space-x-3 items-center">
          <FaBell className="h-6 w-6 text-gray-300 hover:text-slate-200 hover:scale-110 "/>
            <CgProfile className="h-6 w-6 text-gray-300 hover:text-slate-200 hover:scale-110 "/>
       </div>
    </div>
  )
}

export default Navbar