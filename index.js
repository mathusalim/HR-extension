let potentialEmployees=[];

const inputEl=document.getElementById('input-el');
const employeeList=document.getElementById('employee-links');
const saveButton=document.getElementById('input-btn');

saveButton.addEventListener('click',()=>{SaveClick()});



function SaveClick(){
    potentialEmployees.push({comment:inputEl.value,id:potentialEmployees.length,link:''})
    renderData();
    inputEl.value=''
}


function renderData(){
    employeeList.innerHTML='';
    let listItems = ""
    for (let i = 0; i < potentialEmployees.length; i++) {
        listItems += "<li>" + potentialEmployees[i].comment + "</li>"
    }

    employeeList.innerHTML = listItems
}

renderData();
