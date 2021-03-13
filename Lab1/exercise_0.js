"use strict";

let array = ["alessandro", "cosimo", "katia", "giuseppe", "or" ];

const del = function(array){
    array.forEach(element => {
        if (element.length < 3){
            array[array.indexOf(element)] = "";
        }
        else{
            let firstpart = element.substr(0,2);
            let lastpart = element.substr(element.length-2, element.length-1);
            let final = firstpart.concat(lastpart);
            array[array.indexOf(element)] = final;
        }
    });
}

del(array);

console.log(array);




