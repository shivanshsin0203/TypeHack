import { FaClock } from "react-icons/fa";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { MdFormatQuote } from "react-icons/md";

export default function Home() {
  return (
    <div className='w-screen h-screen bg-[#323437]'>
      <div className=' pl-3 pr-3 items-center text-gray-400 space-x-3 flex w-[60%] bg-[#2C2E31] rounded-lg h-10 mt-6 ml-[20%] justify-between cursor-pointer'>
        <p className=" text-yellow-400 hover:text-slate-100 hover:scale-110">@ punctuation</p>
        <p className="hover:text-slate-100 hover:scale-110"># numbers</p>

        {/* Divider */}
        <div className="border-2 border-gray-500 h-4"></div>

        <div className="space-x-2 text-yellow-400 flex flex-row items-center hover:text-slate-100 hover:scale-110">
          <FaClock className=" " />
          <span className=" ">time</span>
        </div>
        <div className="space-x-2 flex flex-row items-center hover:text-slate-100 hover:scale-110">
          <TiSortAlphabeticallyOutline />
          <span>words</span>
        </div>
        <div className="space-x-2 flex flex-row items-center hover:text-slate-100 hover:scale-110">
          <MdFormatQuote />
          <span>quotes</span>
        </div>

        {/* Divider */}
        <div className="border-2 border-gray-500 h-4"></div>

        <p className=" text-yellow-400 hover:text-slate-100 hover:scale-110">15</p>
        <p className="hover:text-slate-100 hover:scale-110">30</p>
        <p className="hover:text-slate-100 hover:scale-110">60</p>
        <p className="hover:text-slate-100 hover:scale-110">100</p>
        <p className="hover:text-slate-100 hover:scale-110">120</p>
      </div>
    </div>
  )
}
