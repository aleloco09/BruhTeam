"use strict";

const sqlite = require('sqlite3');
const db = new sqlite.Database('tasks.db', (err) => {if (err) throw (err); });

function getall(){
    let sql = "SELECT * FROM tasks";
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows)=> {
            if (err) reject (err);
            else {
                let dblist = new TaskList();
                for (let row of rows){
                    let dbtask = new Task(row.id, row.description, row.deadline);
                    dbtask.urgent = row.urgent;
                    dbtask.private = row.private;
                    dblist.add(dbtask);
                }
                resolve(dblist);
            }
        });
    });
}

function getbydate(date){
    let sql = "SELECT * FROM tasks WHERE deadline >= \"" + date +"\"";
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows)=> {
            if (err) reject (err);
            else {
                let dblist = new TaskList();
                for (let row of rows){
                    let dbtask = new Task(row.id, row.description, row.deadline);
                    dbtask.urgent = row.urgent;
                    dbtask.private = row.private;
                    dblist.add(dbtask);
                }
                resolve(dblist);
            }
        });
    });
}

function getbyword(word){
    let sql = "SELECT * FROM tasks WHERE description LIKE '%" + word + "%'";
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows)=> {
            if (err) reject (err);
            else {
                let dblist = new TaskList();
                for (let row of rows){
                    let dbtask = new Task(row.id, row.description, row.deadline);
                    dbtask.urgent = row.urgent;
                    dbtask.private = row.private;
                    dblist.add(dbtask);
                }
                resolve(dblist);
            }
        });
    });
}

function Task(id, description, deadline) {
    this.id = id;
    this.description = description;
    this.urgent = false;
    this.private = true;
    this.deadline = deadline;
}

function TaskList(){
    this.taskl = [];
    this.add = (element)=>{this.taskl.push(element)};

    this.sortAndPrint = () => {
        this.taskl.sort(function(a,b) {
            if(a.deadline == undefined){
                return 1;
            }
            if(b.deadline == undefined){
                return -1;
            }
            const dateA = new Date (a.deadline), dateB = new Date (b.deadline);
            return dateA - dateB;
        });
        console.log(this.taskl);
    }

    this.filterAndPrint = () => {
        console.log(this.taskl.filter(function(a){
            return a.urgent;
        }));
    }
}

async function main(){
    let list = await getall();
    list.sortAndPrint();
    list = await getbydate("2021-03-09T15:20:00.000Z");
    list.sortAndPrint();
    list = await getbyword("lab");
    list.sortAndPrint();
    db.close();
}

main();