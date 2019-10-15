import ETPDate from '@/models/ETPDate'

export default class Person {
    fullName: string;
    threeWordsLastName: string;

    constructor(fullName: string, threeWordsLastName: string){
        this.fullName = fullName;
        this.threeWordsLastName = threeWordsLastName;
    }
}