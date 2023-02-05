// console.log('otp script loaded');
const otpForm = document.querySelector("#otp-form");
const message = document.querySelector("#message");
const useremail = document.querySelector("#email");
const resendBtn = document.querySelector("#resendBtn");

const resetToken = localStorage.getItem('resetToken');
const email = JSON.parse(atob(resetToken.split('.')[1])).user.email;
useremail.innerHTML = email;
otpForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData = new FormData(otpForm);
    const data = Object.fromEntries(formData);
    // const reqObj = {email: email, resetCode: data.resetCode};

    const confirm = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/auth/verifyResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'resetToken': resetToken
                },
                body: JSON.stringify(data)
            });
            const userResponse = await response.json();
            console.log(userResponse);
            if(!userResponse.verified){
                message.innerHTML = userResponse.message;
                message.style.color = 'red';
            }
            else{
                localStorage.setItem("resetToken", userResponse.token);
                window.location.replace('/resetPassword');
            }
            // if(userResponse.status === 'EXPIRED'){
            //     resendBtn.value = 'Resend Code'
            // }
        } catch (error) {
            console.log(error);
        }
        
    }

    confirm();
})