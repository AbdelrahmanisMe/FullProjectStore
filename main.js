let products;
let card=document.getElementById("cards");
//-------------
let spinner=document.getElementById("spinner");
const getproducts=async ()=>{
  try {
    spinner.style.display="inline-block";
    const response=await fetch("https://Fakestoreapi.com/products");
    let data=await response.json();
    products = data;
    setTimeout(() => {
        spinner.style.display="none";
        filterandsort();
    }, 1000);   
  } catch (error) {  
    spinner.style.display="none";
    card.innerHTML=`<h1  style="">404 Not Found</h1>`;
  }
}
getproducts();
//-----------------------------------
let welcome =document.getElementById("welcomeMessage");
let close_btn=document.getElementById("closeMessage");
let hi=0;
// if(hi===1){
//     window.removeEventListener("load",timeout);
// }else{
//     const timeout=()=>
//           setTimeout(() => {
//             welcome.style="display:block;opacity:1;";
//             localStorage.setItem("message",1);
//             hi=localStorage.getItem("message");
//           }, 1000);
//     window.addEventListener("load",timeout);
// }



close_btn.addEventListener("click",()=>{  
  welcome.style="display:none;";
});
//----------light to dark toggle------------------------
let moon=document.getElementById("ToggletoDark");
let body=document.body;

moon.addEventListener("click",()=>{
  if(body.classList.contains("light")){
    body.classList.replace("light","dark");
    localStorage.setItem("theme","dark");
  }else{
    body.classList.replace("dark","light");
    localStorage.setItem("theme","light");
  }
});
//---------------savecolormood in local storage- cookies-----------
    const savetheme=localStorage.getItem("theme");
    if(savetheme=="dark"){
        body.classList.replace("light","dark");
    }else if(savetheme=="light"){
        body.classList.replace("dark","light");
    }
//--------------------------------------------------------
// let card=document.getElementById("cards");
function getdatadisplay(listofproducts){
  card.innerHTML=null;
  if(listofproducts.length==0){
      card.innerHTML=`<p style="font-size=2rem;font-weight:900;">Product Not Found</p>`;
      
    }else{
      listofproducts.forEach((product)=>{
              card.innerHTML+= 
              `<div class="productcard">
                    <div class="img">
                          <img class="img" src=${product.image} alt="">
                      </div>
                      <div  class="descrip">
                          <div class="col">
                              <category style="opacity:.7;">${product.category}</category>
                              <span class="title">${product.title}</span>
                              <description class="description" style="color: gray;">${product.description}</description>
                          </div>
                              <rating class="rate">
                                  <div class="stars">
                                      ${starRate(product.rating.rate)}
                                  </div>
                                  <div class="count-rate" style="font-size:1rem;">(${product.rating.count})</div>
                              </rating>
                              <price class="price" style="font-size: 1.4rem; font-weight:600;">$${product.price}</price>
                              <div class="row">
                                  <button onclick="addcart(${product.id})" class="addto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"   
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            >
                                            <path
                                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                            />
                                        </svg>
                                        Add to card
                                  </button>
                                    <button class="heart">
                                      <i class="far fa-heart"></i>
                                    </button>
                              </div>
                            </div>
                </div>`;
                });
      }
    

} 
// getdatadisplay(products);
//----------------------------------------------
function starRate(rate){
        let stars="";
        let fullstar,halfstar; 
        fullstar=Math.floor(rate);
        halfstar=rate %1 !=0;
        for(let i=0;i<fullstar;i++){
          stars +=`<i class="star fa-solid fa-star"></i>`;
        }
        if(halfstar){
          stars+= `<i class="fas fa-star-half-alt"></i>`
        }
        return stars;
}
//----------------------------------------------
let category=document.getElementById("categories");
let  filterprice=document.getElementById("filterby");
let searchbox=document.getElementById("search");
const saveCatego=localStorage.getItem("savecategory");

if(saveCatego!=undefined){
    category.value=saveCatego;
  }else{
    category.value="all";
  }
setTimeout(() => {
  localStorage.removeItem("savecategory");
},60000);
// filterandsort();
function  filterandsort(){
  // let fiterproducts;
  // let searchvalue=searchbox.value.toLowerCase().trim();
  // fiterproducts=products.filter((product)=>{
  //   product.title.toLowerCase().includes(searchvalue);
  // })


  const selectedcategory=category.value;
  localStorage.setItem("savecategory",selectedcategory);
  if(selectedcategory!="all"){
    fiterproducts=products.filter((product)=>product.category===selectedcategory);
  }else if(selectedcategory=="all"){
    fiterproducts=products;
  }



  let sortprice = filterprice.value;
  if(sortprice==="price-asc"){
    fiterproducts=products.sort((a,b)=>{a.price-b.price});
  }else if(sortprice=="rice-desc"){
    fiterproducts=products.sort((a,b)=>{a.price-b.price});
  }else if(sortprice=="rating-desc"){
    fiterproducts=products.sort((a,b)=>{a.rating.rate-b.rating.rate});
  }

  getdatadisplay(fiterproducts);
}
searchbox.addEventListener("input",filterandsort);
category.addEventListener("change",filterandsort);
filterprice.addEventListener("change",filterandsort);


//----------------add to cartbasket---------------------
function addcart(x){
  console.log(x);
}