let currentLogedInUserId_SellBuyer = localStorage.getItem("currentLogedInUserId_SellBuyer") || null;

let userOwnProducts = []
let currLogedInuser = {}

if(currentLogedInUserId_SellBuyer){
    fetchUserOwnProducts(currentLogedInUserId_SellBuyer)
}else{
    let ks_khaliDashboard = document.getElementById("ks_khaliDashboard");
    ks_khaliDashboard.style.display = "flex"
}



async function fetchUserOwnProducts(id){
    let res = await fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products`)
    let data = await res.json()
    // console.log('data===>',data);
    userOwnProducts = data.filter((ele) => (ele.sellerId==id));
    console.log('user===>',userOwnProducts);

    displayUserOwnProducts(userOwnProducts);
}

let ks_tbody_ownProducts = document.getElementById("ks_tbody_ownProducts")
function displayUserOwnProducts(data){
    ks_tbody_ownProducts.innerHTML = data.map(ele=> getTBodyData(ele) ).join()
}

function getTBodyData(ele){
    let {id,buyyerId,title,category,condition,price,image,description,brand} = ele
    return `
            <tr>
                <td>
                    <img src="${image}" alt=""/>
                </td>
                <td> ${title} </td>
                <td> ${category} </td>
                <td> ${condition} </td>
                <td> <i class="fa-solid fa-indian-rupee-sign"></i> ${price} </td>
                <td> ${brand} </td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewDescProductModal" data-bs-whatever="@getbootstrap" data-id="${id}" id="ks_viewDescriptionInfo" onclick="hadnleViewDescForm(event)"> View </button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProductModal" data-bs-whatever="@getbootstrap" data-id="${id}" id="ks_editProductBtn" onclick="hadnleEditForm(event)"> Edit </button>
                </td>
                <td>
                    <button id="ks_deleteProductbtn" data-id="${id}" onclick="handleDeleteProduct(event)">Delete</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewBuyerProductModal" data-bs-whatever="@getbootstrap" data-id="${id}" id="ks_viewBuyerInfo" onclick="hadnleViewBuyerForm(event)"> Buyer Info </button>
                </td>
            </tr>
    `
}



//  ****************************** EDit product
async function hadnleEditForm(event){
    let id = event.target.dataset.id
    let editProductForm = document.getElementById("editProduct-form");
    try {
        let res = await fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products/${id}`)
        let data = await res.json()
        // console.log(data);
        editProductForm.ks_title_edit.value = data.title
        editProductForm.ks_category_edit.value = data.category
        editProductForm.ks_condition_edit.value = data.condition
        editProductForm.ks_price_edit.value = data.price
        editProductForm.ks_brand_edit.value = data.brand
        editProductForm.ks_image_edit.value = data.image
        editProductForm.ks_desc_edit.value = data.description
    } catch (error) {
        console.log("error===>",error);
    }

    editProductForm.addEventListener("submit", (event)=> {
        event.preventDefault();
        let obj = {
            title: editProductForm.ks_title_edit.value,
            category: editProductForm.ks_category_edit.value,
            condition: editProductForm.ks_condition_edit.value,
            price: editProductForm.ks_price_edit.value,
            brand: editProductForm.ks_brand_edit.value,
            image: editProductForm.ks_image_edit.value,
            description: editProductForm.ks_desc_edit.value
        }
        // console.log(obj);
        PutProductIntoAPI(id,obj)
    })
}


async function PutProductIntoAPI(id,obj){
    try {
        let res = await fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        // console.log("res====>",res);
        let data = await res.json()
        // console.log("data====>",data);
        alert("Successfully updated")
        location.reload()

    } catch (error) {
        console.log("error===>",error)
    }
}


// *********************** view description and image
function hadnleViewDescForm(event){
    let kishan = userOwnProducts.filter((ele)=>ele.id==event.target.dataset.id)
    console.log(kishan[0]);
    let {title,image,description} = kishan[0]
    document.getElementById("ks_title_view").innerText = title
    document.getElementById("ks_image_view").innerHTML = `<img src="${image}" alt="image" />`
    document.getElementById("ks_description_view").innerHTML = `<p>
    <span>Description:- </span> ${description}
    <p>`
}


// ************************* View buyer
let ks_buyer_container = document.getElementById("ks_buyer_container")
let ks_title_buyer = document.getElementById("ks_title_buyer")
var ks_allBuyerUserInfo = []
function hadnleViewBuyerForm(event){
    let id = event.target.dataset.id
    let kishan = userOwnProducts.filter((ele)=>ele.id==id)
    let {title,buyyerId} = kishan[0]

    ks_title_buyer.innerText = title

    ks_allBuyerUserInfo = []
    for(let i=0; i<buyyerId.length; i++){
        fetchBuyerDetails(buyyerId[i])
    }
    if(!buyyerId.length){
        console.log("don't have any buyer");
        ks_buyer_container.innerHTML = `<h3>Not have any buyer</h3>`
    }
}

async function fetchBuyerDetails(id){
    try {
        let res = await fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users/${id}`)
        if(res.ok){
            let data = await res.json()
            ks_allBuyerUserInfo.push(data)
        }else{
            ks_allBuyerUserInfo.push(null)
        }
    } catch (error) {
        console.log("Error",error);
        ks_allBuyerUserInfo.push(null)
    }
    displayBuyerUser(ks_allBuyerUserInfo);
}

function displayBuyerUser(data){
    ks_buyer_container.innerHTML = data.map((ele)=>{
        if(ele==null) return ""
        return `
            <div class="ks_buyer_box">
                <div>
                    <img src="${ele.avatar}" alt="">
                    <h6>User ID:- ${ele.id}</h6>
                </div>
                <div>
                    <p>Name:- ${ele.name}</p>
                    <p>Email:- ${ele.email}</p>
                    <p>Number:- ${ele.phoneNumber}</p>
                    <p>Address:- ${ele.address.fullAddress} (${ele.address.pinCode})</p>
                </div>
            </div>
        `
    }).join("")
}



// ******************* ADD PRODUCT

let addProduct_form = document.getElementById("addProduct-form");
addProduct_form.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(!currentLogedInUserId_SellBuyer){
        alert("please login first")
    }else{
        let obj  = {
            sellerId: currentLogedInUserId_SellBuyer,
            buyyerId: [],
            title: addProduct_form.ks_title_add.value,
            category: addProduct_form.ks_category_add.value,
            condition: addProduct_form.ks_condition_add.value,
            price: addProduct_form.ks_price_add.value,
            image: addProduct_form.ks_image_add.value,
            description: addProduct_form.ks_desc_add.value,
            brand: addProduct_form.ks_brand_add.value
        }
        console.log(obj);
        fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(obj)
        }).then(res=> res.json())
        .then(data=>{
            alert("Successfully Created")
            location.reload()
        })
        .catch(err=>alert("Something Went Wroung",err.message))
    }
})



// ************************ Delete product
function handleDeleteProduct(event){
    console.log(event.target.dataset.id);
    fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/products/${event.target.dataset.id}`,{
        method:"DELETE"
    }).then(res=>res.json()).then(data=>{
        alert("Successfully Deleted")
        location.reload()
    }).catch(err=>{
        alert("Something Went Wroung",err.message)
    })
}




// ***************************** EDIT Profile


let ks_editUserProfile = document.getElementById("ks_editUserProfile")
let editProfile_form = document.getElementById("editProfile-form")

ks_editUserProfile.addEventListener("click",()=>{
    if(currentLogedInUserId_SellBuyer){
        fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users/${currentLogedInUserId_SellBuyer}`)
        .then(res => res.json())
        .then(data=>{
            currLogedInuser = data
            fillFormEditProfile()
        })
        .catch(err=>{
            console.log("Something Went Wrong", err.message);
        })
    }else{
        alert("Something Went Wrong... try after some time")
    }
})

function fillFormEditProfile(){
    let {name,email,password,phoneNumber,address,id,avatar} = currLogedInuser
    editProfile_form.ks_nameProfile.value = name
    editProfile_form.ks_avatarProfile.value = avatar
    editProfile_form.ks_emailProfile.value = email
    editProfile_form.ks_passwordProfile.value = password
    editProfile_form.ks_numberProfile.value = phoneNumber
    editProfile_form.ks_addressProfile.value = address.fullAddress
    editProfile_form.ks_pincodeProfile.value = address.pinCode
    
}

editProfile_form.addEventListener("submit",(event)=>{
    event.preventDefault()
    currLogedInuser.name = editProfile_form.ks_nameProfile.value
    currLogedInuser.avatar = editProfile_form.ks_avatarProfile.value
    currLogedInuser.email = editProfile_form.ks_emailProfile.value
    currLogedInuser.password = editProfile_form.ks_passwordProfile.value
    currLogedInuser.phoneNumber = editProfile_form.ks_numberProfile.value
    currLogedInuser.address.fullAddress = editProfile_form.ks_addressProfile.value
    currLogedInuser.address.pinCode = editProfile_form.ks_pincodeProfile.value

    console.log(currLogedInuser);
    fetch(`https://63f71d1fe8a73b486af0e017.mockapi.io/users/${currLogedInuser.id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(currLogedInuser)
    }).then(res => res.json())
    .then(data=>{
        alert("Successfully updated")
        location.reload()
    }).catch(err=>{
        alert("Something went wrong", err)
    })

    
})



// ********************** EXPORT XLXS

function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('tbl_exporttable_to_xls');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}





let ks_priceSort = document.getElementById("ks_priceSort")
ks_priceSort.addEventListener("change",()=>{
    let sortedArray = userOwnProducts
    if(ks_priceSort.value=="HTL"){
        sortedArray = userOwnProducts.sort((a,b)=>b.price-a.price)
    }else if(ks_priceSort.value=="LTH"){
        sortedArray = userOwnProducts.sort((a,b)=>a.price-b.price)
    }
    displayUserOwnProducts(sortedArray)
})
let ks_searchFilter = document.getElementById("ks_searchFilter")
ks_searchFilter.addEventListener("input",()=>{
    if(ks_searchFilter.value){
        let filteredArray = userOwnProducts.filter((ele)=>{
            return ele.title.toLowerCase().includes(ks_searchFilter.value.toLowerCase())
        })
        displayUserOwnProducts(filteredArray)
    }else{
        displayUserOwnProducts(userOwnProducts)
    }
})




