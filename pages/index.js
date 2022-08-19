import {BsFillPlusCircleFill} from "react-icons/bs"
import { motion } from "framer-motion"
import WordCard from "../modules/main/WordCard"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";

export default function Home({firestore}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordList, setWordList] = useState([]);
  async function getWords() {
    const wordsCol = collection(firestore, 'words');
    const wordsSnapshot = await getDocs(wordsCol);
    const wordsList = wordsSnapshot.docs.map(doc => doc.data());
    return wordsList;
  }

  useEffect(() => {
    getWords().then(newList => {console.log(newList); setWordList(newList)});
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-[90%] mt-12">
        <h1 className="text-[24px] font-medium">Book of made up words</h1>
        <div className="my-5">
          A collection of words too good to go to waste in a regular dictionary.
        </div>
        <motion.button onClick={()=>setIsModalOpen(true)} whileHover={{scale: 1.2}} className="fixed right-[2rem] bottom-[3rem]"><BsFillPlusCircleFill className="w-[3rem] h-[3rem]"></BsFillPlusCircleFill></motion.button>
        <div className="lg:w-[60%] mx-auto my-20 space-y-5">
          {wordList.map((word, key) => <WordCard word={word} key={key}/>)}
        </div>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <img className="w-full h-[20rem] object-cover" src="https://media.giphy.com/media/kiBcwEXegBTACmVOnE/giphy.gif" alt="" />
        <p className="py-5">Modal content, oh yesss! 😍👌</p>
      </Modal>
    </div>
  )
}
