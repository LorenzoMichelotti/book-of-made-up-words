import {AnimatePresence, motion} from 'framer-motion'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Word, WordList, wordsXlikes } from '../../common/models/Words'
import {Dispatch, SetStateAction, useState} from 'react'
import axios from 'axios'

const likeVariant = {
    unliked: {color: '#3F3F46', transition: {duration: 0.1}, opacity: [0, 1]},
    liked: { 
        scale: [1, 1, 1.2 ,0], 
        y: [0, -100], 
        opacity: [1, 1, 1, 0], 
        color: ['#3F3F46', '#5FFF99', '#00FF5D', '#3F3F46'], 
        transition: {duration: 0.25}}
}
const plusOneVariant = {
    unliked: {color: '#3F3F46', transition: {duration: 0.1}, opacity: 0},
    liked: { 
        scale: [1, 2, 2], 
        y: [0, -100], 
        opacity: [1, 1, 1, 0], 
        color: ['#3F3F46', '#5FFF99', '#00FF5D', '#3F3F46'], 
        transition: {duration: 0.25}}
}

export default function WordCard({word}: {word: Word}) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(word.likes ?? 0);

    async function addLike(wordId: string) {
        if (!liked)
            await axios.post<WordList>(`${process.env.NEXT_PUBLIC_API}like_word/${wordId}`)
    }

    return (
        <motion.div initial={{ opacity: 0, scaleY: 0.1, scaleX: 0.5 }} animate={{scaleY: 1, scaleX: 1}} whileInView={{ opacity: 1 }} className="border-2 border-zinc-700 rounded-lg p-5 flex w-full">
            <div className="flex flex-col w-full justify-between">
                <div className="w-full flex flex-col">
                    <div className='flex justify-between'>
                        <h1 className="text-[32px] font-bold">{word.wordName}</h1>
                        <button
                        onClick={() => setLiked(old => {setLikes(oldLikes => oldLikes+1); addLike(word.id); return !old})}
                        // whileTap={{scale: 0.8}}
                        className='flex rounded-full w-10 h-10 text-slate-500'>
                            <AnimatePresence>
                                <motion.div
                                key={'plusOne'}
                                className='absolute -ml-7 mt-3'
                                variants={plusOneVariant}
                                animate={liked ? 'liked' : 'unliked'}>+1</motion.div>
                                <div
                                className='absolute -ml-6 mt-2 text-[#00FF5D] text-right'
                                >{likes}</div>
                                <motion.div 
                                key={'heart'}
                                variants={likeVariant}
                                animate={liked ? 'liked' : 'unliked'}
                                onAnimationComplete={()=>setLiked(false)}
                                className='m-auto pt-1'>{liked ? <BsHeartFill size={30}></BsHeartFill> :<BsHeart size={30}></BsHeart>}</motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                    <div className="lg:mx-[20%] mt-5">
                        <p className="mt-2">Def.: {word.def}</p>
                        <p className="mt-2">Usage: {word.usage}</p>
                    </div>
                </div>
                <div className="self-end text-right mt-5">
                    <p className="text-slate-50">{word.createdBy}</p>
                    <p className="text-slate-400">{new Date(word.createDate.seconds*1000).toLocaleDateString()}</p>
                </div>
            </div>
        </motion.div>
    )
}