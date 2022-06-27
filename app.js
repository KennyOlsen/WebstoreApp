const API_URL = "https://fakestoreapi.com";

var app = new Vue({
    el: '#app',
    data: {
        currentPage: 'welcome',
        storeList: []
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
        }
    }
});


Vue.component('product', {
    props: [
        'item'
    ],
    template: `
    <div>
        <p>{{item.title}}</p>
        <img v-bind:src='item.image' style="height: 100px; width: auto;">
    </div>
    `
});