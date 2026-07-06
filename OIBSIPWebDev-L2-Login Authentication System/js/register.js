regForm.onsubmit=async e=>{e.preventDefault();msg.className='msg';let u=user.value.trim(),em=email.value.trim(),pw=pass.value;
if(!u||!em||!pw)return msg.textContent='All fields are required.';
if(!/^\S+@\S+\.\S+$/.test(em))return msg.textContent='Invalid email.';
if(pw.length<8||!/\d/.test(pw))return msg.textContent='Password needs 8+ chars and a number.';
let users=JSON.parse(localStorage.users||'[]');
if(users.some(x=>x.user===u||x.email===em))return msg.textContent='Username or email already exists.';
users.push({user:u,email:em,pass:await hashPassword(pw)});
localStorage.users=JSON.stringify(users);msg.className='msg ok';msg.textContent='Registration successful! Redirecting...';setTimeout(()=>location='index.html',1200)};