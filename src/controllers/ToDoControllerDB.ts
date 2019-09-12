import * as core from "express-serve-static-core";
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import { DBConnector } from "../DbConnector";

export class ToDoControllerDB {
    app: core.Express;
    dbConnector: DBConnector


    constructor(app: core.Express, dbConnector: DBConnector) {
        this.app = app;
        this.dbConnector = dbConnector;
    }

    InitApp() {

        var urlEncoderParser = bodyparser.urlencoded({ extended: false })

        this.app.get('/todo', (req, res) => {
            var data= this.dbConnector.GetItemsFromDB()
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