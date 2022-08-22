import {BsFillPlusCircleFill} from "react-icons/bs"
import { motion } from "framer-motion"
import WordCard from "../modules/main/WordCard"
import { useEffect, useState, useRef } from "react";
import Modal from "../common/Modal";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Home({firestore}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordList, setWordList] = useState([]);
  const form = useRef();

  async function getWords() {
    const resp = await axios(`${process.env.NEXT_PUBLIC_API}words`);
    const data = await resp.data;
    setWordList(data);
    return data;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const model = {
      "def": event.target.def.value,
      "usage": event.target.usage.value,
      "createdBy": event.target.createdBy.value,
      "wordName": event.target.wordName.value,
    }
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_API}addWord`, model);
    const data = await resp.data;
    console.log(data);

    if (!data.success) { 
      Swal.fire( 'Oh no!', data.code, 'error' ); 
      return;
    }
    
    Swal.fire(
      'Yes!',
      data.message,
      'success'
    )
    form.current.reset();
    setIsModalOpen(false);
    getWords();
  }

  useEffect(() => {
    console.log('effect');
    getWords();
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-[90%] mt-12">
        <h1 className="text-[24px] font-medium">Book of made up words</h1>
        <div className="my-5">
          A collection of words too good to go to waste in a regular dictionary.
        </div>
        
        <div className="lg:w-[60%] mx-auto my-20 space-y-5">
          {wordList.map((word, key) => <WordCard word={word} key={key}/>)}
        </div>

        <motion.button onClick={()=>setIsModalOpen(true)} whileTap={{scale: 0.8}} whileHover={{scale: 1.2}} className="fixed right-[2rem] bottom-[5rem]"><BsFillPlusCircleFill className="w-[3rem] h-[3rem]"></BsFillPlusCircleFill></motion.button>

      </div>

      <Modal title="Bring meaning to a word 🐣" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form ref={form} onSubmit={onSubmit} action="post">
          <div className="flex flex-col items-center space-y-3 my-10">
            <div className="grid grid-cols-2 w-[50%]">
              <label  htmlFor="wordName">Word name:</label>
              <input maxlength="100" className="dark:bg-slate-50 text-slate-900 rounded-md p-1" type="text" name="wordName" id="wordName" />
            </div>
            <div className="grid grid-cols-2 w-[50%]">
              <div>
                <label htmlFor="def">Definition:</label>
                <legend className="text-sm text-slate-500">max. length 100 chars</legend>
              </div>
              <textarea maxlength="100" className="dark:bg-slate-50 resize-none text-slate-900 rounded-md p-1 h-[5rem]" name="def" id="def" cols="30" rows="10"></textarea>
            </div>
            <div className="grid grid-cols-2 w-[50%]">
              <div>
                <label  htmlFor="def">Usage/Example:</label>
                <legend className="text-sm text-slate-500">max. length 100 chars</legend>
              </div>
              <textarea maxlength="100" className="dark:bg-slate-50 resize-none text-slate-900 rounded-md p-1 h-[5rem]" name="usage" id="usage" cols="30" rows="10"></textarea>
            </div>
            <div className="grid grid-cols-2 w-[50%]">
              <div>
                <label  htmlFor="def">Creator name:</label>
              </div>
              <input maxlength="100" className="dark:bg-slate-50 text-slate-900 rounded-md p-1" type="text" name="createdBy" id="createdBy" />
            </div>
            <div className="pt-5 flex space-x-3">
              <motion.input 
              whileTap={{scale: 0.9}}
              className="bg-slate-500 hover:bg-slate-400 transition-colors py-4 px-10 rounded-md" 
              type="reset" 
              value="Reset" />
              <motion.input 
              whileTap={{scale: 0.9}}
              className="bg-blue-500 hover:bg-blue-400 transition-colors py-4 px-10 rounded-md" 
              type="submit" 
              value="Confirm" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
