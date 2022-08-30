import {motion} from 'framer-motion'
import { Word } from '../../common/models/Words'

export default function WordCard({word}: {word: Word}) {
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-2 border-zinc-700 rounded-lg p-5 flex w-full">
            <div className="flex flex-col w-full justify-between">
                <div className="w-full flex flex-col">
                    <h1 className="text-[32px] font-bold">{word.wordName}</h1>
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