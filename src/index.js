//Variables
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let selectedDogBreeds = []
//Functions
let fetchImages = () => {
    fetch(imgUrl)
        .then(response => response.json())
        .then(json => displayImages(json))
}
let displayImages = (images) => {
    for (const image of images.message) {
        let createPicture = document.createElement('img');
        createPicture.src = image
        document.querySelector('#dog-image-container').appendChild(createPicture);
    }
}
let renderBreeds = () => {
    fetch(breedUrl)
    .then(response => response.json())
    .then(json => targetBreedListener(json))
}
let applyToList = (breeds, value) => {
    document.querySelector('#dog-breeds').remove();
    let newUl = document.createElement('ul');
    newUl.setAttribute('id', 'dog-breeds');
    document.body.appendChild(newUl)
    
    for (const breed of breeds) {
        let breedListItem = document.createElement('li');
        breedListItem.textContent = breed;
        breedListItem.setAttribute('name', value)
        document.querySelector('#dog-breeds').appendChild(breedListItem)
        breedListItem.addEventListener('click', changeColor)
    }
    selectedDogBreeds = [];

}
let changeColor = (e) => {
    e.target.style.color = 'red';
}

let targetBreedListener = (breeds) => {
    let dropDown = document.getElementById('breed-dropdown');
    
    dropDown.addEventListener('change', function() {
        for (const breed of Object.keys(breeds.message)) {
            if (breed.startsWith(dropDown.value)) {
                selectedDogBreeds.push(breed);
            }
        }
    applyToList(selectedDogBreeds, dropDown.value)
})
    if (selectedDogBreeds.length === 0) {
        for (const breed of Object.keys(breeds.message)) {
            selectedDogBreeds.push(breed);
        }
        applyToList(selectedDogBreeds)
    }
}
//Events
document.addEventListener('DOMContentLoaded', fetchImages)
document.addEventListener('DOMContentLoaded', renderBreeds)

