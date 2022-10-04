fetchProduct()

function GetIdProduct() {
    // Faire le lien entre un produit de la page d'accueil et la page Produit
    const url =  window.location.search;
    const urlSearchParams = new URLSearchParams(url)
    const id = urlSearchParams.get("id")
    return id
}

function fetchProduct() {
    const id = GetIdProduct()
    // Afficher le produit selectionné grâce à son id
    fetch("http://localhost:3000/api/products/"+ id)
        .then(res => res.json())
        .then(data => ShowProduct(data))
}

// Ajout des informations du produit affiché (image, nom, description, prix...) dans le DOM
function ShowProduct(data) {
    console.log(data)
    const DivImg = document.querySelector(".item__img")
    const BaliseImg = document.createElement("img")
    BaliseImg.src = data.imageUrl
    BaliseImg.alt = data.altTxt
    DivImg.appendChild(BaliseImg)

    const NomProduit = document.getElementById("title")
    NomProduit.innerText = data.name

    const PrixProduit = document.getElementById("price")
    PrixProduit.innerText = new Intl.NumberFormat("fr-FR").format(data.price);  // Formatage du prix pour l'afficher en euros

    const DescriptionProduit = document.getElementById("description")
    DescriptionProduit.innerText = data.description

    const SelectProduit = document.getElementById("colors")
    for (Color of data.colors) {    // Affichage de toutes les couleurs disponibles pour chaque produits
        const BaliseColor = document.createElement("option")
        BaliseColor.value = Color
        BaliseColor.innerText = Color
        SelectProduit.appendChild(BaliseColor)
    }
}

// Ajout d'un bouton qui va permettre d'ajouter un produit au panier
const ButtonPanier = document.getElementById("addToCart")
ButtonPanier.addEventListener("click", () => {    // Création d'un évenement déclenché au clic
    const Color = document.getElementById("colors").value
    const Quantity = document.getElementById("quantity").value
    if (Color == "" || Quantity <1 || Quantity >100) {    // Condition qui va vérifier si une couleur et une quantité comprise entre 1 et 100 ont été renseignés
        if (Color == "") {
            window.alert("Vous devez renseigner une couleur !")
        }
        if (Quantity < 1 || Quantity > 100) {
            window.alert("Vous devez renseigner une quantité entre 1 et 100 !")
        }
    }
    else (AddCart(GetIdProduct(), Color, Quantity))    // Ajoute l'id, la couleur et la quantité d'un produit dans le panier
   
})

// Sauvegarde du panier dans le localStorage
function saveCart(Cart) {
    localStorage.setItem("Cart", JSON.stringify(Cart))
}

// Fonction pour faire appel au panier
function GetCart() {
    let Cart = localStorage.getItem("Cart")
    if (Cart == null) {
        return []   // Retourne un tableau vide
    } else {
        return JSON.parse(Cart)  // Retourne les éléments du panier convertis en objet dans un tableau
    }
}

// Ajout au panier de l'id, la couleur et la quantité du produit sélectionné
function AddCart(id, Color, Quantity) {
    let Cart = GetCart()
    let CartLine = {   // Ajout des propriété du tableau crée dans le panier
        Id: id,
        Color: Color,
        Quantity: parseInt(Quantity)
    }
    const indice = Cart.findIndex(kanap => (kanap.Id === id && kanap.Color === Color));
    if (indice == -1) {
        Cart.push(CartLine)    // Ajout du panier dans le tableau
        window.alert("Le produit a bien été ajouter au panier")
    } else {
        const Canape = Cart.find(kanap => (kanap.Id === id && kanap.Color === Color));
        const Total = Canape.Quantity + parseInt(Quantity)
        if (Total > 100) {
            window.alert("Vous ne pouvez pas dépasser 100 !")
        } else {
            Canape.Quantity = Total
            window.alert("Le produit a bien été ajouter au panier")
        }
    }
    saveCart(Cart)  // Sauvegarde du panier
}

