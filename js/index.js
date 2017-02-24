console.log('Working?');

//====================TABLE============

//click event
let subtotal = 0
let tax = 0
let total = 0

$('.card-action').click(function(event) {
    //find and set tbody to a variable
    let tableBody = $('.bordered tbody')
    //Find the order name
    let order = $(this).prev().children().text().match(/[a-zA-Z\s]+/)
    //Find the item price number
    let itemPrice = $(this).prev().children().text().match(/\d+\.\d+/)
    //turn the characters into a number
    let priceNumber = +(itemPrice)

    // Create a tr with 4 tds capturing the order name, price, qty, and removal icon
    tableBody.append('<tr><td>' + order + '</td><td class="right-align">$<span class="price">' + priceNumber + '</span></td>' + '<td><i class="material-icons prefix right-align remove">highlight_off</i></tr>')

    //removing order items event
    $('.remove').click(function(event) {
        // find price on the remove row
        let priceToDelete = $('tbody tr:last .price')
        // turn price into a number
        let price = +(priceToDelete.text())
        // subtract the removed price from the subtotal
        subtotal = (subtotal - price)

        tax = tax - (0.08845 * price)
        total = (total - (price + 0.08845 * price))
        // remove the entire row
        $(this).parent().parent().remove()
        // print the subtotal to the screen
        $('#subtotal').text('$' + subtotal.toFixed(2))
        $('#tax').text('$' + tax.toFixed(2))
        $('#total').text('$' + total.toFixed(2))
    })
    // Setting a variable to add the prices
    subtotal += priceNumber
    // Printing subtotal to row
    $('#subtotal').text('$' + subtotal.toFixed(2))
    // Repeating with tax
    tax = (0.08845 * subtotal)
    $('#tax').text('$' + tax.toFixed(2))
    // Repeating with total
    total = (subtotal + tax)
    $('#total').text('$' + total.toFixed(2))
})

//=============== toast

$('#placeOrder').on('click', function(event) {
    event.preventDefault();

    if (subtotal === 0) {
        Materialize.toast('Please make an order.', 4000)
        return
    }

    let name = $('#name').val().length
    let phone = $('#phone').val().length
    let address = $('#address').val().length


    if (name === 0) {
        Materialize.toast('Please, fill in name.', 4000)
        return
    }

    if (phone === 0) {
        Materialize.toast('Please, fill in phone number.', 4000)
        return
    }

    if (address === 0) {
        Materialize.toast('Please, fill in address.', 4000)
        return
    }

    Materialize.toast('Thank you for the order', 4000);
})
