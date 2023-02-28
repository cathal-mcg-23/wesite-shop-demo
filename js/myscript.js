var pageId;
var isLoggedIn = "loggedOut";
var cartContents = [];
var myStorage = window.localStorage;
var items = [
   
    {
        "image1": "pai/02.jpg",
        "image2": "pai_s/02_s.jpg",
        "title": "Abstract Landscape Painting",
        "description": "By Osnat Tzadok, this is an original painting that I have already sold, but a similar can be recreated",
        "price": "659.99"
    },
    {
        "image1": "pai/03.jpg",
        "image2": "pai_s/03_s.jpg",
        "title": "Shakin' off the Blues",
        "description": "artist Iris Scott...opted not to pause on her painting to go clean brushes, deciding to use her fingers instead.",
        "price": "sold"
    },
    {
        "image1": "pai/05.jpg",
        "image2": "pai_s/05_s.jpg",
        "title": "Abstract People",
        "description": "Hand Painted, Abstract People - Modern Rolled Canvas. We only use Marie's museum quality paint since it is environmentally-friendly and never fades.",
        "price": "63.74"
    },
    {
        "image1": "pai/06.jpg",
        "image2": "pai_s/06_s.jpg",
        "title": "Rocking Lady 1",
        "description": "Handpainted Art Painting - 32in X 32in, Community Artists Group",
        "price": "114.19"
    },
    {
        "image1": "pot/01.jpg",
        "image2": "pot_s/01_s.jpg",
        "title": "Crystalline Drip Glaze Vase",
        "description": "When the studio closed in 1935 the formulae for the glazes and all the pottery documentation were deliberately destroyed, so that the unique Ruskin products could never be replicated.",
        "price": "325.99"
    },
    {
        "image1": "pot/02.jpg",
        "image2": "pot_s/02_s.jpg",
        "title": "Heart Bowl",
        "description": "At Castle Arch Pottery our Returns Policy lasts 30 days from date of delivery.",
        "price": "24.99"
    },
    {
        "image1": "pot/03.jpg",
        "image2": "pot_s/03_s.jpg",
        "title": "Marvin Bailey Face Jug",
        "description": "This pottery is created by self taught folk art potter Marvin Bailey, a Lancaster SC native. See chickenmanart",
        "price": "115.99"
    },
    {
        "image1": "pos/01.jpg",
        "image2": "pos_s/01_s.jpg",
        "title": "Laundry Day",
        "description": "Laundry Day by Jeff Drew Pictures. Banish those blank walls: visit society6",
        "price": "25.99"
    }, 
    {
        "image1": "pai/01.jpg",
        "image2": "pai_s/01_s.jpg",
        "title": "The Starry Night",
        "description": "wikipedia: The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh.",
        "price": "unavailable"
    },
    {
        "image1": "pos/02.jpg",
        "image2": "pos_s/02_s.jpg",
        "title": "Wystawa Plakatow Jazzowych",
        "description": "Original Polish jazz poster, Designer: Ryszard Kaja, visit polishposter",
        "price": "45.99"
    },
    {
        "image1": "pos/03.jpg",
        "image2": "pos_s/03_s.jpg",
        "title": "Best Seat In The House",
        "description": "From pointless-posters, printed in the USA and suitable for framing",
        "price": "9.99"
    }
];


(function () {
    console.log("afunc1");
}());

$(document).ready(function () {

    
    
    
    console.log("page laod start");
    
    $('.collapse').on('hidden.bs.collapse', function () {
        console.log("link collllcked A");
    });

    $('.collapse').on('shown.bs.collapse', function () {
        console.log("link collllcked B");
    });

    
    $("footer, #logOutButton").click(function () {
        console.log("clear localstorage");
        localStorage.clear();
    });
    
    pageId = document.getElementsByTagName("body")[0].id;
    console.log("page id:", pageId);
    startFunction()

    $("main").slideDown("slow");

    $(".item button").click(function () {
        var itemId = $(this).attr('itemId' )
        console.log("item:", itemId);
        cartContents = cartContents.concat( itemId );
        myStorage.setItem('cartContents',  JSON.stringify(cartContents) );
        cartEdits()
    });

    $(".divCart button").click(function () {
        var itemId = $(this).attr('itemId' )
        //console.log("cart remove id:", itemId);
        //console.log("cart remove len:", cartContents.length);
        
        
        if( itemId == -2 )
        {
            // checkout button
            window.location.href = "checkout.html";
            return;
        }
        
        cartRemoveItem( itemId )
        
    });

    

    
    $("#shop form").submit(function () {
        console.log("form submit");
        
        event.preventDefault(); 
        
    });
    
    
    
    
    $("#checkoutForm").submit(function () {
        console.log("form submit");
        
        $("form").remove();
        $("#deliveryEstimate").css('display', 'block ' )// remove();

        cartContents = [];
        myStorage.setItem('cartContents',  JSON.stringify(cartContents) );
        cartEdits()

        event.preventDefault(); 
        
    });
    
    $(".visitShop").click(function () {
        console.log("bisit shop");
        window.location.href = "shop.html";
        
    });
    
    $("#filterHeading").click(function () {
        console.log("fffff");
        console.log( $('#filterinside').css('display')) 
        
        
        if( $('#filterinside').css('display') == 'none' )
        {
            $('#filterinside').slideDown("slow");
            $('#filters h2').css( 'border-bottom-left-radius', '0px' )
            $('#filters h2').css( 'border-bottom-right-radius', '0px' )
            
        }
        else
        {

            // corners are rounded after the slide up
            $("#filterinside").slideUp(400, function() {
                $('#filters h2').css( 'border-bottom-left-radius', '9px' )
                $('#filters h2').css( 'border-bottom-right-radius', '9px' )
            });
        }
        
    });
    console.log("page laod end");

});

(function () {
    console.log("afunc2");
}());





// when link is clicked
function startFunction() {
    console.log("start");
    
        
    if( myStorage.getItem('cartContents') == null )
    {
        myStorage.setItem('cartContents',  JSON.stringify(cartContents) );

        console.log( 'set new cart contents');
    }
    else
    {
        cartContents = JSON.parse( myStorage.getItem('cartContents') )
        
        console.log( 'got new cart contents');
    }
    

    if (myStorage.getItem('isLoggedIn') == "loggedIn") {
        isLoggedIn = "loggedIn"
        loggedInEdits()
    }
    
    cartEdits()
    
    if (pageId == "login") {
        pageLogin();
    }
    if (pageId == "account") {
        pageAccount();
    }
    if (pageId == "shop") {
        pageShop();
    }
    if (pageId == "cart") {
        pageCart();
    }
    if (pageId == "checkout") {
        pageCheckout();
    }
}


function cartEdits()
{
    console.log("cartEdits: ", cartContents.length)
    
    if( cartContents.length > 0 )
    {
        $("#cartButton").html("Cart( " + cartContents.length + " items )");
    }
    else
    {
        $("#cartButton").html("Cart");
    }
}


function cartCost()
{
    var costTotal = 0;
    
    for( var i = cartContents.length -1 ; i >= 0; i-- )
    {
        costTotal += +items[cartContents[i] ]['price'] 
    }
    
    return ( Math.round( costTotal * 100 ) / 100 )
}

function cartTotalCostItemCount() 
{
    $("#cartItemCount").text(  cartContents.length + " items "  )
    $("#totalToPay").text(   "€" + ( cartCost()  ) )
}


function cartRemoveItem( itemId )
{
    console.log("\n\ncartRemoveItem, cartContents.length len: ", cartContents.length, " itemId: "  + itemId )
    
    var e = $("#itemsContainer button")  // ul list 
    
    
    if( itemId == -1 )
    {
        // empty button
        var loop = e.length -2
        var i = 0;
        while(  i < loop )
        {
            $("#itemsContainer").children().eq( 0 ).remove();
            i++
        }
        cartContents = [];
        
        // return;

    }
    
    if (itemId >= 0) 
    {
        for (var i = 0; i < e.length - 2; i++) {
            if (i < itemId) {
                console.log("button old id: ", $(e[i]).attr('itemId'), " new Id: ", i);
            } else {
                console.log("button old id: ", $(e[i]).attr('itemId'), " new Id: ", i - 1);
                $(e[i]).attr('itemId', (i - 1))
            }
        }

        $("#itemsContainer").children().eq(itemId).remove();
        cartContents.splice(itemId, 1)  
    }
    myStorage.setItem('cartContents',  JSON.stringify(cartContents) );
        
    cartTotalCostItemCount() 
    cartEdits()
}

function loggedInEdits() {
    var e = $("#loginButton")
    e.html( myStorage.getItem('loginName') + " logged in");

    var f = $("#loginLink")
    f.attr("href", "account.html")
}

function pageLogin() {
    if (isLoggedIn == "loggedIn") {
        showLoggedIn()
    }

    if (isLoggedIn == "loggedOut") {
        showLoggedOut()
    }
}

function pageAccount() {
    if (isLoggedIn == "loggedIn") {
        showLoggedIn()
    }
    if (isLoggedIn == "loggedOut") {
        showLoggedOut()
    }
}

function pageCheckout() {
    if (isLoggedIn == "loggedIn") 
    {
        showLoggedIn()
        if( cartContents.length == 0 )
        {
            $("form").remove();
            $("#noItems").css('display', 'block ' )// remove();
        }
        else
        {
            $("#totalToPay").text(   "€" + ( cartCost()  ) )
        }
    }
    if (isLoggedIn == "loggedOut") {
        showLoggedOut()
    }
}

function pageCart() {
    
    var e = $("#itemsContainer")
    console.log( "cart: "  + e.children().length )
    /*
    var total = e.children()[ 0 ]//e.children().length - 1].
    console.log( "cart2: "  + total.textContent ) 
    console.log( "cart2: "  + total.innerHTML ) 
    //console.log( "cart2: "  + total.prop('outerHTML')) 
*/
    for( var i = cartContents.length -1 ; i >= 0; i-- )
    {
        // console.log( "cart3: "  + makeCartItemHTML( items[cartContents[i] ], ( i ) ) )
        e.prepend( makeCartItemHTML( items[cartContents[i] ], ( i ) ) ) ; 
    }
    cartTotalCostItemCount() 
}


function pageShop() {
    var e = $("#itemsContainer")
    console.log( "shop: "  + e.children().length ) 

    for( var i = 0; i < items.length; i++ )
    {
        e.append( makeItemHTML( items[i], ( i ) )) ; 
    }
}




function makeCartItemHTML( itemObject, itemNumber )
{
    var a = '';
    
    a+= '<li class="list-group-item d-flex justify-content-between lh-condensed">'
    a+= '	<div class="cartProduct">'
    a+= '		<button type="button" itemId="'
    a+= itemNumber
    a+= '" class="cartButton btn btn-warning" >'
    a+= '			remove'
    a+= '		</button>'
    a+= '		<a href="images/products1/'
    a+= itemObject['image1']
    a+= '" ><h5 class="">'
    a+= itemObject['title']
    a+= '</h5></a>'
    a+= '	</div>'
    a+= '	<span class="text-muted">€'
    a+= itemObject['price']
    a+= '</span>'
    a+= '</li>'
    
    return a;
}


function makeItemHTML( itemObject, itemNumber )
{
    var price = itemObject['price']
    var isDisabled = "disabled ";
    if( isNaN(itemObject['price']) == false )
    {
        price = "€" + itemObject['price']
        isDisabled = "";
    }
    var a = '';
    
    a+= '<div class="item row">'
    a+= '    <div class="col-lg itemmain">'
    a+= '        <a href="images/products1/'
    a+= itemObject['image1']
    a+= '">'
    a+= '            <img alt="item pic" src="images/products1/'
    a+= itemObject['image2']
    a+= '" />'
    a+= '            <h2>'
    a+= itemObject['title']
    a+= '</h2>'
    a+= '        </a>'
    a+= itemObject['description']
    a+= '    </div>'
    a+= '    <div class="col-lg-3 itemCorner">'
    a+= '        <div class="price">'
    a+= price
    a+= '        </div>'
    a+= '        <div class="buy">'
    a+= '            <button ' + isDisabled + 'type="button" id="addItem" itemId="'
    a+= itemNumber;
    a+= '" class="btn btn-primary">add to cart</button>'
    a+= '        </div>'
    a+= '    </div>'
    a+= '</div>'
    
    return a;
}


function showLoggedOut() {
    console.log('show Logged out tessxt');
    var e = $("#loggedOut")
    e.css("visibility", "visible");
    e.animate({
        "opacity": "show",
        top: "100"
    }, 500);

}

function showLoggedIn() {
    console.log('show text');
    var e = $("#loggedIn")
    e.css("visibility", "visible");
    e.animate({
        "opacity": "show",
        top: "100"
    }, 500);
}


function signinClick() {
    console.log('sign in click');
    var userEmail = $('#inputEmail').val()
    console.log(userEmail);

    if (userEmail == "terri@mail.com") {
        console.log("you logged in")
        $('#loggedOut').addClass("myHidden")
        newLogin();
        $("#loggedOut").css('display', 'none')
        showLoggedIn();
    } else {
        console.log("incorrect username or password")
    }

    event.preventDefault(); // disable normal form submit behavior
    return true;            // prevent further bubbling of event
}

function newLogin() {
    myStorage.setItem('isLoggedIn', 'loggedIn');
    myStorage.setItem('loginEmail', "terri@mail.com");
    myStorage.setItem('loginName', "Terri");

    loggedInEdits()
}



