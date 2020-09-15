// function AJAX request
function readFile(file, done) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    var value;
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                value = JSON.parse(allText);
                done(value);
            }
        }
    }
    rawFile.send(null);
}


//  function to create articles from .json + DOM
function createCard(cards){
    cards.forEach(card => {
    
    var carte = document.createElement('div');
    carte.classList.add('card');
    var img = document.createElement('img');
    img.setAttribute('src', card.img);
    img.classList.add('card-img-top');
    carte.append(img);
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.setAttribute('data-id', card.id);
    cardBody.setAttribute('data-name', card.title);
    cardBody.setAttribute('data-price', card.prix);
    carte.append(cardBody);
    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = card.title;
    cardBody.append(cardTitle);
    var cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = "Prix : " + card.prix + " €";
    cardBody.append(cardText);
    var cardButton = document.createElement('button');
    cardButton.classList.add('btn', 'btn-primary', 'add');
    cardButton.setAttribute('type', 'button');
    cardButton.innerText = "Ajouter au panier";
    cardBody.append(cardButton);
    var section = document.querySelector('#products');
    section.append(carte);

    });
}




// Function to generate cart structure
function generateCart(){
    var panier = document.createElement('div');
    panier.classList.add('card', 'w-75');
    var header = document.createElement('div');
    header.classList.add('card-header');
    header.innerText = "Panier :"
    panier.append(header);
    var corpsPanier = document.createElement('ul');
    corpsPanier.classList.add('list-group', 'list-group-flush');
    panier.append(corpsPanier);
    var sousTotal = document.createElement('li');
    sousTotal.classList.add('list-group-item');
    sousTotal.setAttribute('id', 'total-cart');
    sousTotal.innerText = "Sous-total : ";
    corpsPanier.append(sousTotal);
    var reduction = document.createElement('li');
    reduction.classList.add('list-group-item', 'reduction');
    reduction.innerText = "Réduction : ";
    corpsPanier.append(reduction);
    var total = document.createElement('li');
    total.classList.add('list-group-item');
    total.setAttribute('id', 'total');
    total.innerText = "Total : ";
    corpsPanier.append(total);
    var sectionPanier = document.querySelector('#panier');
    sectionPanier.append(panier);

}


// Shopping Cart functions

var shoppingCart = (function () {
    
    // Private methods and properties
    var cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();



    // Public methods and properties
    var obj = {};

    obj.addItemToCart = function (name, price, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        console.log("addItemToCart:", name, price, count);

        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name) { // Removes one item
        for (var i in cart) {
            if (cart[i].name === name) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name) { // removes all item name
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.countCart = function () { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        console.log("Listing cart");
        console.log(cart);
        for (var i in cart) {
            console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    obj.reduction = function () { // -> return the reduction or how much you need to add before the reduction
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
            if(totalCost >= 200){
                var cost =  totalCost * 0.80;
                var reduc = cost - totalCost;
                return reduc.toFixed(2) + " € soit 20% de remise";

            }
            else{
                return "Encore " + (200 - totalCost).toFixed(2) + " € pour avoir droit à une réduction";
            }
        
    }

    obj.total = function () { // -> return the total price with the reduction if there's any
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
            if(totalCost >= 200){
                var cost =  totalCost * 0.80;
                var reduc = totalCost - cost;
                var result = totalCost - reduc;
                return result.toFixed(2);

            }
            else{
                return totalCost;
            }
        
    }

    // ----------------------------
    return obj;
})();

