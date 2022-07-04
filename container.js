const fs = require('fs')

class  Conteiner {
    constructor (fileName){
        this.fileName =  fileName;
    }

    getAllElements = async() => {
        try {
            const content = await fs.promises.readFile(this.fileName, 'utf-8')
            return JSON.parse(content)
        }

        catch(error) {
            await fs.promises.writeFile(this.fileName,
                JSON.stringify([],
                     null,
                      2))

            const content = await fs.promises.readFile(this.fileName, 'utf-8')
            return JSON.parse(content)
        }
    }

    getRandomElement = async() => {
        const objArray = await this.getAllElements();
        const randomIndex = Math.floor(Math.random() * objArray.length);
        return objArray[randomIndex];
    }
    

    save = async(objeto) => {
        const objArray = await this.getAllElements();

        let maxId = 0;

        objArray.forEach(value => {
                if (value.id > maxId) {
                    maxId = value.id;}
            }
        );

        maxId+=1

        const obj= ({title:objeto.title, price:objeto.price, thumbnail:objeto.thumbnail, id: maxId})
        objArray.push(obj)

        objArray.push(obj)

        try{
            await fs.promises.writeFile(this.fileName,
                 JSON.stringify(objArray,
                     null,
                      2))

            return obj.id;

        }
        catch {
            throw new Error('We couldn´t save the file');
        }
    }

    getById = async(id) => {

        try{
            const objArray = await this.getAll();

            let output=  objArray.find( obj=> (obj.id===id))

            if (output) {

                return output
            }
            else {
                return null 
            }
        }
        catch {
            throw new Error('Error while finding ID');
        }
    }

    deleteById = async(id) => {
        
        try {
            const objArray = await this.getAll();
            
            for (let i=0; i< objArray.length;i++)
            {   
                if(id === objArray[i].id){

                    objArray.splice(i,1) 

                } 
            }

            await fs.promises.writeFile(this.fileName,
                 JSON.stringify(objArray, null, 2))

        } 
        catch {
            throw new Error('ERROR While deleting ID');
        }
    }

    deleteAll = async() => {
        
        try {

            await fs.promises.writeFile(this.fileName,
                JSON.stringify([],
                     null, 2))
        
        } 
        catch(error) {

            throw new Error('ERROR While deleting all Objects');
        
        }
    }
}

module.exports= Conteiner;