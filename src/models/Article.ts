import ETPDate from '@/models/ETPDate'
import Person from '@/models/Person'

export default class Article {
    id: number;
    name: string;
    brand: string;
    category: string;
    image: string;
    price: number;
    quantity: number;

    constructor(id: number, name: string, brand: string, category: string,
        image: string, price: number, quantity: number){

        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
}