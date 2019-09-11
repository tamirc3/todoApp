import * as core from "express-serve-static-core";
import bodyparser from 'body-parser';
import mongoose from 'mongoose';

export class ToDoControllerDB {
    app: core.Express;


    constructor(app: core.Express) {
        this.app = app;

    }

    InitApp() {

        var urlEncoderParser = bodyparser.urlencoded({ extended: false })
        var connectionString = "mongodb+srv://nice:nicecti1!@todo-6i4as.mongodb.net/test?retryWrites=true&w=majority";
        mongoose.connect(connectionString);

        var toDoSchema = new mongoose.Schema({
            item: {
                type: String,
                required: true,
            }
        });

        var ToDo = mongoose.model('ToDo', toDoSchema)//we creating a model

        this.app.get('/todo', (req, res) => {
            ToDo.find({}, (err, data) => {//to get specific item{item:"flowers"} if empty return all
                if (err)
                    throw err;
                res.render('todo', { todos: data });
            })

        });

        this.app.post('/todo', urlEncoderParser, (req, res) => {

            var item1 = new ToDo({ item: req.body["item"]}).
                save(
                    (err, data) => {
                        if (err) {
                            throw err;
                        }
                        res.json(data)
                    }
                )
        });

        //'/todo/:item' its a paramter the comes with the URL
        this.app.delete('/todo/:item', (req, res) => {

            /*ToDo.find({ item: req.params.item }).remove(
                (err, data) => {
                    if (err)
                        throw err;
                    res.json(data)
                })
*/
        });
    }


}