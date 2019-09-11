"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var ToDoControllerDB = /** @class */ (function () {
    function ToDoControllerDB(app) {
        this.app = app;
    }
    ToDoControllerDB.prototype.InitApp = function () {
        var urlEncoderParser = body_parser_1.default.urlencoded({ extended: false });
        var connectionString = "mongodb+srv://nice:nicecti1!@todo-6i4as.mongodb.net/test?retryWrites=true&w=majority";
        mongoose_1.default.connect(connectionString);
        var toDoSchema = new mongoose_1.default.Schema({
            item: {
                type: String,
                required: true,
            }
        });
        var ToDo = mongoose_1.default.model('ToDo', toDoSchema); //we creating a model
        this.app.get('/todo', function (req, res) {
            ToDo.find({}, function (err, data) {
                if (err)
                    throw err;
                res.render('todo', { todos: data });
            });
        });
        this.app.post('/todo', urlEncoderParser, function (req, res) {
            var item1 = new ToDo({ item: req.body["item"] }).
                save(function (err, data) {
                if (err) {
                    throw err;
                }
                res.json(data);
            });
        });
        //'/todo/:item' its a paramter the comes with the URL
        this.app.delete('/todo/:item', function (req, res) {
            /*ToDo.find({ item: req.params.item }).remove(
                (err, data) => {
                    if (err)
                        throw err;
                    res.json(data)
                })
*/
        });
    };
    return ToDoControllerDB;
}());
exports.ToDoControllerDB = ToDoControllerDB;
//# sourceMappingURL=ToDoControllerDB.js.map