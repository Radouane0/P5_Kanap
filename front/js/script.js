// Créer une requête pour récupérer les données de l'API
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => ShowProducts(data))

// Fonction qui permet d'insérer les différents produit dans le DOM
function ShowProducts(data) {
    for (Product of data) {   // Pour chaque produit dans l'API, créer une balise qui sera ajouté à l'HTML
        console.log(Product)
        const SectionProducts = document.getElementById("items")
        const BaliseA = document.createElement("a")
        BaliseA.href = `./product.html?id=${Product._id}`  // Affichage de l'id du produit sélectionné dans l'URL
        SectionProducts.appendChild(BaliseA)

        const Article = document.createElement("article")
        BaliseA.appendChild(Article)

        const Image = document.createElement("img")
        Image.src = Product.imageUrl
        Image.alt = Product.altTxt
        Article.appendChild(Image)

        const NomProduit = document.createElement("h3")
        NomProduit.className = "productName"
        NomProduit.innerText = Product.name
        Article.appendChild(NomProduit)

        const Description = document.createElement("p")
        Description.className = "productDescription"
        Description.innerText = Product.description
        Article.appendChild(Description)

    }
    
}







