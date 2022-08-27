export default function TitleHeader() {
    return (
        <>
            <div className="flex mt-12 items-center">
                <span className="mt-1 text-[64px]">🔡</span>
                <div>
                <h1 className="text-[24px] font-medium">Book of made up words</h1>
                <legend className="text-sm text-zinc-400">By Lorenzo Michelotti</legend>
                </div>
            </div>
            <div className="ml-3 my-5 text-zinc-400">
                A collection of words that do not fit a regular dictionary.
            </div>
        </>
    )
}