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
}

function RemoveFromCart(data) {
    let deleteItem = document.querySelectorAll(".deleteItem")

    for (let k = 0; k < deleteItem.length; k++) {
        deleteItem[k].addEventListener("click", (event) => {
            event.preventDefault()

            Cart = CartLine.filter( el => el.data !== data.id)

            localStorage.setItem("Cart", JSON.stringify(Cart))

            alert("Votre article a bien été supprimé.")
            window.location.href = "cart.html"
            console.log(RemoveFromCart)
        })
    }
}







