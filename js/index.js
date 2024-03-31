"use strict";
const backet = document.querySelector(".backet");
const cartIcon = document.querySelector("#cart-icon");
const closeBacket = document.querySelector("#close-backet");
cartIcon.addEventListener("click", () => {
  backet.classList.add("_active");
});
closeBacket.addEventListener("click", () => {
  backet.classList.remove("_active");
});
function updateTotal() {
  const backetContainer = document.querySelectorAll(".backet__container");
  let total = 0;
  for (let i = 0; i < backetContainer.length; i++) {
    let element = backetContainer[i];
    let priceElement = element.querySelector(".overview__price");
    let quantityElement = element.querySelector(".overview__count");
    let price = priceElement.innerText.replace("$", "");
    let quantity = quantityElement.value;
    total += +price * +quantity;
  }
  let totalPrice = document.querySelector(".total__price");
  totalPrice.textContent = total.toFixed(2) + "$";
}
function removeCartItem(event) {
  event.target.parentElement.remove();
  updateTotal();
}
const quantityChanges = (event) => {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  } else {
    updateTotal();
  }
};
if (document.readyState !== "loading") {
  const removeBacket = document.querySelectorAll("#remove__backet");
  for (let i of removeBacket) {
    i.addEventListener("click", removeCartItem);
  }
  const quantityChange = document.querySelectorAll("#overview__count");
  for (let num of quantityChange) {
    num.addEventListener("change", quantityChanges);
  }
  const buttonAddtoBasket = document.querySelectorAll(".add-cart");
  for (let add of buttonAddtoBasket) {
    add.addEventListener("click", (event) => {
      const parentCart = event.target.parentElement;
      const titleProducts = parentCart.querySelector(".item-title").innerText;
      const priceProducts = parentCart.querySelector(".price-num").innerText;
      const mainImage = parentCart.querySelector(".item-image").src;
      addProductToBasket(titleProducts, priceProducts, mainImage);
      updateTotal();
    });
  }
  document
    .getElementsByClassName("button-buy")[0]
    .addEventListener("click", () => {
      alert("Your order is placed");
      const backedContainer = document.getElementsByClassName("define")[0];
      while (backedContainer.hasChildNodes()) {
        backedContainer.removeChild(backedContainer.firstChild);
      }
      updateTotal();
    });
}
function addProductToBasket(titleProducts, priceProducts, mainImage) {
  const cartItems = document.querySelectorAll(".backet__container");
  for (let item of cartItems) {
    const itemTitle = item.querySelector(".overview__title").innerText;
    if (titleProducts == itemTitle) {
      alert("You have already add this item?");
      const quantityInput = item.querySelector(".overview__count");
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updateTotal();
      return;
    }
  }
  var cartBox = document.createElement("div");
  cartBox.classList.add("backet__container");
  let cartBoxContent = `
						<img src=${mainImage} alt="" class="item-image-backet">
						<div class="backet__container-overview">
							<div class="overview__title">${titleProducts}</div>
							<p class="overview__price">${priceProducts}</p>
							<input type="number" value="1" class="overview__count">
						</div>
						<img id="remove__backet"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg==" />					
						`;
  cartBox.innerHTML = cartBoxContent;
  const cartItem =
    document.getElementsByClassName("define")[
      document.getElementsByClassName("define").length - 1
    ];
  cartItem.append(cartBox);
  cartBox
    .querySelector("#remove__backet")
    .addEventListener("click", removeCartItem);
  cartBox
    .querySelector(".overview__count")
    .addEventListener("change", quantityChanges);
}
