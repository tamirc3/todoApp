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
        mongoose_1.default.connect(this.connectionString);
        this.toDoSchema = new mongoose_1.default.Schema({
            item: {
                type: String,
                required: true,
            }
        });
        this.ToDo = mongoose_1.default.model('ToDo', this.toDoSchema); //we creating a model
    };
    DBConnector.prototype.GetItemsFromDB = function () {
        var dataToReturn = [];
        this.ToDo.find({}, function (err, data) {
            if (err) {
                console.log("error");
                throw err;
            }
            else { //convert to {item:string}
                data.forEach(function (element) {
                    var itemElement = JSON.parse(JSON.stringify(element));
                    dataToReturn.push(itemElement);
                });
            }
        });
        return dataToReturn;
    };
    return DBConnector;
}());
exports.DBConnector = DBConnector;
//# sourceMappingURL=DbConnector.js.map