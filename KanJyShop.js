let products = [];
const cart = {};

const updateCart = () => {
    let totalPrice = 0;
    document.querySelector('#cartSummary_items').replaceChildren();

        for (const key of Object.keys(cart)) {
            const item = products.find((product) => {
                return `${product.id}` === key;
            });

            const quantity = cart[key];
            const price = item.price;

            const itemRow = document.createElement('tr');

            const itemName = document.createElement('th');
            itemName.innerText = item.title;

            const itemQuantity = document.createElement('td');
            itemQuantity.innerText = quantity;

            const itemPrice = document.createElement('td');
            itemPrice.innerText = quantity * price;

            const itemPlusBtn = document.createElement('button');
            itemPlusBtn.className = 'plusBtn';
            itemPlusBtn.innerText = `+`;

            const itemMinusBtn = document.createElement('button');
            itemMinusBtn.className = 'minusBtn';
            itemMinusBtn.innerText = `-`;

            itemRow.append(itemName, itemQuantity, itemPrice, itemPlusBtn, itemMinusBtn);

            document.querySelector('#cartSummary_items').append(itemRow);

            // ปุ่ม +/- สามารถ เพิ่ม-ลด ได้
            itemPlusBtn.addEventListener('click', () => {
                cart[key]++;
                updateCart();
            })

            itemMinusBtn.addEventListener('click', () => {
                if (cart[key] > 1) {
                    cart[key]--;
                } else {
                    delete cart[key];
                }
                updateCart();
            });

            totalPrice = totalPrice + price * quantity;

            document.querySelector('#cartSummary_total').innerText = totalPrice;
        }
    }


const createCard = (product) => {

    const productCard = document.createElement('div');
    productCard.className = 'productCard';

    const productThumbnail = document.createElement('img');
    productThumbnail.className = 'productThumbnail';
    productThumbnail.src = product.thumbnail;

    const productBottomSheet = document.createElement('div');
    productBottomSheet.className = 'productBottomSheet';

    const productInfoContainer = document.createElement('div');
    productInfoContainer.className = 'productInfoContainer';

    const productName = document.createElement('strong');
    productName.className = 'productName';
    productName.innerText = product.title;

    const productPrice = document.createElement('div');
    productPrice.className = 'productPrice';
    productPrice.innerText = '$' + product.price;

    const quantityControl = document.createElement('div');
    quantityControl.className = 'quantityControl';

    const addtoCart = document.createElement('button');
    addtoCart.className = 'addtoCart';
    addtoCart.innerText = `+`;

    const quantityDisplay = document.createElement('span');
    quantityDisplay.className = 'quantityDisplay';

    const deletetoCart = document.createElement('button');
    deletetoCart.className = 'deletetoCart';
    deletetoCart.innerText = `-`;

    //add สินค้า เข้า viewCart 
    addtoCart.addEventListener('click', () => {
        if (cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] + 1;

        updateCart();
    });

    // แสดงผลบนหน้า website
    productInfoContainer.append(productName, productPrice);
    productBottomSheet.append(productInfoContainer, addtoCart);
    productCard.append(productThumbnail, productBottomSheet);

    // add to productList 
    document.querySelector('#productList').appendChild(productCard);
}
const hookviewCart = () => {
    const viewCartButton = document.querySelector('#viewCart');
    viewCartButton.addEventListener('click', () => {
        const cartSummary = document.querySelector('#cartSummary');
        const display = cartSummary.style.display;

        if (display === 'none') {
            cartSummary.style.display = 'block';
        } else {
            cartSummary.style.display = 'none';
        }
        // แสดง viewCart แบบเปิด-ปิด
    });
}
const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productResponse) => {
            products = productResponse.products;
            /*ชื่อคีย์ของ object คือ product */
            products.forEach(products => {
                createCard(products);
                //ส่ง product เข้า forEach 
            });
            console.log(products);
        });

    //ดึง APIs
}
fetchProduct();
hookviewCart();
