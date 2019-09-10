import * as core from "express-serve-static-core";
import bodyparser from 'body-parser';
//import express from 'express';
export class ToDoController {
    app:core.Express;
    data:{item:string}[];

    constructor(app:core.Express) {
      this.app = app;    
      this.data = [{item:'getk milk'},{item:'walk dog'},{item:'check mail'}];
    }
    
    InitApp(){

        var urlEncoderParser = bodyparser.urlencoded({extended:false})

        this.app.get('/todo', (req,res) =>{
            res.render('todo',{todos:this.data});
        });

        this.app.post('/todo',urlEncoderParser, (req,res) => {
            console.log("got POST request with data " + req.body["item"])

            this.data.push(req.body)
            res.json(this.data)
        });

        //'/todo/:item' its a paramter the comes with the URL
        this.app.delete('/todo/:item', (req,res) =>{  

            this.data= this.data.filter( (todo:{item:string})=> (todo.item !== req.params.item ));
            res.json(this.data)
        });
    }
      
}