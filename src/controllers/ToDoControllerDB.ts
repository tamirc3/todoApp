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

            console.log("GOT GET REQUEST")
            this.getItemsFromDBAndRenderResult(res);

        });

        this.app.post('/todo', urlEncoderParser, (req, res) => {
            this.dbConnector.AddItemToDB(req.body).then(
                () => {
                    this.getItemsFromDBAndRenderResult(res);
                }
            )
        });
 
         //'/todo/:item' its a paramter the comes with the URL
         this.app.delete('/todo/:item', (req, res) => {
 
            let item = {item:req.params.item}
            this.dbConnector.DeleteItemFromDB(item).then(
                () => {
                    this.getItemsFromDBAndRenderResult(res);
                }
            )
        });
    }

///since it is doing a get request after post/delete, this method is not needed....
//but it was a good practise for using promise... :)
    private getItemsFromDBAndRenderResult(res: core.Response) {
        console.log("going to call get from DB")
        this.dbConnector.GetItemsFromDB().then((data: {
            item: string;
        }[]) => { res.render('todo', { todos: data }); });
    }
}