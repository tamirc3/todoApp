"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ToDoControllerDB_1 = require("./controllers/ToDoControllerDB");
var DbConnector_1 = require("./DbConnector");
var app = express_1.default();
//set up template engine
app.set('view engine', 'ejs');
//static files
app.use(express_1.default.static('public'));
//fire controllers
//var todoController = new ToDoController(app)
//todoController.InitApp();
var connectionString = "mongodb+srv://nice:nicecti1!@todo-6i4as.mongodb.net/test?retryWrites=true&w=majority";
var dBConnector = new DbConnector_1.DBConnector(connectionString);
var todoControllerDB = new ToDoControllerDB_1.ToDoControllerDB(app, dBConnector);
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
app.listen(3000);
console.log("listening to port 3000");
//# sourceMappingURL=index.js.map