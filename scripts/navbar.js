



let currentLogedInUserId_SellBuyer1 = localStorage.getItem("currentLogedInUserId_SellBuyer") || null;

let userData_ks = {}

if(currentLogedInUserId_SellBuyer1){
  fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users/${currentLogedInUserId_SellBuyer1}`)
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    userData_ks = data
    showUserNameOnNavBar()
  })
}

let loginLogourButton = document.getElementById("loginLogourButton");
let loginUserName = document.getElementById("loginUserName");
let showDashboardBtn = document.getElementById("showDashboardBtn");

if(currentLogedInUserId_SellBuyer1){
  showUserNameOnNavBar()
  loginLogourButton.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>&nbsp;</i>Logout`;
  showDashboardBtn.innerText = "Seller Dashboard";
}else{
  loginLogourButton.innerHTML = `<i class="fa-regular fa-circle-user">&nbsp;</i>Login/Register`;
  showDashboardBtn.innerText = "Post Free Ad";
}
function showUserNameOnNavBar(){
  loginUserName.innerHTML = `<i class="fa-solid fa-user"></i>${userData_ks.name}`;
}


loginLogourButton.addEventListener("click",(e)=>{
  if(currentLogedInUserId_SellBuyer1){
    localStorage.removeItem("currentLogedInUserId_SellBuyer")
    // location.reload()
    location.href = "index.html"
    console.log("login hai");
  }else{
    console.log("login  nhi hai");
    location.href = "signin.html"
  }
})

showDashboardBtn.addEventListener("click",()=>{
  if(currentLogedInUserId_SellBuyer1){
    location.href = "../sellerDashboard/sellerDashboard.html"
  }else{
    alert("Please Login first!")
  }
})