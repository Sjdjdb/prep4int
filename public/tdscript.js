// querySelector() function is a method in JavaScript that allows you to select the first element within 
// the document that matches a specified CSS selector. It returns the first occurrence of an element that 
// matches the selector or null if no matches are found.
// Note: The querySelector() method only returns the first element that matches the specified selectors. 
// To return all the matches, use the querySelectorAll() method instead.
const taskInput = document.querySelector(".tdtask-input input");
//ye sare tdfilters k andar k span ko array me rakh k de dega with id....console.log(filters[1]); ye 3 wala span dega
const filters = document.querySelectorAll(".tdfilters span");
const clearAll = document.querySelector(".tdclear-btn");
const taskBox = document.querySelector(".tdtask-box");

let editId;
let isEditTask = false;

// JSON.parse()
// A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, 
// the data is always a string. Parse the data with JSON.parse() , and the data becomes a JavaScript object.

// todo-list nam se hamne local storage me save kar rakha hai datas ko  
let todos = JSON.parse(localStorage.getItem("todo-list"));
// agar JSON.parse nhi karenge to wo localstorag se data hame string me milega. par ham use tabhi na kar payenge id k sath
// agar wo javascript object k form me ho

//step7.............................................................................................................................
filters.forEach(btn => {
    btn.addEventListener("click", () => { //jaise hi click karo
        //span.active wo element dega jisme active class hai aur aisa hamesha ek hi element rhega jisme ham currently hai
        //initially all me class active hai to agar pending click karte hai to all me se active hatayenge
        //aur pending wale me dal denge..usi tarah agar completed me click kiye to pending wake se hata k completed me dal denge
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id); //btn.id yani ham us span me jo bhi id rakhe hai wo yani ya all ya pending ya completed
    });
});

//step2...........................................................................................................................
function showTodo(filter) {
    // filter me ya all hoga ya pending ya completed
    let liTag = "";
    if(todos){
        todos.forEach((todo, id) => {
            //ye niche wala bas isiliye kiye hai taki agar status completed ho to ham use class checked de sake
            // aur uske upr line khincha sake
            let completed = todo.status == "completed" ? "checked" : "";
            // let completed=""; upar wale ki jagah ye bhi kar sakte ho kuki isko ham bad me hi add kar rhe
            // agar checked hai tab

            //filter=="all" to pahli bar ke liye tha 
            //aur todo me hamara taskname aur id hai to yaha agar hame step7 se agar showToDo("pending") k liye call
            //aaya to filter=="all" wala to pahle hi gya rhi bat filter == todo.status ki to ye tabhi 
            //tabhi true hoga jab status uska completed hoga isliye wahi wahi dikhega hame jiska status 
            //completed hai baki (yani pending) k liye true hi nhi hoga.
            if(filter == todo.status || filter == "all") { //agar step1 se aaye ho to filter "all" hi rhega
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                          </li>`;

            }
            
        });
    }
    // bc aisa bhi hota hai
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    //total count of task nikal jayega isse 
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    // clearAll.classList.add("active"); upar k dono ka koi mtlb hi nhi nikalata sidha ye karne se bhi
    // kam chal jayega kuki jab length 0 hai to hata k kya hi fayada class ko 
    // ye niche wala wahi hai ki isse jyada height to overflow auto kar dena
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
// ye nhi karoge to pahli bar jate me task nhi dikhayega phir tabhi dikhayega jab tum kch likh k enter dabaoge
showTodo("all");

//step4....................................................................................................................
//is wale ko css me bhi kar sakte the
function showMenu(selectedTask) {
    console.log(selectedTask);
    // selectedTask ka bap setting wala uska last child hai ul wala usme hamne show class add kiya hai
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show"); //class add kiye taki property laga sake
    //niche wala hai ki uske alawa baki kahi click karw to wapas band bhi ho jaye...uske liye hamne class hi remove kar diya jo jode the
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) { //ye dusara wala mujhe nhi lagata kisi 
            // kam ka hai kuki dono same hi to hai
            menuDiv.classList.remove("show");
        }
    });
}

//step3......................................................................................................................
function updateStatus(selectedTask) {
    // selectedTask me <input onclick="updateStatus(this)" type="checkbox" id="2"> ye tha
    // yani upar se this jo pass kiye the usme wo us element ko hi pass karta hai.
    // console.log(selectedTask);
    let taskName = selectedTask.parentElement.lastElementChild;
    // <label for="${id}">
    // <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
    // <p class="${completed}">${todo.name}</p>
    // </label>
    // console.log(taskName); ye upar wale ke hisab se <p class="checked">ff</p> ye print karega
    if(selectedTask.checked) { // .checked batta hai ki hamara checkbox tick hua hai ya nhi
        taskName.classList.add("checked"); //jaise hi ye class add karoge css me ispe lagi hui property kam me aayegi
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    //hamne sirf todo array me change kiya hai hame local storage me bhi to update karna padega
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

//step5............................................................................................................
function editTask(taskId, textName) {
    isEditTask = true;
    //editId ko globally define kiye hai taki jaise hi edit karke ham enter dabaye us wale function me jaye
    //aur is id ka use karke edit kare
    editId = taskId;
    taskInput.value = textName; //jo bhi name tha task ka use us taskinput me dal de
    taskInput.focus(); //input field pe focus de dega
    taskInput.classList.add("active");
}

//step6..................................................................................................................
function deleteTask(deleteId, filter) {
    // isEditTask = false; iska kam nhi hai ig
    todos.splice(deleteId, 1); //is id se ya bole to index se 1 size tak delete kar do
    // wapas update kar do
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter); //ab all wale se aaya hoga to all wala show karega nhi to pending ya compleed jobhi
}

//step anywhere............................................................................................................
clearAll.addEventListener("click", () => {
    // isEditTask = false; iska kam nhi hai i guess
    todos.splice(0, todos.length); // 0 index se utne size ka hata do
    localStorage.setItem("todo-list", JSON.stringify(todos)); //save kiye
    showTodo(); //show kiye
});

//step 1......................................................................................................................
// keyup rhta hai ki koi bhi key agar click kiye ho to use trace karna
taskInput.addEventListener("keyup", e => {
    // The trim() function in JavaScript is used to remove whitespace (spaces, tabs, and newlines) from 
    // both the beginning and the end of a string. It is often used to clean up user input or to remove 
    // unnecessary whitespace before validating or processing the input.
    let userTask = taskInput.value.trim();
    // console.log(userTask); ye ham jo bhi likhte jayenge use print karta jayega
    // console.log(e.key); ye jo bhi key dabaoge use console me likh dega
    if(e.key == "Enter" && userTask) {//yani agar enter dabaya aur usne kch likha ho tabhi nhi to ku jodoge
        if(!isEditTask) {
            todos = !todos ? [] : todos; //shuru me hamare todo-list me kch nhi hega to !todos true ho jayega
            // us condition me hame todos ko empty rakhna hoga []... agar nhi to use todos hi rhne do.
            // actually todos me javascript object hai with ids...as a array samajh lo yar.

            //ab ham naya ek bana rhe name aur status k sath aur use hi todos me dalunga 
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = ""; //taki enter dabate hi wo jagah wapas blank ho jayega
        
        // A common use of JSON is to exchange data to/from a web server. When sending data to a web server,
        //  the data has to be a string. Convert a JavaScript object into a string with JSON.stringify().

        // todo-list karke key hai aur usme ham value dal rhe todos ka... ek bar inspect me ja ke application me 
        // ja ke local storage k bagal wala arrow click karna dikhega...values me sare todos as a object ek 
        // sath rhenge.
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id); //ye id all dega yani span k andar jo active class hai
        //uska id kya hai karke
    }
});