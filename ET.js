const button = document.getElementById('button');
const form = document.getElementById('newForm');

const userList = document.getElementById('listOfExpenses');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let amount = e.target.amount.value;
    let desc = e.target.description.value;
    let cat = e.target.category.value;

        // const li = document.createElement('li');
        // li.appendChild(document.createTextNode(`${amount} : ${desc} : ${cat}`));
        // userList.appendChild(li);

         let Obj = {
            amount,
            desc,
            cat
        }
        localStorage.setItem(Obj.desc, JSON.stringify(Obj));

        let expense_deserialized = JSON.parse(localStorage.getItem(Obj.desc));
        console.log(expense_deserialized);
        showExpenseOnScreen(Obj);
});

window.addEventListener('DOMContentLoaded',() => {
    const localStorObj = localStorage;
    const localStorKeys = Object.keys(localStorObj);
    
    for(let i=0; i<localStorKeys.length; i++){
        const keey = localStorKeys[i];
        const expenseDetailStr = localStorObj[keey];
        const expenseDetailObj = JSON.parse(expenseDetailStr);
        showExpenseOnScreen(expenseDetailObj);
    }
})
function showExpenseOnScreen(expense){
    if(localStorage.getItem(expense.desc) !== null){
        removeExpenseFromScreen(expense.desc);
    }


    const parentNode = document.getElementById('listOfExpenses');
    const childHtml = `<li id=${expense.desc}> ${expense.amount}-${expense.desc}-${expense.cat} 
    <button onclick = deleteExpense('${expense.desc}') style = 'padding: 10px 10px; margin: 10px; background-color: beige'>Delete</button>
    <button onclick = editExpense('${expense.amount}','${expense.desc}','${expense.cat}') style = 'padding: 10px 10px; margin: 10px; background-color: beige'>Edit</button></li>`

    parentNode.innerHTML = parentNode.innerHTML + childHtml;
};
function deleteExpense(desc){
    console.log(desc);
    localStorage.removeItem(desc);
    removeExpenseFromScreen(desc)
}
function removeExpenseFromScreen(desc){
    const parentNode = document.getElementById('listOfExpenses');
    const childDeletion = document.getElementById(desc);
    // console.log(desc);
    if(childDeletion){
        parentNode.removeChild(childDeletion);
    }
}
function editExpense(amount,desc,cat){
    console.log(amount,desc,cat);
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = desc;
    document.getElementById('category').value = cat;

}
