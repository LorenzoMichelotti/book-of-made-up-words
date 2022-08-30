import {BsFillPlusCircleFill} from "react-icons/bs"
import { motion } from "framer-motion"
import { useState } from "react";
import Modal from "../common/Modal";
import WordsListDisplay from "../modules/main/WordList";
import TitleHeader from "../modules/main/TitleHeader";
import Footer from "../modules/main/Footer";
import AddWordForm from "../modules/main/AddWordForm";
import Head from "next/head";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>BOMUW</title>
        <meta name="description" content="Dictionary of made up words."></meta>
      </Head>
      <div className="mx-auto w-[90%] h-[100vh] flex flex-col">
        <TitleHeader></TitleHeader>
        <WordsListDisplay></WordsListDisplay>          
        <Footer></Footer>

        <motion.button aria-label="Add new word" name="AddWordButton" onClick={()=>setIsModalOpen(true)} whileTap={{scale: 0.8}} whileHover={{scale: 1.2}} className="fixed right-[2rem] lg:right-[6rem] bottom-[8rem]">
          <BsFillPlusCircleFill size={64}></BsFillPlusCircleFill>
        </motion.button>

      </div>

      <Modal title="Bring meaning to a word 🐣" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <AddWordForm setIsModalOpen={setIsModalOpen}></AddWordForm>
      </Modal>
    </>
  )
}
