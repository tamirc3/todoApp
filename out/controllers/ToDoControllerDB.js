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
            console.log("GOT GET REQUEST");
            _this.getItemsFromDBAndRenderResult(res);
        });
        this.app.post('/todo', urlEncoderParser, function (req, res) {
            _this.dbConnector.AddItemToDB(req.body).then(function () {
                _this.getItemsFromDBAndRenderResult(res);
            });
        });
        //'/todo/:item' its a paramter the comes with the URL
        this.app.delete('/todo/:item', function (req, res) {
            var item = { item: req.params.item };
            _this.dbConnector.DeleteItemFromDB(item).then(function () {
                _this.getItemsFromDBAndRenderResult(res);
            });
        });
    };
    ///since it is doing a get request after post/delete, this method is not needed....
    //but it was a good practise for using promise... :)
    ToDoControllerDB.prototype.getItemsFromDBAndRenderResult = function (res) {
        console.log("going to call get from DB");
        this.dbConnector.GetItemsFromDB().then(function (data) { res.render('todo', { todos: data }); });
    };
    return ToDoControllerDB;
}());
exports.ToDoControllerDB = ToDoControllerDB;
//# sourceMappingURL=ToDoControllerDB.js.map