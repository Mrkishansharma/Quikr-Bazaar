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
        div.style.padding = "10px";

        const img = document.createElement("img");
        img.src = product.image;
        img.style.width = "50%";
        img.style.height = "auto";
        img.style.objectFit = "cover";


        const title = document.createElement("h3");
        title.textContent = product.title;
        title.style.marginTop = "10px";
        title.style.marginBottom = "0";
        title.style.fontSize = "14px";
        title.style.width = "auto";
        title.style.fontWeight = "600";
        

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View";
        viewBtn.style.display = "block";
        viewBtn.style.marginTop = "10px";
        

        const link = document.createElement("a");
        link.href = `product.html?id=${product.id}`;

        link.appendChild(img);
        div.appendChild(link);
        div.appendChild(title);
        div.appendChild(viewBtn);
        trendImages.appendChild(div);

        counter++;
      } else {
        return;
      }
    });
  })
  .catch((error) => console.error(error));


//fetch data from products api for mobiles

