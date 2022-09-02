interface CreateDate {
    seconds: number
}

export interface Word {
    id: string,
    def: string,
    usage: string,
    createdBy: string,
    wordName: string,
    createDate?: CreateDate,
    likes: number
};
  
export interface WordList {
    words: Word[],
    count: number
}

export interface wordsXlikes {
    id: string,
    newLikes: number
}