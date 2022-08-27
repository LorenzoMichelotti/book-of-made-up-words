interface CreateDate {
    seconds: number
}

export interface Word {
    def: string,
    usage: string,
    createdBy: string,
    wordName: string,
    createDate?: CreateDate
};
  
export interface WordList {
    words: Word[],
    count: number
}
