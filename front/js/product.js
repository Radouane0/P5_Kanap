const url =  window.location.search;
const urlSearchParams = new URLSearchParams(url)
const id = urlSearchParams.get("id")
console.log(id)

fetch("http://localhost:3000/api/products/"+ id)
    .then(res => res.json())
    .then(data => ShowProduct(data))

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
    PrixProduit.innerText = new Intl.NumberFormat("fr-FR").format(data.price);

    const DescriptionProduit = document.getElementById("description")
    DescriptionProduit.innerText = data.description

    const SelectProduit = document.getElementById("colors")
    for (Color of data.colors) {
        const BaliseColor = document.createElement("option")
        BaliseColor.value = Color
        BaliseColor.innerText = Color
        SelectProduit.appendChild(BaliseColor)
    }
}

const ButtonPanier = document.getElementById("addToCart")
ButtonPanier.addEventListener("click", () => {
    const Color = document.getElementById("colors").value
    const Quantity = document.getElementById("quantity").value
    if (Color == "" || Quantity <1 || Quantity >100) {
        if (Color == "") {
            window.alert("Vous devez renseigner une couleur !")
        }
        if (Quantity < 1 || Quantity > 100) {
            window.alert("Vous devez renseigner une quantité entre 1 et 100 !")
        }
    }
    else (AddCart(id, Color, Quantity))
   
})

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

function AddCart(id, Color, Quantity) {
    let Cart = GetCart()
    let CartLine = {
        Id: id,
        Color: Color,
        Quantity: parseInt(Quantity)
    }
    const indice = Cart.findIndex(kanap => (kanap.Id === id && kanap.Color === Color));
    if (indice == -1) {
        Cart.push(CartLine)
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
    saveCart(Cart)
}

