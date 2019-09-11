import express from 'express';
import { ToDoControllerDB } from './controllers/ToDoControllerDB';
//import { DBConnector } from './DbConnector';

const app = express();



//set up template engine
app.set('view engine','ejs');
//static files
app.use(express.static('public'));

//fire controllers
//var todoController = new ToDoController(app)
//todoController.InitApp();

var todoControllerDB = new ToDoControllerDB(app)
todoControllerDB.InitApp();
//var dBConnector = new DBConnector()
//console.log(dBConnector.GetItemsFromDB())
app.listen(3000)
console.log("listening to port 3000")