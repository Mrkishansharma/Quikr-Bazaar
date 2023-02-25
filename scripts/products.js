let main = document.getElementById("rt-container");
let checkBox = document.querySelectorAll("#rt-filter input")
let data = []






// fetching api
fetching()
async function fetching() {
    let resp = await fetch("https://63f71d1fe8a73b486af0e017.mockapi.io/products");
    resp = await resp.json()
    data = resp
    render_ran(resp)
    
}



// sorting low to high
function low_to_high_ran() {
    let temp_ran = [...data]
    let sort_atob_ran = temp_ran.sort(function (a, b) {
        return a.price - b.price
    })
    
    render_ran(sort_atob_ran)
}
// sorting high to low
function high_to_low_ran() {
    let temp_ran = [...data]
    let sort_atob_ran = temp_ran.sort(function (a, b) {
        return b.price - a.price
    })
    render_ran(sort_atob_ran)
}


// sorting show all data
function showAllProducts_ran(){
    render_ran(data)

}

// time part
function timeAgo_ran(data) {
    let d1 = new Date()

    let d2 = new Date(data)
    let one = 1000 * 60 * 60 * 24;
    let diff = d1.getTime() - d2.getTime();

    let diffday = Math.round(diff / one);
    return diffday
}

// insert data from api to dom
function render_ran(data) {
    let card = `
    ${data.map((item) => getcard_ran(item)).join("")}
    
    `;
    main.innerHTML = card
}



function getcard_ran(obj) {
    let { createdAt, id, title, condition,  image, price } = obj


    let dataadd =
        `<div id="rt-product" data-id="${id}" onclick="normal_ran(event,${id})">
            <img class="rt-img" src="${image}" alt="">
            <h3><i class="fa fa-inr fa-lg" aria-hidden="true"></i>${price}</h3>
            <p>${title.substring(0, 40)}</p>
           
            <div class="rt-cond_btn">
            <h5>${condition}</h5>
            <h6>${timeAgo_ran(createdAt)} day ago
            <button>View </button>
        </div>
        </div>
    `;
    return dataadd

}

// to productdetail page

function normal_ran(event,idd) {
    console.log("idd====>",idd)
    // console.log("id====>",event.target.dataset.id)
    console.log(event)
    let selectedProduct_ran  = data.filter((ele)=>{
        return idd==ele.id
    })
    console.log(selectedProduct_ran);
    
    localStorage.setItem("currentProductDetails_SellBuyer",JSON.stringify(selectedProduct_ran[0]))
    location.href = "productDetails.html"
}


// rest below all are filtering part

let filterdata_ran = (e) => {
    let arr = []
    checkBox.forEach((input) => {
        if (input.checked) {
            arr.push(input.name)
        }
    })
    let filterdata = data.filter((item) => {
        let flag = false;
        for (let a of arr) {
            if (a === item.category || a === item.condition) {
                flag = true;
            }
        }
        if (flag) {
            return true
        }
        return false
    })
    if(filterdata==""){
        render_ran(data)
    }else{ 
    render_ran(filterdata)
    }

}

checkBox.forEach((input) => {
    input.addEventListener("change", filterdata_ran)
})




