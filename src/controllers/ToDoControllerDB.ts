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

            this.getItemsFromDB(res);

        });

        this.app.post('/todo', urlEncoderParser, (req, res) => {
            this.dbConnector.AddItemToDB(req.body).then(
                () => {
                    this.getItemsFromDB(res);
                }
            )
        });
 
         //'/todo/:item' its a paramter the comes with the URL
         this.app.delete('/todo/:item', (req, res) => {
 
            let item = {item:req.params.item}
            this.dbConnector.DeleteItemFromDB(item).then(
                () => {
                    this.getItemsFromDB(res);
                }
            )
        });
    }


    private getItemsFromDB(res: core.Response) {
        this.dbConnector.GetItemsFromDB().then((data: {
            
            item: string;
        }[]) => { res.render('todo', { todos: data }); });
    }
}