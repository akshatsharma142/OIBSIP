const input=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const pendingList=document.getElementById("pendingList");
const completedList=document.getElementById("completedList");
const pendingCount=document.getElementById("pendingCount");
const completedCount=document.getElementById("completedCount");
const pendingEmpty=document.getElementById("pendingEmpty");
const completedEmpty=document.getElementById("completedEmpty");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function save(){localStorage.setItem("tasks",JSON.stringify(tasks));}

function fmt(ts){return new Date(ts).toLocaleString();}

function render(){
 pendingList.innerHTML=""; completedList.innerHTML="";
 let p=0,c=0;
 tasks.forEach(t=>{
   const card=document.createElement("div");
   card.className="task-card";
   const title=t.editing?
      `<input value="${t.text}" id="edit-${t.id}">`:
      `<div class="${t.completed?'completed-task':''}">${t.text}</div>`;
   card.innerHTML=`${title}
   <div>Added: ${fmt(t.createdAt)}</div>
   ${t.completed?`<div>Completed: ${fmt(t.completedAt)}</div>`:""}
   <div class="task-buttons"></div>`;
   const btns=card.querySelector(".task-buttons");

   const toggle=document.createElement("button");
   toggle.textContent=t.completed?"Undo":"Complete";
   toggle.onclick=()=>{
      t.completed=!t.completed;
      t.completedAt=t.completed?Date.now():null;
      save(); render();
   };
   btns.appendChild(toggle);

   const edit=document.createElement("button");
   edit.textContent=t.editing?"Save":"Edit";
   edit.onclick=()=>{
      if(t.editing){
        const v=document.getElementById("edit-"+t.id).value.trim();
        if(v) t.text=v;
      }
      t.editing=!t.editing;
      save(); render();
   };
   btns.appendChild(edit);

   const del=document.createElement("button");
   del.textContent="Delete";
   del.onclick=()=>{
      if(confirm("Delete this task?")){
        tasks=tasks.filter(x=>x.id!==t.id);
        save(); render();
      }
   };
   btns.appendChild(del);

   if(t.completed){completedList.appendChild(card);c++;}
   else{pendingList.appendChild(card);p++;}
 });
 pendingCount.textContent=`${p} Pending`;
 completedCount.textContent=`${c} Completed`;
 pendingEmpty.style.display=p?"none":"block";
 completedEmpty.style.display=c?"none":"block";
}

function addTask(){
 const text=input.value.trim();
 if(!text)return;
 tasks.unshift({
   id:Date.now(),
   text,
   completed:false,
   createdAt:Date.now(),
   completedAt:null,
   editing:false
 });
 input.value="";
 save();
 render();
}

addBtn.onclick=addTask;
input.addEventListener("keypress",e=>{if(e.key==="Enter")addTask();});
render();
