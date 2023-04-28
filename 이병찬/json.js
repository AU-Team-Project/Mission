// 장바구니 아이템 정보를 담은 배열
let cartItems = [];

// 장바구니 UI 업데이트 함수
function updateCartUI() {
    const cartItemsEl = document.querySelector("#cart-items");
    cartItemsEl.innerHTML = "";

    cartItems.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - 가격: ${item.price}, 수량: ${item.qty}
        <button class="increase-btn">+</button>
        <button class="decrease-btn">-</button>
        <button class="remove-btn">삭제</button>`;
        cartItemsEl.appendChild(li);

        // + 버튼 클릭 시 수량 증가 처리
        const increaseBtn = li.querySelector(".increase-btn");
        increaseBtn.addEventListener("click", () => {
            item.qty++;
            item.price += item.unitPrice;
            updateCartUI();
        });

        // - 버튼 클릭 시 수량 감소 처리
        const decreaseBtn = li.querySelector(".decrease-btn");
        decreaseBtn.addEventListener("click", () => {
            if (item.qty > 1) {
                item.qty--;
                item.price -= item.unitPrice;
                updateCartUI();
            }
        });

        // 삭제 버튼 클릭 시 아이템 삭제 처리
        const removeBtn = li.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            const itemIndex = cartItems.indexOf(item);
            cartItems.splice(itemIndex, 1);
            updateCartUI();
        });
    });
}

// 장바구니 초기화 함수
function clearCart() {
    cartItems = [];
    updateCartUI();
}

// 상품 추가 버튼 클릭 시 처리
const addItemBtn = document.querySelector("#add-item-btn");
addItemBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * products.length);
    const selectedProduct = products[randomIndex];
    const cartItem = {
        name: selectedProduct.name,
        unitPrice: selectedProduct.price,
        price: selectedProduct.price,
        qty: 1,
    };
    cartItems.push(cartItem);
    updateCartUI();
});

// 장바구니 비우기 버튼 클릭 시 처리
const clearCartBtn = document.querySelector("#clear-cart-btn");
clearCartBtn.addEventListener("click", () => {
    clearCart();
});

// 초기화
updateCartUI();
