const qSelector = (elem) => document.querySelector(elem)
const qSelectorAll = (elem) => document.querySelectorAll(elem)


boneJson.map((item, index) => {

    let boneItem = qSelector('.models .bone-item').cloneNode(true)

    boneItem.querySelector('.bone-item--img img').src = item.img
    boneItem.querySelector('.bone-item--name').innerHTML = item.name
    boneItem.querySelector('.bone-item--desc').innerHTML = item.description
    boneItem.querySelector('.bone-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    boneItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        qSelector('.boneWindowArea').style.opacity = 0
        qSelector('.boneWindowArea').style.display = 'flex'
        setTimeout(() => qSelector('.boneWindowArea').style.opacity = 1, 200)

    })

    
    qSelector('.bone-area').append(boneItem)
})