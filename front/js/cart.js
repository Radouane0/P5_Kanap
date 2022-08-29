ShowCart()

function GetCart() {
    let Cart = localStorage.getItem("Cart")
    if (Cart == null) {
        return []
    } else {
        return JSON.parse(Cart)
    }
}

async function ShowCart() {
    let Cart = GetCart()
    for (CartLine of Cart) {
        await fetch("http://localhost:3000/api/products/"+ CartLine.Id)
            .then(res => res.json())
            .then(data => ShowProductCart(data, CartLine.Color))
    }
}

function ShowProductCart(data, Couleur) {
    console.log(data)
    const SectionCart = document.getElementById("cart__items")
    const Article = document.createElement("article")
    Article.className = "cart__item"
    Article.dataset.id = data._id
    Article.dataset.color = Couleur
    SectionCart.appendChild(Article)
    
    const DivImg = document.createElement("div")
    DivImg.className = "cart__item__img"
    Article.appendChild(DivImg)
    const Image = document.createElement("img")
    Image.src = data.imageUrl
    Image.alt = data.altTxt
    DivImg.appendChild(Image)

    const DivContent = document.createElement("div")
    DivContent.className = "cart__item__content"
    Article.appendChild(DivContent)

    const DivDescription = document.createElement("div")
    DivDescription.className = "cart__item__content"
    DivDescription.innerText = data.description
    DivContent.appendChild(DivDescription)

    const ProductName = document.createElement("h2")
    ProductName.innerText = data.name
    DivDescription.appendChild(ProductName)

    const CouleurProduit = document.createElement("p")
    CouleurProduit.innerText = CartLine.Color
    DivDescription.appendChild(CouleurProduit)

    const PrixProduit = document.createElement("p")
    PrixProduit.innerText = data.price + "€"
    DivDescription.appendChild(PrixProduit) 
}






// <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>Nom du produit</h2>
//                     <p>Vert</p>
//                     <p>42,00 €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article> -->