let currentLogedInUserId_SellBuyer = localStorage.getItem("currentLogedInUserId_SellBuyer") || null;

let userOwnProducts = []

if(currentLogedInUserId_SellBuyer){
    showUserOwnProduct(currentLogedInUserId_SellBuyer)
}else{
    let ks_khaliDashboard = document.getElementById("ks_khaliDashboard");
    ks_khaliDashboard.style.display = "flex"
}


async function showUserOwnProduct(id){
    let res = await fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products`)
    let data = await res.json()
    console.log('data===>',data);
}