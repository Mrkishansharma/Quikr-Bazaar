let main=document.getElementById("rt-container");



async function fetching (){
    let resp=await fetch("https://63f71d1fe8a73b486af0e017.mockapi.io/products");
    resp=await resp.json()
    render(resp)
    console.log(resp)
}
fetching()
 
function render(data){
    let card=`
    ${data.map((item)=>getcard(item.title,item.brand,item.category,item.condition,item.description,item.image,item.price,)).join("")}
    
    `;
    main.innerHTML=card
}

function getcard(title,brand,category,condition,desc,img,price){
    // `<div class="rt-img">${img}</div>`
let dataadd=
    `<div id="rt-product">
    <img class="rt-img" src="${img}" alt="">
    <h2><i class="fa-solid fa-indian-rupee-sign"></i>${price}</h2>
    <p>${title.substring(0,35)}</p>
    <h4>${brand}</h4>
    <div class="rt-cond_btn">
   <h5>${condition}</h5>

   <button>VIEW ALL</button>
   </div>
    </div>
    `;
     return dataadd
    //   // <p>${category}</p>
}

