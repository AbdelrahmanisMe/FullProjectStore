let items= document.querySelector(".grid");
let countt= document.querySelector(".cart2-count");
let  basket= JSON.parse(localStorage.getItem("cart"));
function displayorder(){
    basket.forEach( (product ) => {
        items.innerHTML+=
                `<div class="item">
                    <div class="row">
                        <div class="imge">
                            <img src="${product.image}" alt="">
                        </div>
                        <div>
                            <p style="font-size: 1.2rem;font-weight: 900; width:14rem">${product.title}</p>
                            <p  style="font-size: 1 rem;margin-top:-1rem; color:rgb(175, 171, 171);">${product.category}</p>
                        </div>
                    </div>
                    <div>$${product.price}</div>
                    <div>${product.quantity}</div>
                    <div class="del"  onclick="removeitem(${product.id})" >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
                            <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path></g></g>
                            </svg>
                    </div>
                </div>
                        `;
    });
}
displayorder();
//--------------------------------------------
let delet = document.querySelector(".del");
let  removeitem = (id)=>{
    console.log(basket[id]);
}