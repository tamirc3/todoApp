import express from 'express';
import { ToDoControllerDB } from './controllers/ToDoControllerDB';
import { DBConnector } from './DbConnector';


const app = express();



//set up template engine
app.set('view engine','ejs');
//static files
app.use(express.static('public'));

//fire controllers
//var todoController = new ToDoController(app)
//todoController.InitApp();


let connectionString = "mongodb+srv://nice:nicecti1!@todo-6i4as.mongodb.net/test?retryWrites=true&w=majority";
var dBConnector = new DBConnector(connectionString)
var todoControllerDB = new ToDoControllerDB(app,dBConnector)
todoControllerDB.InitApp();

/*
import mongoose from 'mongoose';

mongoose.connect(connectionString);
var toDoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    }
});
var ToDo = mongoose.model('ToDo', toDoSchema)//we creating a model
var dataToReturn: { item: string }[] = [];
ToDo.find({}, (err, data: Document[]) => {//to get specific item{item:"flowers"} if empty return all

if (err){
     console.log("error")
     throw err;
 }
 else { //convert to {item:string}

     data.forEach((element) => {
       // var itemElement = <{item:string}>element
        var itemElement  = JSON.parse(JSON.stringify(element));
        console.log("data to return is:")
             dataToReturn.push(itemElement)
         console.log(dataToReturn);
     });
 }
})
console.log("data to return is:")
console.log(dataToReturn)

*/
app.listen(3000)
console.log("listening to port 3000")