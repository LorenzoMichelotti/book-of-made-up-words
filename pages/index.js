import {BsFillPlusCircleFill} from "react-icons/bs"
import { motion } from "framer-motion"
import WordCard from "../modules/main/WordCard"

export default function Home() {
  return (
    <div className="w-full">
      <div className="mx-auto w-[90%] mt-12">
        <h1 className="text-[24px] font-medium">Book of made up words</h1>

        <div className="my-5">
          A collection of words too good to go to waste in a regular dictionary.
        </div>

        <motion.button whileHover={{scale: 1.2}} className="fixed right-[2rem] bottom-[3rem]"><BsFillPlusCircleFill className="w-[3rem] h-[3rem]"></BsFillPlusCircleFill></motion.button>

        <div className="lg:w-[60%] mx-auto my-20 space-y-5">
          <WordCard 
          wordName="Bobe"
          def="A lover."
          usage="Come here, my sweet bobe"
          />  
          <WordCard 
          wordName="Plam"
          def="A sneaky-looking person, animal or object."
          usage="You're a little plam!"
          />  
          <WordCard 
          wordName="Sam nam"
          def="Wildcard word, can be used anywhere, anyhow. You'll know when the right time comes..."
          usage="Sam! sam nam!"
          />  
        </div>
      </div>
    </div>
  )
}
