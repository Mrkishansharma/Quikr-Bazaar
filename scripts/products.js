let main=document.getElementById("rt-container");
// let low_to_high=document.querySelector("rt-low_to_high")
// let high_to_low=document.querySelector("rt-high_to_low");
let data=[]



fetching()




async function fetching (){
    let resp=await fetch("https://63f71d1fe8a73b486af0e017.mockapi.io/products");
    resp=await resp.json()
    data=resp
    render(resp)
    console.log(resp)
}

// low_to_high.addEventListener("hover",
function low_to_high(){
    let sort_atob=data.sort(function(a,b){
        return a.price-b.price
    })
    render(sort_atob)    
}

function high_to_low(){
    let sort_atob=data.sort(function(a,b){
        return b.price-a.price
    })
    render(sort_atob)    
}

// function newpro(){
//    render(data)
// }
 
function render(data){
    let card=`
    ${data.map((item)=>getcard(item.createdAt,item.title,item.brand,item.category,item.condition,item.description,item.image,item.price,)).join("")}
    
    `;
    main.innerHTML=card
}

function timeAgo(data){
    let d1=new Date()
   
    let d2=new Date(data)
    let one=1000*60*60*24;
    let diff=d1.getTime()-d2.getTime();

    let diffday=Math.round(diff/one);
    return diffday
}

function getcard(day,title,brand,category,condition,desc,img,price){
    
  
  
let dataadd=
`<div id="rt-product">
    <img class="rt-img" src="${img}" alt="">
    <h3><i class="fa fa-inr fa-lg" aria-hidden="true"></i>${price}</h3>
    <p>${title.substring(0,40)}</p>
   
    <div class="rt-cond_btn">
     <h5>${condition}</h5>
     <h6>${timeAgo(day)} day ago
     <button>View </button>
   </div>
 </div>
    `;
     return dataadd
    //   // <p>${category}</p>  <h4>${brand}</h4>
}


