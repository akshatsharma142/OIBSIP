loginForm.onsubmit=async e=>{e.preventDefault();msg.textContent='';let id=user.value.trim(),pw=await hashPassword(pass.value);let users=JSON.parse(localStorage.users||'[]');
let f=users.find(x=>(x.user===id||x.email===id)&&x.pass===pw);if(!f)return msg.textContent='Invalid username/email or password.';
localStorage.session=JSON.stringify({user:f.user});location='dashboard.html'};