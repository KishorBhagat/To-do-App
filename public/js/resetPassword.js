const resetPasswordForm = document.querySelector("#reset-password-form");

const update = async (reqObj)=>{
    try {

        const response = await fetch('http://localhost:5000/api/auth/updatePassword', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqObj)
        });
        const userResponse = await response.json();
        localStorage.removeItem("resetToken");
        // console.log(userResponse);
        alert(userResponse.message)
        if(userResponse.status === "SUCCESS"){
            window.location.replace('/login');
        }
        // else{
        //     console.log("Something went wrong");
        // }
    } catch (error) {
        console.log(error);
    }
    
}

resetPasswordForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const resetToken = localStorage.getItem('resetToken');

    if(resetToken){
        const formData = new FormData(resetPasswordForm);
        const data = Object.fromEntries(formData);
        const id = JSON.parse(atob(resetToken.split('.')[1])).user.id;
        const reqObj = {id: id, newpassword: data.newpassword};

        update(reqObj);

    } 
    else{
        console.log('Authentication failed.');
    }

})