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
    const Quantite = document.getElementById("quantity").value
    if (Color == "" || Quantite <1 || Quantite >100) {
        if (Color == "") {
            window.alert("Vous devez renseigner une couleur !")
        }
        if (Quantite < 1 || Quantite > 100) {
            window.alert("Vous devez renseigner une quantité entre 1 et 100 !")
        }
    }
    else (AddCart(id, Color, Quantite))
   
})

function AddCart(id, Color, Quantite) {
    console.log(id)
    console.log(Color)
    console.log(Quantite)


}