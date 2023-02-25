let currProduct_am = JSON.parse(localStorage.getItem("currentProductDetails_SellBuyer")) || {};
let currentLogedInUserId_SellBuyer = localStorage.getItem("currentLogedInUserId_SellBuyer") || null

console.log(currProduct_am);
let detailPage_img = document.getElementById("detailPage_img")
detailPage_img.src = currProduct_am.image

let detailpage_condition = document.getElementById("detailpage_condition")
detailpage_condition.innerText = currProduct_am.condition

let detailpage_title = document.getElementById("detailpage_title")
detailpage_title.innerText = currProduct_am.title

let detailpage_price = document.getElementById("detailpage_price")
detailpage_price.innerText = "₹. " +  currProduct_am.price


let seller_name = document.getElementById("seller_name")
let seller_email = document.getElementById("seller_email")
let seller_phone = document.getElementById("seller_phone")
if(currProduct_am.sellerId==0){
    seller_name.innerText = `Name:- SellBuyer Team`
    seller_email.innerText = `Email:- admin@sellbuyer.com`
    seller_phone.innerText = `Phone Number:- 777-4158-578`
}else{
    fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users/${currProduct_am.sellerId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        seller_name.innerText = `Name:- ${data.name}`
        seller_email.innerText = `Email:- ${data.email}`
        seller_phone.innerText = `Phone Number:- ${data.phoneNumber}`
    }).catch(err => {
        alert("Something went wrong", err)
    })
}


let buy_form = document.getElementById("buy--form")
buy_form.addEventListener("submit", (e)=>{
    e.preventDefault()
    console.log(currProduct_am.buyyerId)
    if(currentLogedInUserId_SellBuyer){
        let amm = currProduct_am.buyyerId.filter((ele)=>ele==currentLogedInUserId_SellBuyer)
        if(amm.length){
            alert("Already buyed this Product")
        }else{
            currProduct_am.buyyerId.push(currentLogedInUserId_SellBuyer)
            localStorage.setItem("currentProductDetails_SellBuyer",JSON.stringify(currProduct_am))
            fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products/${currProduct_am.id}`,{
                method: "PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(currProduct_am)
            }).then(res =>{
                return res.json()
            }).then(data =>{
                alert("Successfully order placed")
            }).catch(err=>{
                alert("Something went wrong")
            })
        }
    }else{
        alert("Please Login first")
        location.href = "login.html"
    }
})