const confirmForm = document.querySelector("#confirmation-form");

confirmForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(confirmForm);
    const data = Object.fromEntries(formData);
    
    const confirm = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/auth/requestResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if(response.ok){
                const userData = await response.json();
                localStorage.setItem("resetToken", userData.token);
                // alert("A security code is send to your email. Please check your email.");
                alert(userData.message);
                window.location.replace('/code');
            }
            // else{
            //     // alert("Invalid Credentials");
            // }
        } catch (error) {
            console.log(error);
        }
        
    }

    confirm();
})