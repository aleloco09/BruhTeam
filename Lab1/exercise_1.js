"use strict";

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



let createTask = new TaskList;
createTask.add(new Task(1, "laundry"));
createTask.add(new Task(2, "monday lab", "March 16, 2021 10:00 AM"));
createTask.add(new Task(3, "phone call", "March 8, 2021 4:20 PM"));

createTask.taskl[1].private = false;
createTask.taskl[2].urgent = true;
createTask.taskl[2].private = false;

createTask.sortAndPrint();


createTask.filterAndPrint();

