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
            getStoreData();
        }
    }
});
