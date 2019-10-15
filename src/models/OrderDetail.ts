import Article from '@/models/Article'
import Person from '@/models/Person'

export default class OrderDetail {
    articles: Array<Article>;
    total: number;

    constructor(articles: Array<Article>, total: number){
        this.articles = articles;
        this.total = total;
    }
}