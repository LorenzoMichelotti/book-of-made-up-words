import {BsFillPlusCircleFill} from "react-icons/bs"
import { motion } from "framer-motion"
import WordCard from "../modules/main/WordCard"
import { useEffect, useState, useRef } from "react";
import Modal from "../common/Modal";
import axios from "axios";
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';
import {ImSpinner2} from 'react-icons/im'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordList, setWordList] = useState({words: [], count: 0});
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const perPage = 12;

  async function getWords(page = 1) {
    if (isLoading) return;
    setIsLoading(true);
    const resp = await axios(`${process.env.NEXT_PUBLIC_API}words?page=${page}&perPage=${perPage}`);
    const data = await resp.data;
    setWordList(data);
    setIsLoading(false);
    return data;
  }

  function validateFormField(value) {
    if (!value?.trim()) Swal.fire('Cannot submit with empty fields.', '', 'error')
    return value;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const model = {
      "def": event.target.def.value,
      "usage": event.target.usage.value,
      "createdBy": event.target.createdBy.value,
      "wordName": event.target.wordName.value,
    }
    
    if (!validateFormField(model.wordName) ||
        !validateFormField(model.def) ||
        !validateFormField(model.usage) ||
        !validateFormField(model.createdBy)
    )
      return;

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

  const handlePageClick = (event) => {
    getWords(event.selected + 1);
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto w-[90%] mt-12">
        <h1 className="text-[24px] font-medium">Book of made up words</h1>
        <div className="my-5 text-zinc-400">
          A collection of words too good to go to waste in a regular dictionary.
        </div>
        
        <div className="lg:w-[60%] mx-auto mt-20 mb-10 space-y-5">
          {!isLoading && wordList.words.length > 0 ? 
            wordList.words.map((word, key) => <WordCard word={word} key={key}/>)
            :
            !isLoading ?
              <div className="text-center text-lg">There are no words on our records yet... <br /> Press the button with the plus icon bellow to be the first to add a new word.</div>
              :
              <div className='flex flex-col w-full h-[45vh]'>
                <div className='m-auto animate-spin'>
                  <ImSpinner2 size={50}></ImSpinner2>
                </div>
              </div>
          }
        </div>

        <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(wordList.count/perPage)}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        className="flex space-x-1 mx-auto w-full justify-center mb-[10rem]"
        pageLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
        previousLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
        nextLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
        activeLinkClassName="bg-zinc-700 font-bold text-blue-500 p-2 px-3 rounded-lg text-center"
        />

        <motion.button onClick={()=>setIsModalOpen(true)} whileTap={{scale: 0.8}} whileHover={{scale: 1.2}} className="fixed right-[2rem] bottom-[5rem]">
          <BsFillPlusCircleFill size={50}></BsFillPlusCircleFill>
        </motion.button>

      </div>

      <Modal title="Bring meaning to a word 🐣" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form ref={form} onSubmit={onSubmit} action="post">
          <div className="flex flex-col items-center space-y-3 my-10">
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <label  htmlFor="wordName">Word name:</label>
              <input maxLength="100" className="dark:bg-zinc-50 text-zinc-900 rounded-md p-1" type="text" name="wordName" id="wordName" />
            </div>
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <div>
                <label htmlFor="def">Definition:</label>
                <legend className="text-sm text-zinc-500">max. length 100 chars</legend>
              </div>
              <textarea maxLength="100" className="dark:bg-zinc-50 resize-none text-zinc-900 rounded-md p-1 h-[5rem]" name="def" id="def" cols="30" rows="10"></textarea>
            </div>
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <div>
                <label  htmlFor="def">Usage/Example:</label>
                <legend className="text-sm text-zinc-500">max. length 100 chars</legend>
              </div>
              <textarea maxLength="100" className="dark:bg-zinc-50 resize-none text-zinc-900 rounded-md p-1 h-[5rem]" name="usage" id="usage" cols="30" rows="10"></textarea>
            </div>
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <div>
                <label  htmlFor="def">Creator name:</label>
              </div>
              <input maxLength="100" className="dark:bg-zinc-50 text-zinc-900 rounded-md p-1" type="text" name="createdBy" id="createdBy" />
            </div>
            <div className="pt-5 flex space-x-3">
              <motion.input 
              whileTap={{scale: 0.9, borderWidth: 0}}
              className="bg-zinc-500 hover:bg-zinc-400 border-2 border-zinc-400 transition-colors py-4 px-10 rounded-md" 
              type="reset" 
              value="Reset" />
              <motion.input 
              whileTap={{scale: 0.9, borderWidth: 0}}
              className="bg-blue-500 hover:bg-blue-400 border-2 border-blue-400 transition-colors py-4 px-10 rounded-md" 
              type="submit" 
              value="Confirm" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
