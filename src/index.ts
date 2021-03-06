import express from 'express';
import { ToDoControllerDB } from './controllers/ToDoControllerDB';
import { DBConnector } from './DbConnector';


const app = express();



//set up template engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('public'));

//fire controllers
//var todoController = new ToDoController(app)
//todoController.InitApp();


let connectionString = "";
var dBConnector = new DBConnector(connectionString)
var todoControllerDB = new ToDoControllerDB(app, dBConnector)

todoControllerDB.InitApp();

app.listen(3000)
console.log("listening to port 3000")