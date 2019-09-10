import express from 'express';

import { ToDoController } from './controllers/todoController';

const app = express();



//set up template engine
app.set('view engine','ejs');
//static files
app.use(express.static('public'));

//fire controllers
var todoController = new ToDoController(app)
todoController.InitApp();


app.listen(3000)
console.log("listening to port 3000")