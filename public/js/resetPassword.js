const resetPasswordForm = document.querySelector("#reset-password-form");
const message = document.querySelector("#message");


resetPasswordForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const resetToken = localStorage.getItem('resetToken');

    if(resetToken){
        const formData = new FormData(resetPasswordForm);
        const data = Object.fromEntries(formData);

        const update = async ()=>{
            try {
                const response = await fetch('http://localhost:5000/api/auth/updatePassword', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'resetToken': resetToken
                    },
                    body: JSON.stringify(data)
                });
                const userResponse = await response.json();
                message.innerHTML = userResponse.message;
                if(userResponse.status === "SUCCESS"){
                    alert(userResponse.message)
                    localStorage.removeItem("resetToken"); 
                    window.location.replace('/login');
                }
                if(userResponse.status === "FAILED"){
                    message.style.color = 'red';
                }
                // else{
                //     console.log("Something went wrong");
                // }
            } catch (error) {
                console.log(error);
            }
        }

        update();

    } 
    else{
        console.log('Authentication failed.');
    }

})