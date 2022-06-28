const API_URL = "https://fakestoreapi.com";

var app = new Vue({
    el: '#app',
    data: {
        currentPage: 'welcome',
        storeList: [],
        shoppingCart: []
    },
    methods: {
        getStoreData: async function () {
            let response = await fetch(API_URL + '/products');
            let answer = await response.json();
            this.storeList = answer;
        },
        toStorePage: function () {
            this.currentPage = 'store';
            this.getStoreData();
        },
        toCheckoutPage: function () {
            this.currentPage = 'checkout';
        }
    }
});


Vue.component('product', {
    props: [
        'item',
        'cart'
    ],
    methods: {
        addToCart: function () {
            this.cart.push(this.item);
        }
    },
    template: `
    <div>
        <p>{{item.title}}</p>
        <img v-bind:src='item.image' style="height: 70px; width: auto;">

        
        <button v-on:click="addToCart()" style="margin-top: 5px;">Add to cart</button>
    </div>
    `
});


Vue.component('cart-item', {
    props: [
        'item',
        'cart',
        'index'
    ],
    methods: {
        removeFromCart: function () {
            this.cart.splice(this.index, 1);
        },
        formatCost: function (price) {
            price = price * 100;
            price = price / 100;
            console.log(price);
            console.log("Editied: " + price)
            return price
        }
    },
    template: `
    <div class="checkoutItemDiv">
        <div class="test">
            <h5>{{Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(item.price)}}</h5>
            <p>{{item.title}}</p>
            <img v-bind:src='item.image' style="height: 40px; width: auto;">
        </div>
        <button v-on:click="removeFromCart()">Remove</button>
    </div>
    `
});


Vue.component('total-cost', {
    data: function () {
        return {
        }
    },
    props: [
        'cart'
    ],
    methods: {
        getProductCosts: function () {
            let total = 0;
            console.log("Cart Recieved: " + this.cart);
            for (item in this.cart) {
                total += item.price;
            };
            return Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(total)
        },
        getTax: function () {
            let tax = this.getProductCosts() * 0.08;
            return tax
        },
        getShipping: function () {
            let totalItems = 0;
            for (item in this.cart) {
                totalItems += 1;
            };
            let totalPrice = totalItems * 10;
            return Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(totalPrice)
        },
        getTotal: function () {
            let total = this.getProductCosts() + this.getTax() + this.getShipping();
            return Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(total)
        }
    },
    template: `
    <div>
        <h4>Products: {{this.getProductCosts()}}</h4>
        <h4>Tax: {{this.getTax()}}</h4>
        <h4>Shipping: {{this.getShipping()}}  ($10.00 per item)</h4>
        <h3>Total: {{this.getTotal()}}</h3>
    </div>
    `
})