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
    totalQuantity()
    totalPrice()
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
    PrixProduit.innerText = new Intl.NumberFormat("fr-FR").format(data.price) + "€"
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
        totalQuantity()
        totalPrice()
    })

    Input.addEventListener("input", function(event) {
        UpdateProduct(data._id, Couleur, event.target.value)
        totalQuantity()
        totalPrice()
    })
}

function DeleteProduct(id, Couleur, Suppr) {
    const Panier = GetCart()
    for (const data of Panier) {
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

function UpdateProduct(id, Couleur, newQuantity) {
    const Panier = GetCart()
    const indice = Panier.findIndex(data => (data.Id === id && data.Color === Couleur))
    if (newQuantity < 1 || newQuantity > 100) {
        alert("Veuillez saisir une quantité comprise entre 1 et 100.")
    } else {
        Panier[indice].Quantity = parseInt(newQuantity)
        saveCart(Panier)
    }
}

function totalQuantity() {
    const Panier = GetCart()
    let Total = 0
    for (const data of Panier) {
        Total += data.Quantity

    }
    document.getElementById("totalQuantity").innerText = Total
}

async function totalPrice() {
    const Panier = GetCart()
    let Total = 0
    for (const data of Panier) {
         await fetch("http://localhost:3000/api/products/"+ data.Id)
            .then(res => res.json())
            .then(Product => {
                let TotalLigne = Product.price*data.Quantity
                Total += TotalLigne
            })
    }
    document.getElementById("totalPrice").innerText = new Intl.NumberFormat("fr-FR").format(Total)
}

function firstName() {
    const Prenom = document.getElementById("firstName").value
    const Error = document.getElementById("firstNameErrorMsg")
    const Regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/
    if (Prenom.match(Regex)) {
        Error.innerText = ""
        return true
    } else {
        Error.innerText = "Champ invalide."
        return false
    }
}
document.getElementById("firstName").addEventListener("input", () => {
    firstName();
  });

function LastName() {
    const Nom = document.getElementById("lastName").value
    const Error = document.getElementById("lastNameErrorMsg")
    const Regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/
    if (Nom.match(Regex)) {
        Error.innerText = ""
        return true
    } else {
        Error.innerText = "Champ invalide."
        return false
    }
}
document.getElementById("lastName").addEventListener("input", () => {
    LastName();
  });

function Address() {
    const Adresse = document.getElementById("address").value
    const Error = document.getElementById("addressErrorMsg")
    const Regex = /^[a-zA-Zà-żÀ-Ż-0-9+\s+-]+$/
    if (Adresse.match(Regex)) {
        Error.innerText = ""
        return true
    } else {
        Error.innerText = "Champ invalide."
        return false
    }
}
document.getElementById("address").addEventListener("input", () => {
    Address();
  });

function City() {
    const City = document.getElementById("city").value
    const Error = document.getElementById("cityErrorMsg")
    const Regex = /^[a-zA-Zà-żÀ-Ż\s+-]+$/
    if (City.match(Regex)) {
        Error.innerText = ""
        return true
    } else {
        Error.innerText = "Champ invalide."
        return false
    }
}
document.getElementById("city").addEventListener("input", () => {
    City();
  });

function Email() {
    const Email = document.getElementById("email").value
    const Error = document.getElementById("emailErrorMsg")
    const Regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (Email.match(Regex)) {
        Error.innerText = ""
        return true
    } else {
        Error.innerText = "Champ invalide."
        return false
    }
}
document.getElementById("email").addEventListener("input", () => {
    Email();
  });