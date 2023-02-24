
let form = document.getElementById("aman_login")
let allUserInfo = []
fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users`)
    .then(res => res.json())
    .then(data => {
        allUserInfo = data
        console.log("data==>", data);
    })

form.addEventListener("submit", function LoginUser(e) {
    e.preventDefault();
    let am_isVerified = allUserInfo.filter((ele) => {
        return ele.email == form.AmanEmail.value
    })
    if (am_isVerified.length == 0) {
        alert("User Not Found.. Please Sign Up First")
    } else {
        if (am_isVerified[0].password == form.AmanPassword.value) {
            console.log("====>", am_isVerified[0].id);
            localStorage.setItem("currentLogedInUserId_SellBuyer", am_isVerified[0].id)
            alert("Successfully Loged in")
            location.href = "index.html"
        } else {
            alert("Wrong credential")
        }
    }

});


