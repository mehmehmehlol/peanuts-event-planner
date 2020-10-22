const BASE_URL = "http://localhost:3000"
const CHARACTERS_URL = `${BASE_URL}/characters`
const ACTIVITIES_URL = `${BASE_URL}/activities`
const EVENTS_URL = `${BASE_URL}/events`

const divDisplay = document.querySelector('.display')

let addCharacterBtn = document.querySelector('#add-character-btn')
addCharacterBtn.addEventListener('click', () => buildForm())

// const addCharacterForm = () => {
//     buildForm()
//     let form = document.querySelector('form')
//     form.addEventListener('submit', (e) => handleFormSubmit(e, 'create'))

// }

let editCharacterBtn = document.querySelector('#edit-character-btn')
    // editCharacterBtn.addEventListener('click', () => editCharacterForm())

// const editCharacterForm = () => {
//     buildEditForm()
//     let form = document.querySelector('form')
//     console.log(form)
//     form.addEventListener('submit', (e) => handleFormSubmit(e, editedCharacter))
// }

// Handlers
function handleFormSubmit(e) {
    e.preventDefault()
    let character = {
        image: e.target.image.value,
        name: e.target.name.value,
        nickname: e.target.nickname.value,
        personality: e.target.personality.value,
        hobbies: e.target.hobbies.value,
        catchphrase: e.target.catchphrase.value
    }

    postCharacter(character)

    //patchCharacter(character)
}





const homeBtn = document.querySelector('#homeBtn')
let homeImg = document.querySelector('#homeImg')
homeBtn.style.cssText = 'width:70px; border-radius: 50%'
homeImg.style.cssText = 'width:55px; border-radius: 50%'

homeBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    getEvents()
    getActivities()
    getCharacters()
})

const characterBtn = document.querySelector('#characterBtn')
characterBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    getCharacters()
})

const activityBtn = document.querySelector('#activityBtn')
activityBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    getActivities()
})

const eventBtn = document.querySelector('#eventBtn')
eventBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    getEvents()
})

// fetch

getCharacters()
getEvents()
getActivities()

function getCharacters() {
    fetch(CHARACTERS_URL)
        .then(res => res.json())
        .then(characters => {
            characters.data.forEach(character => {
                buildCharacter(character)
            })
        })
}

function getActivities() {
    fetch(ACTIVITIES_URL)
        .then(res => res.json())
        .then(activities => activities.data.forEach(activity => buildActivity(activity)))

}

function getEvents() {
    fetch(EVENTS_URL)
        .then(res => res.json())
        .then(events => events.data.forEach(event => buildEvent(event)))
}

function postCharacter(character) {
    fetch(CHARACTERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        })
        .then(res => res.json())
        .then(character => {
            //debugger
            divDisplay.innerHTML = ''
            buildCharacter(character.data)
        })
        .catch(error => console.log('Errors:', error))
}

// function patchCharacter(character, id) {
//     fetch(`CHARACTERS_URL/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(character)
//         })
//         .then(res => res.json())
//         .then(character => {
//             getCharacters(CHARACTERS_URL)
//                 .then(() => {
//                     buildCharacter(character.data)
//                 })
//         })
// }

// DOM Events


let divC = document.createElement('div')
divC.id = 'character-list'
    // let editCharacterBtn = document.createElement('button')

function buildCharacter(character) {
    // let h1 = document.createElement('h1')
    let divCharacter = document.createElement('div')
    divCharacter.id = character.id

    let characterAttribute = character.attributes
    let ul = document.createElement('ul')

    let img = document.createElement('img')
    let h3 = document.createElement('h3')
    let h5 = document.createElement('h5')
    let pPersonal = document.createElement('p')
    let pHobbies = document.createElement('p')
    let pCp = document.createElement('p')

    img.src = characterAttribute.image
    img.className = 'character-avatar'
    h3.textContent = `Name: ${characterAttribute.name}`
    h5.textContent = `Nickname: ${characterAttribute.nickname}`
    pPersonal.textContent = `Personality: ${characterAttribute.personality}`
    pHobbies.textContent = `Hobbies: ${characterAttribute.hobbies}`
    pCp.textContent = `Catchphrase: ${characterAttribute.catchphrase}`

    // add activities each character join
    let h5AN = document.createElement('h5')
    h5AN.textContent = 'Actvities Joined'
    characterAttribute.activities.forEach(activity => buildActivityLi(activity, ul))

    // need a button here to edit and delete the characters
    let editCharacterBtn = document.createElement('button')
    editCharacterBtn.id = 'edit-character-btn'
    editCharacterBtn.textContent = 'Edit Character'
    editCharacterBtn.addEventListener('click', () => editCharacterForm())

    divCharacter.append(img, editCharacterBtn, h3, h5, pPersonal, pHobbies, pCp, h5AN, ul)
    divC.append(divCharacter)
    divDisplay.append(divC)
}

function buildActivityLi(activity, ul) {
    let li = document.createElement('li')
    li.setAttribute('data-activity-id', activity.id)
    li.textContent = `Name: ${activity.name}`

    ul.append(li)
}

function buildActivity(activity) {
    let div = document.createElement('div')
    div.id = 'activity-list'

    let activityAttribute = activity.attributes
    let divActivity = document.createElement('div')
    divActivity.id = activity.id
    let ul = document.createElement('ul')

    let h3 = document.createElement('h3')
    let p = document.createElement('p')


    h3.textContent = `Name: ${activityAttribute.name}`
    p.textContent = `Description: ${activityAttribute.description}`

    let h5Event = document.createElement('h5')
    let pEvent = document.createElement('p')
    h5Event.textContent = 'Event'
    pEvent.textContent = activityAttribute.event.name

    divActivity.append(h3, p, h5Event, pEvent)
    div.append(divActivity)
    divDisplay.append(div)


}

function buildEvent(event) {
    let div = document.createElement('div')
    div.id = 'event-list'
    let divEvent = document.createElement('div')
    divEvent.id = event.id

    let eventAttribute = event.attributes

    let ul = document.createElement('ul')

    let h2 = document.createElement('h2')
    let pDesc = document.createElement('p')
    let pVenue = document.createElement('p')
    let pLocation = document.createElement('p')
    let pDate = document.createElement('p')
    let pTime = document.createElement('p')

    h2.textContent = `Name: ${eventAttribute.name}`
    pDesc.textContent = `Description: ${eventAttribute.description}`
    pVenue.textContent = `Venue: ${eventAttribute.venue}`
    pLocation.textContent = `Location: ${eventAttribute.location}`
    pDate.textContent = `Date: ${eventAttribute.date}`
    pTime.textContent = `Time: ${eventAttribute.time}`

    let h5AN = document.createElement('h5')
    h5AN.textContent = 'Actvities in This Event'
    eventAttribute.activities.forEach(activity => buildActivityLi(activity, ul))

    divEvent.append(h2, pDesc, pVenue, pLocation, pDate, pTime, h5AN, ul)
    div.append(divEvent)
    divDisplay.append(div)
}

function buildForm() {
    divDisplay.innerHTML = ''
    let formItems = ['image', 'name', 'nickname', 'personality', 'hobbies', 'catchphrase']

    let form = document.createElement('form')
    let h2 = document.createElement('h2')
    let submit = document.createElement('input')

    h2.textContent = 'Add Characters'
    submit.type = 'submit'

    form.appendChild(h2)

    formItems.forEach(item => {
        let label = document.createElement('label')
        let input = document.createElement('input')
        label.for = item
        label.textContent = item
        input.type = 'text'
        input.name = item
        input.placeholder = item

        form.append(label, input)

    })
    form.append(submit)
    divDisplay.append(form)

    form.addEventListener('submit', (e) => handleFormSubmit(e))

}

// function buildEditForm() {

// }