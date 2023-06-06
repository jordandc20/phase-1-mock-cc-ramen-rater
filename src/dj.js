// write your code here
document.addEventListener('DOMContentLoaded', () => {



    fetch('http://localhost:3000/ramens')
        .then(resp => resp.json())
        .then(result => {
            eachRamen(result)
        })

    function eachRamen(allramen) { allramen.forEach(ramen => addMenuItem(ramen)) }

    function addMenuItem(ramen) {
        const allRamenBar = document.querySelector('#ramen-menu')

        const ramenImg = document.createElement('img')
        ramenImg.src = ramen.image


        ramenImg.addEventListener('click', handleImgClick)

        allRamenBar.append(ramenImg)
        function handleImgClick() {
            const imgFocus = document.querySelector('img.detail-image')
            imgFocus.src = ramenImg.src
            const nameFocus = document.querySelector('h2.name')
            nameFocus.textContent = ramen.name
            const restaurantFocus = document.querySelector('h3.restaurant')
            restaurantFocus.textContent = ramen.restaurant
            const ratingFocus = document.querySelector('#rating-display')
            ratingFocus.textContent = ramen.rating
            const commentFocus = document.querySelector('#comment-display')
            commentFocus.textContent = ramen.comment
        }
    }




    const form = document.querySelector('#new-ramen')
    form.addEventListener('submit', newRamen)

    function newRamen(e) {
        e.preventDefault()

        const newName = form.querySelector('#new-name').value
        const newRestaurant = form.querySelector('#new-restaurant').value
        const newImg = form.querySelector('#new-image').value
        const newRating = form.querySelector('#new-rating').value
        const newComment = form.querySelector('#new-comment').value

        const newR = {
            name: newName,
            restaurant: newRestaurant,
            image: newImg,
            rating: newRating,
            comment: newComment
        }

        addMenuItem(newR)

        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newR)
        })


        form.reset()


    }



})


