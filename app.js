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
            for (item in this.cart) {
                total += this.cart[item].price;
            };
            return total
        },
        getTax: function () {
            console.log("Product Costs: " + this.getProductCosts());
            let tax = this.getProductCosts() * 0.08;
            tax = Math.floor(tax * 100);
            return tax / 100
        },
        getShipping: function () {
            let totalItems = 0;
            for (item in this.cart) {
                totalItems += 1;
            };
            let totalPrice = totalItems * 10;
            return totalPrice
        },
        getTotal: function () {
            let total = this.getProductCosts() + this.getTax() + this.getShipping();
            return Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(total)
        }
    },
    template: `
    <div>
        <h4>Products: {{Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(this.getProductCosts())}}</h4>
        <h4>Tax: {{Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(this.getTax())}}</h4>
        <h4>Shipping: {{Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(this.getShipping())}}  ($10.00 per item)</h4>
        <h3>Total: {{this.getTotal()}}</h3>
    </div>
    `
})