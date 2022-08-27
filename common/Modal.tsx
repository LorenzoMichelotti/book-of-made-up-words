import {AiOutlineClose} from "react-icons/ai"
import {motion} from 'framer-motion'
import { FunctionComponent, PropsWithChildren, SetStateAction } from "react";

export default function Modal({isOpen, setIsOpen, title, children}) {
    const modalVariant = {
        closed: {opacity: 0, y: 100, scaleX: 0.5, scaleY: 0, transitionEnd: { display: "none" }},
        open: {opacity: 1, y: 0, scaleX: 1, scaleY: 1, display: "block"}
    }
    const backdropVariant = {
        closed: {opacity: 0, transitionEnd: { display: "none" }},
        open: {opacity: 1, display: "block"}
    }

    return (
      <div>
        <motion.div
          variants={backdropVariant}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 bg-black bg-opacity-30 w-full h-full"
        ></motion.div>
        <motion.div
          initial="closed"
          variants={modalVariant}
          animate={isOpen ? "open" : "closed"}
          className="fixed border-2 border-zinc-700 -top-16 lg:top-[0] left-[5vw] lg:left-[14vw] z-10 mx-auto mt-[20vh] w-[90%] lg:w-[70%] text-zinc-900 p-5 bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-50 rounded-lg"
        >
          <div className="w-full pb-3 flex justify-between">
            <h1 className="text-[32px] font-bold">{title}</h1>
            <button id="closeModal" onClick={() => setIsOpen(false)} className="relative group left-7 w-[3rem] h-[2rem] rounded-full group-hover:bg-zinc-200 group-hover:dark:bg-zinc-600 transition-all duration-200">
              <div className="top-2 -left-8 w-[2rem] h-[2rem] absolute rounded-full group-hover:bg-zinc-200 group-hover:dark:bg-zinc-600 transition-all duration-200"></div>
              <AiOutlineClose className="top-4 -left-6 absolute text-zinc-800 dark:text-zinc-50" />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    );
}