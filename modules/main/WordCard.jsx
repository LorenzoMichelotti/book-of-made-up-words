import {motion} from 'framer-motion'

export default function WordCard({wordName = "WordName", def = "", usage = "", imgUrl = ""}) {
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-2 border-slate-700 rounded-lg p-5 flex w-full">
            <img src={imgUrl} className="w-[10rem] h-[10rem] mr-5 bg-slate-500 rounded object-cover"></img>
            <div>
            <h1 className="text-[32px] font-bold">{wordName}</h1>
            <p className="mt-2">Def.: {def}</p>
            <p className="mt-2">Usage: &quot;{usage}&quot;.</p>
            </div>
        </motion.div>
    )
}