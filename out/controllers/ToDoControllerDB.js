"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var ToDoControllerDB = /** @class */ (function () {
    function ToDoControllerDB(app, dbConnector) {
        this.app = app;
        this.dbConnector = dbConnector;
    }
    ToDoControllerDB.prototype.InitApp = function () {
        var _this = this;
        var urlEncoderParser = body_parser_1.default.urlencoded({ extended: false });
        this.app.get('/todo', function (req, res) {
            var data = _this.dbConnector.GetItemsFromDB();
            console.warn(data);
            res.render('todo', { todos: data });
        });
        /*
                this.app.post('/todo', urlEncoderParser, (req, res) => {
        
                    var item1 = new ToDo({ item: req.body["item"] }).
                        save(
                            (err, data) => {
                                if (err) {
                                    throw err;
                                }
                                res.json(data)
                            }
                        )
                });
        */
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