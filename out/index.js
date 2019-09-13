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
var connectionString = "";
var dBConnector = new DbConnector_1.DBConnector(connectionString);
var todoControllerDB = new ToDoControllerDB_1.ToDoControllerDB(app, dBConnector);
todoControllerDB.InitApp();
app.listen(3000);
console.log("listening to port 3000");
//# sourceMappingURL=index.js.map