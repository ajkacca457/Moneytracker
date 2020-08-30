const currentbalance=document.querySelector("#tbalance");
const income=document.querySelector("#income");
const expense=document.querySelector("#expense");
const transname=document.querySelector("#tname");
const tvalue=document.querySelector("#tval");
const itemcont=document.querySelector("ul");
const btn=document.querySelector("#submit");
const form=document.querySelector("#newtransaction");

console.log(form)

const dummyItem=[
  
]

let transactions=dummyItem;

function addtoDOM(transaction){
const sign= transaction.amount<0?"-":"+";
const item=document.createElement("li");
item.classList.add(transaction.amount<0?"minus":"plus");
item.classList.add("item");
item.innerHTML=`<span>${transaction.name}</span> <span>${sign}${Math.abs(transaction.amount)}<i class="fas fa-times-circle" onclick="removetransaction(${transaction.id})"></i></span>`
itemcont.appendChild(item);
}

function updateValue(){
const amount=transactions.map(item=>item.amount);
const total= amount.reduce((acc,item)=>(acc+=item),0).toFixed(2);
const tincome=amount.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
const texpense=(amount.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
income.innerHTML=`<div id="income"><h3>Income:</h3><h3>${tincome}$</h3></div>`;
expense.innerHTML=`<div id="expense"><h3>Income:</h3><h3>${texpense}$</h3></div>`;
currentbalance.innerHTML=`<h2 id="tbalance">${total}$</h2>`
}

function addtransaction(){
if(transname.value.trim()===""||tvalue.value.trim()===""){
  alert("please enter transaction name and amount")
}
else {
const transaction= {
  id:randomID(),
  name:transname.value,
  amount:+tvalue.value
}
transactions.push(transaction);

transname.value="";
tvalue.value="";

addtoDOM(transaction);
updateValue();
}
}

function randomID(){
  return Math.floor(Math.random()*100000000)
}

function removetransaction(id){
transactions=transactions.filter(item=>item.id!==id);
init();
}

function init(){
  itemcont.innerHTML="";
  transactions.forEach(addtoDOM);
  updateValue();
}

btn.addEventListener("click",addtransaction)

init();
