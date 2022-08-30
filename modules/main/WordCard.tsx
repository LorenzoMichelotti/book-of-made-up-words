import {motion} from 'framer-motion'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Word } from '../../common/models/Words'
import {useState} from 'react'

const likeVariant = {
    unliked: {color: 'gray', borderColor: 'gray'},
    liked: {color: 'red' ,borderColor: 'red'}
}

export default function WordCard({word}: {word: Word}) {
    const [liked, setLiked] = useState(false);
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-2 border-zinc-700 rounded-lg p-5 flex w-full">
            <div className="flex flex-col w-full justify-between">
                <div className="w-full flex flex-col">
                    <div className='flex justify-between'>
                        <h1 className="text-[32px] font-bold">{word.wordName}</h1>
                        <motion.button
                        onClick={() => setLiked(old => !old)}
                        variants={likeVariant}
                        animate={liked ? 'liked' : 'unliked'}
                        whileTap={{scale: 0.8}}
                        className='flex rounded-full w-10 h-10 text-slate-500'>
                            <div className='m-auto pt-1'>{liked ? <BsHeartFill size={30}></BsHeartFill> :<BsHeart size={30}></BsHeart>}</div>
                        </motion.button>
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