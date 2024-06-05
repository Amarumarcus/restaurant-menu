// import menu data
import {menuArray} from "/data.js"

// make a variable for order
let itemsToOrder = []

// add eventlistener for all buttons
document.addEventListener('click', function(e){
    if (e.target.id === 'order-button'){
        handleOrderBtnClicks()
    } else if (e.target.id === 'pay-btn'){
        handlePayBtnClicks()
    } else if (e.target.dataset.add){
        handleAddBtnClicks(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        handleRemoveBtnClicks(e.target.dataset.remove)
    } else if (e.target.dataset.close){
        handleCloseBtnClicks(e.target.dataset.close)
    }
})

// function to handle order button clicks, diclare pay form, make it visible and scrol to it
function handleOrderBtnClicks() {
    const payForm = document.getElementById('pay-form')
    payForm.style.display = "flex"
    payForm.scrollIntoView()
}

// function to handle pay button clicks
function handlePayBtnClicks() {
    const clientName = document.getElementById('name-input').value
    if (clientName) {
        const orderComplite = document.getElementById('order-complite')
        const messegeToClient = `
            <div class="order-confirm" id="order-confirm">
                <h2>Thanks, ${clientName}! Your order is on its way!</h2>
            </div>
            `
        itemsToOrder = []
        closePayForm()
        totalPrice()
        orderCheck()
        orderComplite.innerHTML = messegeToClient
        orderComplite.scrollIntoView()
    }

}

// function to close pay form
function closePayForm(){
    document.getElementById('pay-form').style.display = "none"
}

// function to calculate a total price
function totalPrice(){
    const totalPrice = itemsToOrder.reduce((first, next) => first + next.price,0)
    document.getElementById('total-price').innerHTML = totalPrice + '$'
    return totalPrice
}

// if total price > 0, checkout section visible
function orderCheck() {
    totalPrice() ? document.getElementById('checkout-section').style.display = "flex" :
        document.getElementById('checkout-section').style.display = "none"
}

// close pay form
function handleCloseBtnClicks(){
    closePayForm()
}

// function to add item to order
function handleAddBtnClicks(item){
    const targetItem = menuArray.filter( target =>
        target.id === Number(item)
    )[0]

    itemsToOrder.push(targetItem)

    document.getElementById('checkout-container').innerHTML = renderCheckout()
    totalPrice()
    orderCheck()
}

// function to make html for checkout
function renderCheckout(newArr = itemsToOrder){
    return newArr.map( targetItem => {
        const {
            name,
            id,
            price
        } = targetItem
        return `
        <div class="order-layout">
            <div class="order">
                <h3>${name}</h3>
                <p data-remove="${id}">remove</p>
            </div>
            <h3>${price}$</h3>
        </div>
    `
    }).join('')
}

// function to remove item to order
function handleRemoveBtnClicks(item){
    const itemsToRemove = itemsToOrder.find(target => 
        target.id === Number(item))
    
    if (itemsToRemove) {
        const index = itemsToOrder.indexOf(itemsToRemove)
        itemsToOrder.splice(index, 1);
    }

    render(itemsToOrder)
    totalPrice()
    orderCheck()
}

// function to make html for menu
function renderMenu() {
   return menuArray.map( item => {
        const {
            name,
            ingredients,
            id,
            price,
            emoji
        } = item
        return `
            <li>
                <div class="product-container">
                    <div class="img-container">
                        <img src="${emoji}" alt="food-picture">
                    </div>
                    <div class="description-container">
                        <h2>${name}</h2>
                        <p>${ingredients}</p>
                        <h3>$${price}</h3>
                    </div>
                    <div class="add-container"'>
                        <img src="image/add-btn.svg" alt="plus-circle" data-add='${id}'>
                    </div>
                </div>
            </li>
        `
    }).join('')
}

// render checkout
function render(newArr){
    document.getElementById('checkout-container').innerHTML = renderCheckout(newArr)
}

// render menu
document.getElementById('menu').innerHTML = renderMenu()
