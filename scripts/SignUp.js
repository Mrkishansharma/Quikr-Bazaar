let signupForm = document.querySelector("#aman_signup_form");
let allUserInfo = []
fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users`)
    .then(res => res.json())
    .then(data => {
        allUserInfo = data
        console.log("data==>", data);
    })
signupForm.addEventListener("submit", async function RegisterUser(e) {
    e.preventDefault();

    let aman_isVerify = allUserInfo.filter((ele) => {
        return ele.email == signupForm.Email.value
    })
    if (aman_isVerify.length == 0) {
        const obj = {
            name: signupForm.Name.value,
            email: signupForm.Email.value,
            password: signupForm.Password.value,
            phoneNumber: signupForm.phon.value,
            address: {
                fullAddress: signupForm.address.value,
                pinCode: signupForm.pinCode.value
            },
            "ownProducts": [],
            "orderProducts": [],
            "cartProducts": []

        }

        try {
            let register_request = await fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(obj)
            })
            let rs = await register_request.json()
            // console.log("success==>",rs);
            alert("Successfully created")
        } catch (error) {
            alert("Something went wrong", error.message);
        }
    } else {
        // console.log("already present");
        alert("This email is already exists.")
    }


})

