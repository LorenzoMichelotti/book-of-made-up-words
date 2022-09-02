import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import Swal from "sweetalert2";
import Response from "../../common/models/Response";
import { Word } from "../../common/models/Words";
import {motion} from 'framer-motion';

export default function AddWordForm({setIsModalOpen}: {setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>();
    
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
        formRef.current.reset();
        setIsModalOpen(false);
        window.location.reload();
    }

    return (
        <form ref={formRef} onSubmit={(event) => {
            onSubmit(event)}} action="post">
            <div className="flex flex-col items-center space-y-3 lg:my-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[70%]">
                <label  htmlFor="wordName">Word name:</label>
                <input maxLength={100} className="dark:bg-zinc-50 text-bg-500 rounded-md p-1" type="text" name="wordName" id="wordName" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[70%]">
                <div>
                <label htmlFor="def">Definition:</label>
                <legend className="text-sm text-zinc-500">max. length 100 chars</legend>
                </div>
                <textarea maxLength={100} className="dark:bg-zinc-50 resize-none text-zinc-900 rounded-md p-1 h-[5rem]" name="def" id="def" cols={30} rows={10}></textarea>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[70%]">
                <div>
                <label  htmlFor="def">Usage/Example:</label>
                <legend className="text-sm text-zinc-500">max. length 100 chars</legend>
                </div>
                <textarea maxLength={100} className="dark:bg-zinc-50 resize-none text-zinc-900 rounded-md p-1 h-[5rem]" name="usage" id="usage" cols={30} rows={10}></textarea>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[70%]">
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
    )
}