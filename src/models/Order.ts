import ETPDate from '@/models/ETPDate'
import Person from '@/models/Person'

export default class Order {
    id: number;
    creationDate: ETPDate;
    groupId: number;
    type: string;
    isCYC: boolean;
    person: Person;

    constructor(id: number, creationDate: ETPDate, groupId: number,
        type: string, isCYC: boolean, person: Person){
        this.id = id;
        this.creationDate = creationDate;
        this.groupId = groupId;
        this.type = type;
        this.isCYC = isCYC;
        this.person = person;
    }
}