"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var DBConnector = /** @class */ (function () {
    function DBConnector(connectionString) {
        this.connectionString = connectionString;
        this.ConnectToDBAndCreateSchemaAndModel();
    }
    DBConnector.prototype.ConnectToDBAndCreateSchemaAndModel = function () {
        mongoose_1.default.connect(this.connectionString, { useUnifiedTopology: true, useNewUrlParser: true });
        this.toDoSchema = new mongoose_1.default.Schema({
            item: {
                type: String,
                required: true,
            }
        });
        this.ToDo = mongoose_1.default.model('ToDo', this.toDoSchema); //we creating a model
    };
    DBConnector.prototype.GetItemsFromDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dataToReturn = [];
            _this.ToDo.find({}, function (err, data) {
                if (err) {
                    console.log("error");
                    reject();
                    throw err;
                }
                else { //convert to {item:string}
                    data.forEach(function (element) {
                        var itemElement = JSON.parse(JSON.stringify(element));
                        dataToReturn.push(itemElement);
                    });
                    console.log("got #" + dataToReturn.length + "items from DB");
                    resolve(dataToReturn);
                }
            });
        });
    };
    DBConnector.prototype.AddItemToDB = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var item1 = new _this.ToDo(item).
                save(function (err, data) {
                if (err) {
                    console.error("failed to save to DB");
                    throw err;
                }
            });
            console.log(item.item + " was added");
            resolve();
        });
    };
    DBConnector.prototype.DeleteItemFromDB = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.ToDo.find(item).remove(function (err) {
                if (err)
                    throw err;
            });
            console.log(item.item + " was deleted");
            resolve();
        });
    };
    return DBConnector;
}());
exports.DBConnector = DBConnector;
//# sourceMappingURL=DbConnector.js.map