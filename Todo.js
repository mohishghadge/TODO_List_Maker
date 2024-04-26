const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");


const getTodoListFromLocal = ()=>{
  return JSON.parse(localStorage.getItem("Task"))
}
//Set Values in local storage
const addToDoListLocalStorage  = (localTodoLists)=>{
  return localStorage.setItem("Task",JSON.stringify(localTodoLists))
}

let addTodoDynamicElement =(CurrElem)=>{
  const divElem = document.createElement("div")
  //adding class into it 
  divElem.classList.add("main_todo_div");
  //Inside it creating one more li and with each li creating a button
  divElem.innerHTML = `<li>${CurrElem}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElem);

  inputValue.value = '';
}


let  localTodoLists = getTodoListFromLocal() || [];
const addTodoList = (e)=>{
  //To prevent Submission
  e.preventDefault();
  //To get the Values without any spaces 
  const todoListValue = inputValue.value.trim();
  //Condtion to check any value is not being put empty and also to check
  // wheather the values in the local storage is not equal to the value
  // inputed if not present insert the value
 if(todoListValue!=="" && !localTodoLists.includes(todoListValue)){

  //Appending the value
  localTodoLists.push(todoListValue);
  //To check the value is not repeated using Set and storing it in an
  // array using spread operator
  localTodoLists = [...new Set(localTodoLists)];
  console.log(localTodoLists)
  //Storing it in local storage by converting it in string format
  localStorage.setItem('Task',JSON.stringify(localTodoLists))
  //Calling addTodoDynamicElement
  addTodoDynamicElement(todoListValue)
 }
 else if(todoListValue === ""){
  alert("Task Can not be Empty")
 }
 else{
  alert("This Task Already Exists")
  inputValue.value = '';
 }

}

const showTodoList =() =>{
  console.log(localTodoLists);
//get the Element which will make all the div within it a class and li and button of each div
  localTodoLists.forEach((CurrElem)=>{
    addTodoDynamicElement(CurrElem)
  })

}
 
showTodoList();

//To remove the specfic element
const removeTodoElem = (e)=>{
  //e.target will give show u which event have been clicked within HTML  
  //console.log(e.target)

    const todoRemove = e.target;

    //checking e.target element nearest child node so to check wheather the text 
    //on that traget event and the value in the arrays are same.
    let todolistContent = todoRemove.previousElementSibling.innerText;
    
    //Similarly checking the Parent Element
    let parentListContent = todoRemove.parentElement;
    console.log(todolistContent)


    //Filtering and checking values and of  local storage  &  
    //todolistContent  and if not   same then  return  values execpt the currElem
   localTodoLists = localTodoLists.filter((currElem)=>{
    //console.log(currElem)
        return currElem !== todolistContent;
   })

   addToDoListLocalStorage(localTodoLists)
   //Remove whole parent Element
   parentListContent.remove();
   console.log(localTodoLists)
}  

mainTodoElem.addEventListener('click',(e)=>{
  e.preventDefault();
  //Checks weather the target event that a class  if yes, call removeTodoElem         
  if(e.target.classList.contains("deleteBtn")){

    removeTodoElem(e);
  }
  //document.querySelector(".deleteBtn").node
});


 
document.getElementById("btnAdd").addEventListener("click",(e) =>{
  addTodoList(e);

})
