function GetIdOrder() {
    // Faire le lien entre la panier la page confirmation grâce à l'id de commande
    const url =  window.location.search;
    const urlSearchParams = new URLSearchParams(url)
    const id = urlSearchParams.get("id")
    return id
}

// Ajout du n° de commande sur la page confirmation
const orderId = document.getElementById("orderId")
orderId.innerText = GetIdOrder()

// Va supprimer les produits du panier
localStorage.removeItem("Cart")