import axios from "axios";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import ReactPaginate from "react-paginate";
import { WordList } from "../../common/models/Words";
import WordCard from "./WordCard";
import {motion} from 'framer-motion';
import { BsSearch } from "react-icons/bs";
import dynamic from "next/dynamic";

const DynamicCard = dynamic(() => import('./WordCard'), {
    loading: () => <div className='flex flex-col w-full h-[45vh]'>
    <div className='m-auto animate-spin'>
      <ImSpinner2 size={50}></ImSpinner2>
    </div>
  </div>,
})

export default function WordsListDisplay() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wordList, setWordList] = useState<WordList>({words: [], count: 0});
    const perPage: number = 12;

    async function getWords(page: number = 1, search?: string): Promise<WordList> {
        if (isLoading) return;
        console.log(search)
        setIsLoading(true);
        const { data, status } = search ? await axios.get<WordList>(`${process.env.NEXT_PUBLIC_API}get_word_by_name?page=${page}&perPage=${perPage}&search=${search}`) 
                                        : 
                                          await axios.get<WordList>(`${process.env.NEXT_PUBLIC_API}words?page=${page}&perPage=${perPage}`);
        setWordList(data as WordList);
        setIsLoading(false);
        window.scrollTo(0, 0);
        return data;
    }

    const handlePageClick = (event) => {
        getWords(event.selected + 1);
    };

    useEffect(() => {
        getWords();
    }, []);

    return(
        <div className="w-full lg:w-[60%] mx-auto lg:mt-20 mb-10 space-y-5">

            <form onSubmit={(formEvent) => {formEvent.preventDefault(); getWords(1, formEvent.target['search'].value);}} className="space-x-3 w-full flex items-center justify-center mb-10">
                <input placeholder="Search database" maxLength={100} className="bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-md p-2 px-5 w-[20rem]" type="text" name="search" id="searchInput" />

                <motion.div 
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.1}}
                className="relative"
                >
                    <input 
                    name="searchButton"
                    className="bg-[#00A6ED] hover:brightness-105 transition-colors p-2 px-5 mt-2 rounded-md" 
                    type="submit" 
                    value="" 
                    />
                    <div className="pointer-events-none absolute top-2 p-3 rounded-md">
                        <BsSearch></BsSearch>
                    </div>
                </motion.div>
            </form>

            {!isLoading && wordList.words.length > 0 ? 
              wordList.words.map((word, key) => <DynamicCard word={word} key={key}/>)
              :
              !isLoading ?
                <div className="text-center text-lg py-[5rem] justify-center align-middle items-center self-center">There are no words here yet.</div>
                :
                <div className='flex flex-col w-full h-[45vh]'>
                  <div className='m-auto animate-spin'>
                    <ImSpinner2 size={50}></ImSpinner2>
                  </div>
                </div>
            }
            <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(wordList.count/perPage)}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            className="flex space-x-1 mx-auto w-full justify-center pt-5 mb-[3rem]"
            pageLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
            previousLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
            nextLinkClassName="bg-zinc-800 font-bold p-2 px-3 rounded-lg text-center"
            activeLinkClassName="bg-zinc-700 font-bold text-blue-400 p-2 px-3 rounded-lg text-center"
            />
        </div>
    )
}