const signupForm = document.querySelector("#signup-form");
const message = document.querySelector("#message");
 
// signupForm.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const formData = new FormData(signupForm);
//     const data = Object.fromEntries(formData);
//     // console.log(data);
//     fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }).then(res=>{
//         res.json();
//         window.location.replace('/login');
//     })
//       .then(data => console.log(data))
//       .catch(error => console.log(error));
// })


signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);
    console.log(data);
    
    const signup = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const userData = await response.json();
            if(response.ok){
                alert("A verification mail is send to your email. Please check your email.");
                window.location.replace('/login');
            }
            else{
                // alert(userData.message);
                message.innerHTML = userData.message;
                message.style.color = 'red';
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    signup();
})