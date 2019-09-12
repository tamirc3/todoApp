
import mongoose from 'mongoose';

export class DBConnector {

    connectionString: string;
    toDoSchema!: mongoose.Schema;
    ToDo!: mongoose.Model<mongoose.Document, {}>

    constructor(connectionString: string) {
        this.connectionString = connectionString

        this.ConnectToDBAndCreateSchemaAndModel();
    }

    ConnectToDBAndCreateSchemaAndModel() {
        mongoose.connect(this.connectionString);
        this.toDoSchema = new mongoose.Schema({
            item: {
                type: String,
                required: true,
            }
        });
        this.ToDo = mongoose.model('ToDo', this.toDoSchema)//we creating a model
    }

    GetItemsFromDB(): { item: string }[] {

        var dataToReturn: { item: string }[] = [];

        this.ToDo.find({}, (err, data: Document[]) => {//to get specific item{item:"flowers"} if empty return all
            if (err) {
                console.log("error")
                throw err;
            }
            else { //convert to {item:string}

                data.forEach(element => {
                    var itemElement = JSON.parse(JSON.stringify(element));
                    dataToReturn.push(itemElement)
                });
            }
        })
        return dataToReturn;
    }

    //todo
    /*  AddToDB() {
          var item1 = new ToDo({ item: "buy flowers" }).
              save(
                  (err) => {
                      if (err) {
                          throw err;
                      }
                      console.log("item saved")
                  }
              )
      }*/
}
