export default class Magasin {
    id;
    name;
    site;

    constructor(id, name, site){
        this.id = id;
        this.name = name;
        this.site = site;
    }
    
    toString(){
        return this.id + ' - ' + this.name;
    }
}