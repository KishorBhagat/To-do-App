// console.log('otp script loaded');
const otpForm = document.querySelector("#otp-form");
const message = document.querySelector("#message");

otpForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const resetToken = localStorage.getItem('resetToken');

    const formData = new FormData(otpForm);
    const data = Object.fromEntries(formData);
    const email = JSON.parse(atob(resetToken.split('.')[1])).user.email;
    const reqObj = {email: email, resetCode: data.resetCode};
    // console.log(reqObj);
    const confirm = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/auth/verifyResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqObj)
            });
            const userResponse = await response.json();
            if(!userResponse.verified){
                message.innerHTML = userResponse.message;
                message.style.color = 'red';
            }
            else{
                window.location.replace('/resetPassword');
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    confirm();
})