"use strict";
/*
import mongoose from 'mongoose';

export class DBConnector {

    GetItemsFromDB():{item:string}[]{

        var toDoSchema = new mongoose.Schema({
            item: {
              type: String,
              required: true,
            }
          });
        var ToDo = mongoose.model('ToDo',toDoSchema)//we creating a model
        var dataToReturn:{item:string}[]=[];

        ToDo.find({},(err,data)=>{//to get specific item{item:"flowers"} if empty return all
            if (err)
            throw err;
            dataToReturn= data
        })

        return dataToReturn;
    }
ConenctToB(){

    let connectionString = "mongodb+srv://nice:nicecti1!@todo-6i4as.mongodb.net/test?retryWrites=true&w=majority";
    mongoose.connect(connectionString);
    
    var toDoSchema = new mongoose.Schema({
           item: {
             type: String,
             required: true,
           }
         });

    var ToDo = mongoose.model('ToDo',toDoSchema)//we creating a model

    var item1 = new ToDo({item:"buy flowers"}).
    save(
        (err)=>{
            if(err){
                throw err;
            }
            console.log("item saved")
        }
        )



    }
}*/ 
//# sourceMappingURL=DbConnector.js.map