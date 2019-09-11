"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
//import express from 'express';
var ToDoController = /** @class */ (function () {
    function ToDoController(app) {
        this.app = app;
        this.data = [{ item: 'getk milk' }, { item: 'walk dog' }, { item: 'check mail' }];
    }
    ToDoController.prototype.InitApp = function () {
        var _this = this;
        var urlEncoderParser = body_parser_1.default.urlencoded({ extended: false });
        this.app.get('/todo', function (req, res) {
            res.render('todo', { todos: _this.data });
        });
        this.app.post('/todo', urlEncoderParser, function (req, res) {
            console.log("got POST request with data " + req.body["item"]);
            _this.data.push(req.body);
            res.json(_this.data);
        });
        //'/todo/:item' its a paramter the comes with the URL
        this.app.delete('/todo/:item', function (req, res) {
            _this.data = _this.data.filter(function (todo) { return (todo.item !== req.params.item); });
            res.json(_this.data);
        });
    };
    return ToDoController;
}());
exports.ToDoController = ToDoController;
//# sourceMappingURL=TodoController.js.map