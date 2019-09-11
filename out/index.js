"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ToDoControllerDB_1 = require("./controllers/ToDoControllerDB");
//import { DBConnector } from './DbConnector';
var app = express_1.default();
//set up template engine
app.set('view engine', 'ejs');
//static files
app.use(express_1.default.static('public'));
//fire controllers
//var todoController = new ToDoController(app)
//todoController.InitApp();
var todoControllerDB = new ToDoControllerDB_1.ToDoControllerDB(app);
todoControllerDB.InitApp();
//var dBConnector = new DBConnector()
//console.log(dBConnector.GetItemsFromDB())
app.listen(3000);
console.log("listening to port 3000");
//# sourceMappingURL=index.js.map