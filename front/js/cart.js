ShowCart()

function saveCart(Cart) {
    localStorage.setItem("Cart", JSON.stringify(Cart))
}

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
    Cart.sort((a, b) => {
        if (a.Id < b.Id)
            return -1;
        if (a.Id > b.Id)
            return 1;
        return 0;
    })
    for (CartLine of Cart) {
        await fetch("http://localhost:3000/api/products/"+ CartLine.Id)
            .then(res => res.json())
            .then(data => ShowProductCart(data, CartLine.Color, CartLine.Quantity))
    }
}

function ShowProductCart(data, Couleur, Quantity) {
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
    DivDescription.className = "cart__item__content__description"
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

    const DivSettings = document.createElement("div")
    DivSettings.className = "cart__item_content__settings"
    DivContent.appendChild(DivSettings)

    const DivQuantity = document.createElement("div")
    DivQuantity.className = "cart__item__content__settings__quantity"
    DivSettings.appendChild(DivQuantity)

    const Qte = document.createElement("p")
    Qte.innerText = "Qté : "
    DivQuantity.appendChild(Qte)

    const Input = document.createElement("input")
    Input.type = "number"
    Input.className = "itemQuantity"
    Input.name = "itemQuantity"
    Input.min = "1"
    Input.max = "100"
    Input.value = Quantity
    DivQuantity.appendChild(Input)

    const DivDelete = document.createElement("div")
    DivDelete.className = "cart__item__content__settings__delete"
    DivSettings.appendChild(DivDelete)

    const Suppr = document.createElement("p")
    Suppr.className = "deleteItem"
    Suppr.innerText = "Supprimer"
    DivDelete.appendChild(Suppr)

    Suppr.addEventListener("click", function(event) {
        DeleteProduct(data._id, Couleur, Suppr)
    })

    Input.addEventListener("input", function(event) {
        UpdateProduct(data._id, Couleur)
    })
}

function DeleteProduct(id, Couleur, Suppr) {
    const Panier = GetCart()
    for ( const data of Panier) {
        if (id == data.Id && Couleur == data.Color) {
            const RemoveArticle = Suppr.closest("article")
            console.log(RemoveArticle)
            RemoveArticle.parentElement.removeChild(RemoveArticle)
            const indice = Panier.findIndex(data => (data.Id === id && data.Color === Couleur));
            Panier.splice(indice, 1)
            
        }
    }
    saveCart(Panier)
}

function UpdateProduct(id, Couleur) {
    
}

