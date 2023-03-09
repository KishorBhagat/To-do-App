const loginForm = document.querySelector("#login-form");
const message = document.querySelector("#message");

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    // console.log(data);

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify(data)
            });
            // console.log(response);
            const userData = await response.json();
            if(response.ok){
                // console.log(userData);
                localStorage.setItem("authToken", userData.token);
                window.location.replace('/todo');
            }
            else{
                alert(userData.message);
                // message.innerHTML = userData.message;
                // message.style.color = 'red';
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
})