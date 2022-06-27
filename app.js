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
        'cart'
    ],
    methods: {},
    template: `
    <div>
        <p>{{item.title}}</p>
        <img v-bind:src='item.image' style="height: 70px; width: auto;">
    </div>
    `
})