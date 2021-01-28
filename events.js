
//definitions of main variables
const form1 = document.getElementById("form1");
const rows = document.getElementById("rows");
let itemsLeft = document.querySelector("#itemsLeft");
let resetButton = document.querySelector("#reset");
let activeButton = document.querySelector("#activeButton");
let completedButton = document.querySelector("#completedButton");
let allButton = document.querySelector("#allButton");
let clearComleted = document.querySelector("#clearButton");

// id counter for to have same ID to all task elements
let idCounter = -1;

// counter which is counting how many tasks is checked
let checkedCounter = 0;

//status is variable which is changing dependig on which button is clicked (all,active or comleted)
let status = "all";

// ENTER BUTTON EVENT
form1.addEventListener("keyup", function (e) {

    if (e.keyCode == 13 && form1.value.replace(/\s+/g, '').length != 0) {
        idCounter++;
        
        //definitions of variables
        const task = document.createElement("li");
        task.id = idCounter;

        const checkBoxLabel = document.createElement("label");
        checkBoxLabel.classList.add("myCheckbox");

        const check = document.createElement("input");
        check.type = "checkbox";
        check.id = idCounter;
        check.classList.add("checkBox");
        const checkBoxSpan = document.createElement("span");
        checkBoxSpan.classList.add("checkSpan");

        checkBoxLabel.appendChild(check);
        checkBoxLabel.appendChild(checkBoxSpan);

        const text = document.createElement("label");
        text.classList.add("taskText");
        const delButton = document.createElement("button");
        delButton.id = idCounter;
        delButton.classList.add("delbutton");

        text.textContent = form1.value;

        rows.appendChild(task);
        task.appendChild(checkBoxLabel);
        
        checkBoxLabel.appendChild(text);
        task.appendChild(delButton);

        delButton.textContent = "";

 // delButton CLICK EVENT
        delButton.addEventListener("click", event => {
            task.remove();
            let checkList3 = Array.from(document.querySelectorAll(".checkBox"));
            if (checkList3.length == 0) {
                itemsLeft.textContent = 0;
            }
            countItemsLeftNumber();
        });

        countItemsLeftNumber();

// CHECK CLICK EVENT
        check.addEventListener("click", event => {
            countItemsLeftNumber();
            display();
        });


       form1.value = "";
       display();
    }

});


 // RESET BUTTON CLICK EVENT
 let n = 2;
 resetButton.addEventListener("click", event => {
     let checkList4 = Array.from(document.querySelectorAll(".checkBox"));
     
     checkList4.forEach(function (i) {
         if (n % 2 == 0) {
             i.checked = 1;
         }
         else {
             i.checked = 0;
         }
     });
     n++;

     countItemsLeftNumber();
     display();
 });

 // ACTIVE BUTTON CLICK EVENT
 activeButton.addEventListener("click", event => {
     status = "active";
     display();
 });

 //COMLETED BUTTON CLICK EVENT 
 completedButton.addEventListener("click", event => {
     status = "completed";
     display();
 });

 //ALL BUTTON CLICK EVENT
 allButton.addEventListener("click", event => {
     status = "all";
     display();
 });

 // CLEAR COMPLETED BUTTON CLICK EVENT
 clearComleted.addEventListener("click", event => {
     let checkList7 = Array.from(document.querySelectorAll(".checkBox"));
     let liList = Array.from(document.querySelectorAll("li"));
     checkList7.forEach(function (i) {
         if (i.checked == 1) {
             liList.forEach(function (a) {
                 if (a.id == i.id) {
                     a.remove();
                 }
             })
         };
     });
 })

// function which checks how many tasks are left to be done (number of not-checked tasks)
function countItemsLeftNumber() {
    let checkList = Array.from(document.querySelectorAll(".checkBox"));

        checkList.forEach(function (i) {
            if (i.checked == 1) {
                checkedCounter++;
            };
            itemsLeft.textContent = checkList.length - checkedCounter;
        });

        checkedCounter = 0;
}

// function which show or hide tasks depending on which button is clicked (all,active or comleted button)
function display() {
    let checkList7 = Array.from(document.querySelectorAll(".checkBox"));
    let liList = Array.from(document.querySelectorAll("li"));

    if (status === "all") {
        liList.forEach(function (a) {
            a.style.display = "";
        });
    }
    else if (status === "active") {
        //FIRST STEP: DO ALL TASKS VISIBLE
        liList.forEach(function (a) {
            a.style.display = "";

        });

        //SECOND STEP: DO JUST TASKS WICH ARE CHECKED NOT VISIBLE
        checkList7.forEach(function (i) {
            if (i.checked == 1) {
                liList.forEach(function (a) {
                    if (a.id == i.id) {
                        a.style.display = "none";
                    }

                })
            }
        });
    }

    else if(status === "completed"){
        //FIRST STEP: DO ALL TASKS NOT VISIBLE  
        liList.forEach(function (a) {
            a.style.display = "none";
        });

        //SECOND STEP: DO JUST TASKS WICH ARE CHECKED VISIBLE
        checkList7.forEach(function (i) {
            if (i.checked == 1) {
                liList.forEach(function (a) {
                    if (a.id == i.id) {
                        a.style.display = "";
                    }


                })
            };
        });
    }
}






