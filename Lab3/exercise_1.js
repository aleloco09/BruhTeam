"use strict";

/* document.addEventListener('DOMContentLoaded',(event)=>{
    const pageTitle= document.querySelector('header h1');
    const articleTitle= document.querySelector('main h1');
    const userForm= document.getElementById('userinfo');

    articleTitle.addEventListener('click',(event)=>{
            pageTitle.classList.toggle('bg-primary');
    });

    userForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            let username=userForm.elements['username'].value;
            console.log(username);
    });
}); */

function Task(id, description, deadline) {
    this.id = id;
    this.description = description;
    this.urgent = false;
    this.private = true;
    this.deadline = deadline;
}

function TaskList() {
    this.taskl = [];
    this.add = (element) => { this.taskl.push(element) };

    this.sortAndPrint = () => {
        this.taskl.sort(function (a, b) {
            if (a.deadline == undefined) {
                return 1;
            }
            if (b.deadline == undefined) {
                return -1;
            }
            const dateA = new Date(a.deadline), dateB = new Date(b.deadline);
            return dateA - dateB;
        });
        console.log(this.taskl);
    }

    this.filterAndPrint = () => {
        console.log(this.taskl.filter(function (a) {
            return a.urgent;
        }));
    }
}

const addToHtml = (taskList) => {
    let tl_all = document.getElementById('tasklist-all');

    let temp = '<li class="list-group-item"><div class="d-flex w-100 justify-content-between"><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="check-t1"> <label class="custom-control-label" id="taskName" for="check-t1"> </label></div><small id="taskDate"></small></div></li>';
    let icon = '<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>';
    for (let i = 0; i < taskList.length; i++) {
        tl_all.insertAdjacentHTML("beforeend", temp);
        //let cosa=document.querySelectorAll('[id=taskName]');
        //.insertAdjacentText("afterbegin",''+taskList[i].description);

        document.querySelectorAll('[id=taskName]')[i].insertAdjacentText("afterbegin", '' + taskList[i].description);
        document.querySelectorAll('[id=taskDate]')[i].insertAdjacentText("afterbegin", '' + taskList[i].deadline);
        if (!taskList[i].private) {
            document.querySelectorAll('[id=taskDate]')[i].insertAdjacentHTML("beforebegin", icon);
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const aside = document.querySelector('aside div');
    aside.addEventListener('click', (event) => {
        event.preventDefault();
        let main = document.querySelector('main');
        switch (event.which) {
            case 'All':
                let h1 = '<h1>All</h1>';
                main.insertAdjacentHTML("afterbegin", h1);
                break;
            case 'Important':
                let h1 = '<h1>Important</h1>';
                main.insertAdjacentHTML("afterbegin", h1);
                break;
            case 'Today':
                let h1 = '<h1>Today</h1>';
                main.insertAdjacentHTML("afterbegin", h1);
                break;
            case 'Next 7 Days':
                let h1 = '<h1>Next 7 Days</h1>';
                main.insertAdjacentHTML("afterbegin", h1);
                break;
            case 'Private':
                let h1 = '<h1>Private</h1>';
                main.insertAdjacentHTML("afterbegin", h1);
                break;
            default:
                break;
        }
        pageTitle.classList.toggle('bg-primary');
    });
});

let createTask = new TaskList;
createTask.add(new Task(1, "laundry"));
createTask.add(new Task(2, "monday lab", "March 16, 2021 10:00 AM"));
createTask.add(new Task(3, "phone call", "March 8, 2021 4:20 PM"));

createTask.taskl[1].private = false;
createTask.taskl[2].urgent = true;
createTask.taskl[2].private = false;

// addToHtml(createTask.taskl);

createTask.sortAndPrint();
// createTask.filterAndPrint();