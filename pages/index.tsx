import {BsFillPlusCircleFill} from "react-icons/bs"
import { motion } from "framer-motion"
import WordCard from "../modules/main/WordCard"
import { useEffect, useState, useRef, MutableRefObject, FormEvent } from "react";
import Modal from "../common/Modal";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';
import {ImSpinner2} from 'react-icons/im'
import Response from "../common/models/Response";
import { Word, WordList } from "../common/models/Words";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [wordList, setWordList] = useState<WordList>({words: [], count: 0});
  const form = useRef<HTMLFormElement>();
  const perPage: number = 12;

  async function getWords(page: number = 1): Promise<WordList> {
    if (isLoading) return;
    setIsLoading(true);
    const { data, status } = await axios.get<WordList>(`${process.env.NEXT_PUBLIC_API}words?page=${page}&perPage=${perPage}`);
    setWordList(data as WordList);
    setIsLoading(false);
    window.scrollTo(0, 0);
    return data;
  }

  function validateFormField(value: string): string {
    if (!value?.trim()) Swal.fire({title: 'Cannot submit with empty fields.', icon: 'error', color: 'white', background: '#18181B'})
    return value;
  }

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (isSubmitting) return;

    const model: Word = {
      def: event.target['def'].value,
      usage: event.target['usage'].value,
      createdBy: event.target['createdBy'].value,
      wordName: event.target['wordName'].value,
    }
    
    if (!validateFormField(model.wordName) ||
        !validateFormField(model.def) ||
        !validateFormField(model.usage) ||
        !validateFormField(model.createdBy)
    ) return;

    setIsSubmitting(true);

    const { data, status } = await axios.post<Response>(`${process.env.NEXT_PUBLIC_API}addWord`, model);
    console.log(data, status);

    setIsSubmitting(false);

    if (!data.success) { 
      Swal.fire({title: 'Oh no!',  html: data.code.toString(), icon: 'error', color: 'white', background: '#18181B' }); 
      return;
    }
    
    Swal.fire({
      title: 'Yes!',
      html: data.message,
      icon: 'success',
      color: 'white', 
      background: '#18181B'
    })
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
        <div className="flex items-center">
          <span className="mt-1 text-[64px]">🔡</span>
          <div>
            <h1 className="text-[24px] font-medium">Book of made up words</h1>
            <legend className="text-sm text-zinc-400">By Lorenzo Michelotti</legend>
          </div>
        </div>
        <div className="ml-3 my-5 text-zinc-400">
          A collection of words that do not fit a regular dictionary.
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
        className="flex space-x-1 mx-auto w-full justify-center mb-[3rem]"
        pageLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
        previousLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
        nextLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
        activeLinkClassName="bg-zinc-700 font-bold text-blue-400 p-2 px-3 rounded-lg text-center"
        />

        <motion.button name="AddWordButton" onClick={()=>setIsModalOpen(true)} whileTap={{scale: 0.8}} whileHover={{scale: 1.2}} className="fixed right-[3rem] bottom-[5rem]">
          <BsFillPlusCircleFill size={64}></BsFillPlusCircleFill>
        </motion.button>

        <div className="flex w-full justify-center mt-[10rem] mb-[3rem] text-zinc-400">
          {/* footer */}
          <p>By Lorenzo Michelotti a Graduate Software Engineer -</p>
          <a className="hover:underline text-blue-400 mx-1" href="https://www.linkedin.com/in/lorenzo-michelotti-b1b4441a7/">Linkedin</a>
          /
          <a className="hover:underline text-blue-400 ml-1" href="https://github.com/LorenzoMichelotti">Github</a>
        </div>

      </div>

      <Modal title="Bring meaning to a word 🐣" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form ref={form} onSubmit={(event) => {
            if (!isLoading) onSubmit(event)}} action="post">
          <div className="flex flex-col items-center space-y-3 my-10">
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <label  htmlFor="wordName">Word name:</label>
              <input maxLength={100} className="dark:bg-zinc-50 text-zinc-900 rounded-md p-1" type="text" name="wordName" id="wordName" />
            </div>
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <div>
                <label htmlFor="def">Definition:</label>
                <legend className="text-sm text-zinc-500">max. length 100 chars</legend>
              </div>
              <textarea maxLength={100} className="dark:bg-zinc-50 resize-none text-zinc-900 rounded-md p-1 h-[5rem]" name="def" id="def" cols={30} rows={10}></textarea>
            </div>
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <div>
                <label  htmlFor="def">Usage/Example:</label>
                <legend className="text-sm text-zinc-500">max. length 100 chars</legend>
              </div>
              <textarea maxLength={100} className="dark:bg-zinc-50 resize-none text-zinc-900 rounded-md p-1 h-[5rem]" name="usage" id="usage" cols={30} rows={10}></textarea>
            </div>
            <div className="grid grid-cols-2 w-[90%] md:w-[70%]">
              <div>
                <label  htmlFor="def">Creator name:</label>
              </div>
              <input maxLength={100} className="dark:bg-zinc-50 text-zinc-900 rounded-md p-1" type="text" name="createdBy" id="createdBy" />
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
