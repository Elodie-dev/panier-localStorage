window.onload = function() {
    // Call of my function with AJAX request
    readFile('data.json', function(cards) {
        // console.log(cards);

        // Call of my function to create articles
        createCard(cards);

        // function to generate cart structure
        generateCart();

         // Declaration of my function to display the cart content
         function displayCart() {
            var cartArray = shoppingCart.listCart();
            // console.log(cartArray);
            var output = "";

            for (var i in cartArray) {
                output += "<p data-name='"
                    +cartArray[i].name + "'>"
                    +cartArray[i].name
                    +"<p class='item-count'>Quantité : "+cartArray[i].count+" </p>"
                    +"<p>" +cartArray[i].total + " €"
                    +" <button class='plus-item btn btn-primary' data-name='"
                    +cartArray[i].name+"'><i class='fas fa-plus'></i></button>"
                    +" <button class='substract-item btn btn-primary' data-name='"
                    +cartArray[i].name+"'><i class='fas fa-minus'></i></button>"
                    +" <button class='delete-item btn btn-danger' data-name='"
                    +cartArray[i].name+"'><i class='fas fa-trash-alt'></i></button>" + "</p>"
                    +"</p>";
            }
            var produit = document.createElement('li');
            produit.classList.add('list-group-item');
            produit.innerHTML = output;
            var corpsPanier = document.querySelector('.list-group-flush');
            corpsPanier.prepend(produit);
            document.querySelector("#total-cart").innerHTML = shoppingCart.totalCart() + "€" ;
        }


        // function to display the cart content if there's any
        displayCart();

        // event click on the button of each article to add them to the cart
        var buttonsAdd = document.querySelectorAll('.add');
        buttonsAdd.forEach(button => {
            button.addEventListener('click', function(){
                
                var name = this.parentNode.getAttribute('data-name');
                var price = Number(this.parentNode.getAttribute('data-price'));

                shoppingCart.addItemToCart(name, price, 1);
                displayCart();
                document.location.reload(true);
            })
        })

       

        // click event on the trash button of each article in the cart to delete the line from the cart
        var supprimer = document.querySelectorAll('.delete-item');
        supprimer.forEach(suppr => {
            suppr.addEventListener("click", function(){
                var name = this.getAttribute("data-name");
                if (confirm( "Etes-vous sur de vouloir supprimer cet article ?" ) ) {
                    shoppingCart.removeItemFromCartAll(name);
                    document.location.reload(true);
                }
                else{
                    document.location.reload(true);
                }
                
            });  
        })

        // change event on the quantity of each article to be able to change it
        var counts = document.querySelectorAll('.item-count');
        counts.forEach(nombre => {
            nombre.addEventListener("change", function(){
                var name = this.getAttribute("data-name");
                var count = Number(this.val());
                shoppingCart.setCountForItem(name, count);
                displayCart();
                document.location.reload(true);
            });
        })

        // click event on the + button of each article in the cart to be able to add as many of the same article as u want
        var adds = document.querySelectorAll('.plus-item');
        adds.forEach(addItem => {
            addItem.addEventListener("click", function(){
                var name = this.getAttribute('data-name');
                shoppingCart.addItemToCart(name, 0, 1);
                displayCart();
                document.location.reload(true);
            });
        })

        // click event on the - button of each article in the cart to be able to remove as many of the same article as u want
        var substracts = document.querySelectorAll('.substract-item');
        substracts.forEach(substract => {
            substract.addEventListener("click", function(){
                var name = this.getAttribute("data-name");
                shoppingCart.removeItemFromCart(name);
                displayCart();
                document.location.reload(true);
            });
        })
        
        // add the result of the reduction 
        var reduc = document.querySelector('.reduction');
        reduc.innerHTML += shoppingCart.reduction();

        // add the cost with the reduction if there's any
        var total = document.querySelector('#total');
        total.innerHTML += shoppingCart.total() + " €";


        
    })
}