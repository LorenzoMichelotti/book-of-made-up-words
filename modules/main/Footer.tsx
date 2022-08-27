export default function Footer() {
    return (
        <div className="mt-auto pt-[5rem] pb-[3rem] flex flex-col lg:flex-row text-center lg:text-left w-full justify-center  text-zinc-400">
          {/* footer */}
          <p>By Lorenzo Michelotti Graduate Software Engineer </p>
          <div className="flex justify-center">
            <a className="hover:underline text-blue-400 mx-1" href="https://www.linkedin.com/in/lorenzo-michelotti-b1b4441a7/">Linkedin</a>
            /
            <a className="hover:underline text-blue-400 ml-1" href="https://github.com/LorenzoMichelotti">Github</a>
          </div>
        </div>
    )
}