const url =  window.location.search;
const urlSearchParams = new URLSearchParams(url)
const id = urlSearchParams.get("id")
console.log(id)

const orderId = document.getElementById("orderId")
orderId.innerText = id

localStorage.removeItem("Cart")