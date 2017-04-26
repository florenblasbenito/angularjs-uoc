//----------------------------------------------------------------
// shopping cart
//
function shoppingCart(cartauthor) {
    this.cartauthor = cartauthor;
    this.clearCart = false;
    this.checkoutParameters = {};
    this.items = [];

    // load items from local storage when initializing
    this.loadItems();

    // save items to local storage when unloading
    var self = this;
    $(window).unload(function () {
        if (self.clearCart) {
            self.clearItems();
        }
        self.saveItems();
        self.clearCart = false;
    });
}

// load items from local storage
shoppingCart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartauthor + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.id != null && item.author != null && item.price != null && item.quantity != null) {
                    item = new cartItem(item.id, item.author, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

// save items to local storage
shoppingCart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartauthor + "_items"] = JSON.stringify(this.items);
    }
}

// adds an item to the cart
shoppingCart.prototype.addItem = function (id, author, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {

        // update quantity for existing item
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.id == id) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!found) {
            var item = new cartItem(id, author, price, quantity);
            this.items.push(item);
        }

        // save changes
        this.saveItems();
    }
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function (id) {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            total += this.toNumber(item.quantity * item.price);
        }
    }
    return total;
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalCount = function (id) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            count += this.toNumber(item.quantity);
        }
    }
    return count;
}

// clear the cart
shoppingCart.prototype.clearItems = function () {
    this.items = [];
    this.saveItems();
}

// define checkout parameters
shoppingCart.prototype.addCheckoutParameters = function (serviceauthor, merchantID, options) {

    // check parameters
    if (serviceauthor != "PayPal" && serviceauthor != "Google" && serviceauthor != "Stripe") {
        throw "serviceauthor must be 'PayPal' or 'Google' or 'Stripe'.";
    }
    if (merchantID == null) {
        throw "A merchantID is required in order to checkout.";
    }

    // save parameters
    this.checkoutParameters[serviceauthor] = new checkoutParameters(serviceauthor, merchantID, options);
}

// check out
shoppingCart.prototype.checkout = function (serviceauthor, clearCart) {

    // select serviceauthor if we have to
    if (serviceauthor == null) {
        var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
        serviceauthor = p.serviceauthor;
    }

    // sanity
    if (serviceauthor == null) {
        throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
    }

    // go to work
    var parms = this.checkoutParameters[serviceauthor];
    if (parms == null) {
        throw "Cannot get checkout parameters for '" + serviceauthor + "'.";
    }
    switch (parms.serviceauthor) {
        case "PayPal":
        this.checkoutPayPal(parms, clearCart);
        break;
        default:
        throw "Unknown checkout service: " + parms.serviceauthor;
    }
}

// check out using PayPal
// for details see:
// www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
shoppingCart.prototype.checkoutPayPal = function (parms, clearCart) {

    // global data
    var data = {
        cmd: "_cart",
        business: parms.merchantID,
        upload: "1",
        rm: "2",
        charset: "utf-8"
    };

    // item data
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var ctr = i + 1;
        data["item_number_" + ctr] = item.id;
        data["item_author_" + ctr] = item.author;
        data["quantity_" + ctr] = item.quantity;
        data["amount_" + ctr] = item.price.toFixed(2);
    }

    // build form
    var form = $('<form/></form>');
    form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
    form.attr("method", "POST");
    form.attr("style", "display:none;");
    this.addFormFields(form, data);
    this.addFormFields(form, parms.options);
    $("body").append(form);

    // submit form
    this.clearCart = clearCart == null || clearCart;
    form.submit();
    form.remove();
}


// utility methods
shoppingCart.prototype.addFormFields = function (form, data) {
    if (data != null) {
        $.each(data, function (author, value) {
            if (value != null) {
                var input = $("<input></input>").attr("type", "hidden").attr("author", author).val(value);
                form.append(input);
            }
        });
    }
}
shoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}

//----------------------------------------------------------------
// checkout parameters (one per supported payment service)
//
function checkoutParameters(serviceauthor, merchantID, options) {
    this.serviceauthor = serviceauthor;
    this.merchantID = merchantID;
    this.options = options;
}

//----------------------------------------------------------------
// items in the cart
//
function cartItem(id, author, price, quantity) {
    this.id = id;
    this.author = author;
    this.price = price * 1;
    this.quantity = quantity * 1;
}

