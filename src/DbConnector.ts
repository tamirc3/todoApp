
import mongoose from 'mongoose';
import { resolve } from 'url';
import { rejects } from 'assert';

export class DBConnector {

    connectionString: string;
    toDoSchema!: mongoose.Schema;
    ToDo!: mongoose.Model<mongoose.Document, {}>

    constructor(connectionString: string) {
        this.connectionString = connectionString

        this.ConnectToDBAndCreateSchemaAndModel();
    }

    ConnectToDBAndCreateSchemaAndModel() {
        mongoose.connect(this.connectionString,{ useUnifiedTopology: true,useNewUrlParser: true });
        this.toDoSchema = new mongoose.Schema({
            item: {
                type: String,
                required: true,
            }
        });
        this.ToDo = mongoose.model('ToDo', this.toDoSchema)//we creating a model
    }

    GetItemsFromDB(): Promise<{ item: string }[]> {

        return new Promise((resolve,reject) => {
            var dataToReturn: { item: string }[] = [];
            this.ToDo.find({}, (err, data: Document[]) => {//to get specific item{item:"flowers"} if empty return all
                if (err) {
                    console.log("error")
                    reject()
                    throw err;
                }
                else { //convert to {item:string}
                  
                    data.forEach(element => {
                        var itemElement = JSON.parse(JSON.stringify(element));
                        dataToReturn.push(itemElement)
                    });
                    console.log("got #"+ dataToReturn.length+"items from DB")
                    resolve(dataToReturn);
                }
            })
        }) 
    }

    
      AddItemToDB(item:{item:string}) :Promise<void> {

        return new Promise((resolve,reject) => {

            var item1 = new this.ToDo(item).
            save(
                (err, data) => {
                    if (err) {
                        console.error("failed to save to DB");
                        throw err;
                    }
                }
            )
            console.log(item.item + " was added")
            resolve();
        });
        

      }

      DeleteItemFromDB(item:{item:string}) :Promise<void> {

        return new Promise((resolve,reject) => {
            this.ToDo.find(item).remove(
                (err) => {
                    if (err)
                        throw err;
                })

                console.log(item.item + " was deleted")
            resolve();
        });
        

      }
}
