const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            // console.log(response);
            if(response.ok){
                const userData = await response.json();
                localStorage.setItem("auth-token", userData.token);
                window.location.replace('/todo');
            }
            else{
                alert("Invalid Credentials");
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
})