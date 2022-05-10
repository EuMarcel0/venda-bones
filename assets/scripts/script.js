let cart = [];
let modalQtd = 1;
let modalKey = 0;

const qSelector = (elem) => document.querySelector(elem)
const qSelectorAll = (elem) => document.querySelectorAll(elem)

// LISTATEM DOS BONÉS

boneJson.map((item, index) => {

    let boneItem = qSelector('.models .bone-item').cloneNode(true)



    boneItem.setAttribute('data-key', index)
    boneItem.querySelector('.bone-item--img img').src = item.img
    boneItem.querySelector('.bone-item--name').innerHTML = item.name
    boneItem.querySelector('.bone-item--desc').innerHTML = item.description
    boneItem.querySelector('.bone-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    boneItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.bone-item').getAttribute('data-key')
        modalQtd = 1;
        modalKey = key

        qSelector('.boneInfo h1').innerHTML = boneJson[key].name
        qSelector('.boneInfo .boneInfo--desc').innerHTML = boneJson[key].description
        qSelector('.boneBig img').src = boneJson[key].img
        qSelector('.boneInfo .boneInfo--size span').innerHTML = boneJson[key].sizes
        qSelector('.boneInfo .boneInfo--actualPrice').innerHTML = `R$ ${boneJson[key].price.toFixed(2)}`
        qSelector('.boneInfo--size.selected').classList.remove('selected')
        qSelectorAll('.boneInfo--size').forEach((size, sizeIndex) =>{
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = boneJson[key].sizes[sizeIndex]
        })  

        qSelector('.boneInfo--qt').innerHTML = modalQtd

        qSelector('.boneWindowArea').style.opacity = 0
        qSelector('.boneWindowArea').style.display = 'flex'
        setTimeout(() => qSelector('.boneWindowArea').style.opacity = 1, 100)

    })

    
    qSelector('.bone-area').append(boneItem)
})

// EVENTOS DO MODAL

function closeModal() {
    qSelector('.boneWindowArea').style.opacity = 0
    setTimeout(() => {
        qSelector('.boneWindowArea').style.display = 'none'
    }, 500)
}
qSelectorAll('.boneInfo--cancelButton, .boneInfo--cancelMobileButton').forEach((item) =>{
    item.addEventListener('click', closeModal)
})

qSelector('.boneInfo--qtmenos').addEventListener('click', () => {
    if(modalQtd > 1){
        modalQtd--
        qSelector('.boneInfo--qt').innerHTML = modalQtd
    }
   
})
qSelector('.boneInfo--qtmais').addEventListener('click', () => {
    modalQtd++
    qSelector('.boneInfo--qt').innerHTML = modalQtd

})
qSelectorAll('.boneInfo--size').forEach((size, sizeIndex) =>{
   size.addEventListener('click', (e) =>{
        qSelector('.boneInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
   })
})  
qSelector('.boneInfo--addButton').addEventListener('click', () => {
    let getSize = parseInt(qSelector('.boneInfo--size.selected').getAttribute('data-key'))
    let itemName = boneJson[modalKey].name
    let indentifier = boneJson[modalKey].id+'@'+getSize

    let keyItem = cart.findIndex((item) =>{
        return item.indentifier == indentifier
    })
    if(keyItem > -1){
        cart[keyItem].qt += modalQtd
    }else{
        cart.push({
            indentifier,
            id:boneJson[modalKey].id,
            itemName,
            getSize,
            qt:modalQtd
        })
    }
    updateCart() 
    closeModal()
})

qSelector('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        qSelector('aside').style.left = '0'
    }
    
})
qSelector('.menu-closer').addEventListener('click', ()=>{
    qSelector('aside').style.left = '100vw'
})

function updateCart(){

    qSelector('.menu-openner span').innerHTML = cart.length

    if(cart.length > 0){
        qSelector('aside').classList.add('show')
        qSelector('.cart').innerHTML = ''

        let subTotal = 0
        let desconto = 0
        let total = 0


        for(let i in cart){
            let boneItem = boneJson.find((item)=>{
                return item.id == cart[i].id 
            })

            subTotal += boneItem.price * cart[i].qt


            let cartItem = qSelector('.models .cart--item').cloneNode(true)
            let sizeItemCard = cart[i].getSize

            switch(sizeItemCard){
                case 0:
                    sizeItemCard = 'P';
                    break
                case 1:
                    sizeItemCard = 'M';
                    break
                case 2:
                    sizeItemCard = 'G';
                    break
            }
            cartItem.querySelector('img').src = boneItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = `${boneItem.name+' - '+sizeItemCard}`
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else{
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updateCart()
            })

            qSelector('.cart').append(cartItem)
        }

        desconto = subTotal * 0.1
        total = subTotal - desconto

        qSelector('.subtotal span:last-child').innerHTML = `${subTotal.toFixed(2)}`
        qSelector('.desconto span:last-child').innerHTML = `${desconto.toFixed(2)}`
        qSelector('.total span:last-child').innerHTML = `${total.toFixed(2)}`

    }else{
        qSelector('aside').classList.remove('show')
        qSelector('aside').style.left = '100vw'
    }
}