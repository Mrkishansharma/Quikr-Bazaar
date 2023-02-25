//carousel images code for trending ads****////
//carousel images trending ads done//

//fetch data from products api for trending ads

const trendImages = document.querySelector(".trend_images");
 
fetch("https://63f71d1fe8a73b486af0e017.mockapi.io/products?category=Furniture")
  .then((response) => response.json())
  .then((data) => {
    let counter = 0;
    data.forEach((product) => {
      if (counter < 4) {
        const div = document.createElement("div");
        div.classList.add("product");
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.padding = "10px";
        div.style.width = "150px";


        const imgDiv = document.createElement("div");
        imgDiv.style.maxHeight = "100%";
        imgDiv.style.maxWidth = "100%";
        imgDiv.style.overflow = "hidden";
        

        const img = document.createElement("img");
        img.src = product.image;
        img.style.width = "120px";
        img.style.height = "120px";
        

        imgDiv.appendChild(img);
        div.appendChild(imgDiv);

        const titleDiv = document.createElement("div");
        titleDiv.style.paddingTop = "10px";
        titleDiv.style.marginBottom = "0";
        titleDiv.style.maxWidth = "150px";
        titleDiv.style.maxHeight = "100px";

        const title = document.createElement("h3");
        const words = product.title.split(" ");
        const truncatedTitle = words.slice(0, 4).join(" ");
        title.textContent = truncatedTitle;
        title.style.fontSize = "13px";
        title.style.fontWeight = "600";
        title.style.textAlign = "center";
        titleDiv.appendChild(title);
        div.appendChild(titleDiv);

        const viewBtnDiv = document.createElement("div");
        

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View";
        viewBtn.style.display = "block";

        viewBtn.addEventListener("click",()=>{
          // console.log(product.id);
          localStorage.setItem("currentProductDetails_SellBuyer",JSON.stringify(product))
          location.href = "productDetails.html"
        })

        viewBtnDiv.appendChild(viewBtn);
        div.appendChild(viewBtnDiv);

        trendImages.appendChild(div);

        counter++;
      } else {
        return;
      }
    });
  })
  .catch((error) => console.error(error));


  //---------------mobile ads----------------///


  const mobileImages = document.querySelector(".mobile_images");

  fetch(
    "https://63f71d1fe8a73b486af0e017.mockapi.io/products?category=mobile"
  )
    .then((response) => response.json())
    .then((data) => {
      let counter = 0;
      data.forEach((product) => {
        if (counter < 6) {
          const div = document.createElement("div");
          div.classList.add("product");
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.alignItems = "center";
          div.style.padding = "10px";
          div.style.width = "150px";
          div.style.gap = "10px";

          const imgDiv = document.createElement("div");
          imgDiv.style.maxHeight = "100%";
          imgDiv.style.maxWidth = "100%";
          imgDiv.style.overflow = "hidden";

          const img = document.createElement("img");
          img.src = product.image;
          img.style.width = "120px";
          img.style.height = "120px";

          imgDiv.appendChild(img);
          div.appendChild(imgDiv);

          const titleDiv = document.createElement("div");
          titleDiv.style.paddingTop = "10px";
          titleDiv.style.marginBottom = "0";
          titleDiv.style.maxWidth = "150px";
          titleDiv.style.maxHeight = "100px";

          const title = document.createElement("h3");
          const words = product.title.split(" ");
          const truncatedTitle = words.slice(0, 4).join(" ");
          title.textContent = truncatedTitle;
          title.style.fontSize = "13px";
          title.style.fontWeight = "600";
          title.style.textAlign = "center";
          titleDiv.appendChild(title);
          div.appendChild(titleDiv);

          const viewBtnDiv = document.createElement("div");

          const viewBtn = document.createElement("button");
          viewBtn.textContent = "View";
          viewBtn.style.display = "block";

          viewBtn.addEventListener("click",()=>{
            // console.log(product.id);
            localStorage.setItem("currentProductDetails_SellBuyer",JSON.stringify(product))
            location.href = "productDetails.html"
          })

          viewBtnDiv.appendChild(viewBtn);
          div.appendChild(viewBtnDiv);

          mobileImages.appendChild(div);

          counter++;
        } else {
          return;
        }
      });
    })
    .catch((error) => console.error(error));


 ///home & lifestyle----------///////////
 
 const homeImages = document.querySelector(".home_images");

 fetch("https://63f71d1fe8a73b486af0e017.mockapi.io/products?category=Furniture")
   .then((response) => response.json())
   .then((data) => {
     let counter = 0;
     data.forEach((product) => {
       if (counter < 6) {
         const div = document.createElement("div");
         div.classList.add("product");
         div.style.display = "flex";
         div.style.flexDirection = "column";
         div.style.alignItems = "center";
         div.style.padding = "10px";
         div.style.width = "150px";
         div.style.gap = "10px";

         const imgDiv = document.createElement("div");
         imgDiv.style.maxHeight = "100%";
         imgDiv.style.maxWidth = "100%";
         imgDiv.style.overflow = "hidden";

         const img = document.createElement("img");
         img.src = product.image;
         img.style.width = "120px";
         img.style.height = "120px";

         imgDiv.appendChild(img);
         div.appendChild(imgDiv);

         const titleDiv = document.createElement("div");
         titleDiv.style.paddingTop = "10px";
         titleDiv.style.marginBottom = "0";
         titleDiv.style.maxWidth = "150px";
         titleDiv.style.maxHeight = "100px";

         const title = document.createElement("h3");
         const words = product.title.split(" ");
         const truncatedTitle = words.slice(0, 4).join(" ");
         title.textContent = truncatedTitle;
         title.style.fontSize = "13px";
         title.style.fontWeight = "600";
         title.style.textAlign = "center";
         titleDiv.appendChild(title);
         div.appendChild(titleDiv);

         const viewBtnDiv = document.createElement("div");

         const viewBtn = document.createElement("button");
         viewBtn.textContent = "View";
         viewBtn.style.display = "block";

         viewBtn.addEventListener("click",()=>{
          console.log(product.id);
          localStorage.setItem("currentProductDetails_SellBuyer",JSON.stringify(product))
          location.href = "productDetails.html"
        })

         viewBtnDiv.appendChild(viewBtn);
         div.appendChild(viewBtnDiv);

         homeImages.appendChild(div);

         counter++;
       } else {
         return;
       }
     });
   })
   .catch((error) => console.error(error));


// electronics and appliances--------///

const electronicsImages = document.querySelector(".electronics_images");

fetch("https://63f71d1fe8a73b486af0e017.mockapi.io/products?category=TV")
  .then((response) => response.json())
  .then((data) => {
    let counter = 0;
    data.forEach((product) => {
      if (counter < 6) {
        const div = document.createElement("div");
        div.classList.add("product");
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.padding = "10px";
        div.style.width = "150px";
        div.style.gap = "10px";

        const imgDiv = document.createElement("div");
        imgDiv.style.maxHeight = "100%";
        imgDiv.style.maxWidth = "100%";
        imgDiv.style.overflow = "hidden";

        const img = document.createElement("img");
        img.src = product.image;
        img.style.width = "120px";
        img.style.height = "120px";

        imgDiv.appendChild(img);
        div.appendChild(imgDiv);

        const titleDiv = document.createElement("div");
        titleDiv.style.paddingTop = "10px";
        titleDiv.style.marginBottom = "0";
        titleDiv.style.maxWidth = "150px";
        titleDiv.style.maxHeight = "100px";

        const title = document.createElement("h3");
        const words = product.title.split(" ");
        const truncatedTitle = words.slice(0, 4).join(" ");
        title.textContent = truncatedTitle;
        title.style.fontSize = "13px";
        title.style.fontWeight = "600";
        title.style.textAlign = "center";
        titleDiv.appendChild(title);
        div.appendChild(titleDiv);

        const viewBtnDiv = document.createElement("div");

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View";
        viewBtn.style.display = "block";

        viewBtn.addEventListener("click",()=>{
          console.log(product.id);
          localStorage.setItem("currentProductDetails_SellBuyer",JSON.stringify(product))
          location.href = "productDetails.html"
        })

        viewBtnDiv.appendChild(viewBtn);
        div.appendChild(viewBtnDiv);

        electronicsImages.appendChild(div);

        counter++;
      } else {
        return;
      }
    });
  })
  .catch((error) => console.error(error));







  function goToProductPage(){
    location.href = "product.html"
  }