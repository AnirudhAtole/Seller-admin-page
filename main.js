crud_add = "https://crudcrud.com/api/75bd461db5d44b5895d3aa1cc27fcbdd/seller"
let form = document.getElementById('my-form');
let elec = document.getElementById('elec-list');
let food = document.getElementById('food-list');
let skin = document.getElementById('skin-list');

form.addEventListener('submit',storeDetails);

elec.addEventListener('click',removeUser);
food.addEventListener('click',removeUser);
skin.addEventListener('click',removeUser);


function showExpenses(user){
    let li = document.createElement('li');
    li.className = "list-group-item";
    li.append(document.createTextNode(`Item name:-${user.item}    amount:-${user.amount}   category:- ${user.category} `));

    //creating a del button
    let delButton = document.createElement('button');
    delButton.appendChild(document.createTextNode("delete"));
    delButton.className = "btn-danger";
    
    //hidden id
    let hidden_id = document.createElement('span');
    hidden_id.class = 'hidden-id';
    hidden_id.style.display = "none";
    hidden_id.appendChild(document.createTextNode(user._id));

    li.appendChild(delButton);
    li.appendChild(hidden_id);

    if(user.category === "Electronics"){
        elec.appendChild(li);
    }
    else if(user.category === "Skincare"){
        skin.appendChild(li);
    }
    else{
        food.appendChild(li);
    }
}

async function showallUsers(){
    try{
        let response = await axios.get(crud_add);
        response.data.forEach(entry => showExpenses(entry));
    }
    catch(err){
        console.log(err);
    }
}
window.addEventListener("DOMContentLoaded" , ()=>{
    showallUsers();
})


async function storeDetailsTocrud(user){
    try{
        let response = await axios.post(crud_add,user);
        user._id = response.data._id;
        showExpenses(user);
    }
    catch(err){
        console.log(err)
    }
}

function storeDetails(e){
    e.preventDefault();
    const user ={ }
    user.item = document.getElementById('item').value;
    user.amount = document.getElementById('amount').value;
    user.category = document.getElementById('category').value;
    storeDetailsTocrud(user);
    
}

async function deleteUser(li,id){
    try{
        let response = await axios.delete(`${crud_add}/${id}`);
        let paren = li.parentElement;
        console.log(response);
        paren.removeChild(li);
    }
    catch(err){
        console.log(err);
    }
}

function removeUser(e){
    if(e.target.classList.contains('btn-danger')){
        let li = e.target.parentElement;
        const id = li.children[1].innerText;
        deleteUser(li,id);
    }
}
