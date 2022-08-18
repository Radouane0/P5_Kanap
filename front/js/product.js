const url =  window.location.search;
const urlSearchParams = new URLSearchParams(url)
const id = urlSearchParams.get("id")
console.log(id)

function ShowProduct(data) {
    for (Product of data) {
        console.log(Product)
        const ImageProduct = document.getElementsByClassName("item__img") 
        const Img = document.createElement("img")
        Img.src = Product.imageUrl
        Img.alt = Product.altTxt
        ImageProduct.appendChild(Img)
    }
}