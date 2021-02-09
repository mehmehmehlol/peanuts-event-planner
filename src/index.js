const BASE_URL = "https://peanuts-event-planner-backend.herokuapp.com"
const CHARACTERS_URL = `${BASE_URL}/characters`
const ACTIVITIES_URL = `${BASE_URL}/activities`
const EVENTS_URL = `${BASE_URL}/events`

const divDisplay = document.querySelector('.display')


let addCharacterBtn = document.querySelector('#add-character-btn')
addCharacterBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    buildForm()
})


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
}

function handleUpdateFormSubmit(e, value) {
    e.preventDefault()
    let character = {
            image: e.target.image.value,
            name: e.target.name.value,
            nickname: e.target.nickname.value,
            personality: e.target.personality.value,
            hobbies: e.target.hobbies.value,
            catchphrase: e.target.catchphrase.value,
        }
    fetch(`${BASE_URL}/characters/${value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        })
        .then(res => res.json())
        .then(character => {
            let div = document.getElementById(`${value}`)
            div.innerHTML =
                `
            <img src=${character.data.attributes.image} class='character-avatar'>
            <button id="edit-character-btn">Edit Character</button>
            <button id="delete-character-btn">Delete Character</button>
            <h3>Name: ${character.data.attributes.name}</h3>
            <h5>Nickname: ${character.data.attributes.nickname}</h5>
            <p>Personality: ${character.data.attributes.personality}</p>
            <p>Hobbies: ${character.data.attributes.hobbies}</p>
            <p>Catchphrase: ${character.data.attributes.catchphrase}</p>
            <h5>Actvities Joined</h5>
            <ul></ul>
            `
        })
}


const characterBtn = document.querySelector('#characterBtn')
characterBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    divC.innerHTML = ''
    getCharacters()
})

const activityBtn = document.querySelector('#activityBtn')
activityBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    divA.innerHTML = ''
    getActivities()
})

const eventBtn = document.querySelector('#eventBtn')
eventBtn.addEventListener('click', () => {
    divDisplay.innerHTML = ''
    divE.innerHTML = ''
    getEvents()
})

// fetch
getCharacters();
getEvents();
getActivities();

function getCharacters() {
    fetch(CHARACTERS_URL)
    .then(res => res.json())
    .then(characters => {
        divDisplay.innerHTML = ''
        characters.data.forEach(character => buildCharacter(character))
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

function deleteCharacter(character, divCharacter) {
    console.log(character)
        //debugger
    fetch(`${CHARACTERS_URL}/${character.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            divCharacter.remove()
        })
}


// DOM Events
let divC = document.createElement('div')
divC.id = 'character-list'

function buildCharacter(character) {
    let divCharacter = document.createElement('div')
    divCharacter.id = character.id
    divCharacter.className = 'character_card'

    let characterAttribute = character.attributes
    let ul = document.createElement('ul')
    let h2Title = document.createElement('h2')

    let img = document.createElement('img')
    let h3 = document.createElement('h3')
    let h5 = document.createElement('h5')
    let pPersonal = document.createElement('p')
    let pHobbies = document.createElement('p')
    let pCp = document.createElement('p')

    h2Title.textContent = 'Character'
    img.src = characterAttribute.image
    img.className = 'character-avatar'
    h3.textContent = `Name: ${characterAttribute.name}`
    h5.textContent = `Nickname: ${characterAttribute.nickname}`
    pPersonal.textContent = `Personality: ${characterAttribute.personality}`
    pHobbies.textContent = `Hobbies: ${characterAttribute.hobbies}`
    pCp.textContent = `Catchphrase: ${characterAttribute.catchphrase}`

    let btnContainer = document.createElement('div')
        // need a button here to edit and delete the characters
    let editCharacterBtn = document.createElement('button')
    editCharacterBtn.id = 'edit-character-btn'
    editCharacterBtn.textContent = 'Edit Character'
    editCharacterBtn.addEventListener('click', () => buildEditForm(divCharacter, divCharacter.id))

    let deleteCharacterBtn = document.createElement('button')
    deleteCharacterBtn.id = 'delete-character-btn'
    deleteCharacterBtn.textContent = 'Delete Character'
    deleteCharacterBtn.addEventListener('click', () => deleteCharacter(character, divCharacter))

    // add activities each character join
    let h5AN = document.createElement('h5')
    h5AN.textContent = 'Actvities Joined'
    characterAttribute.activities.forEach(activity => buildActivityLi(activity, ul))

    btnContainer.append(editCharacterBtn, deleteCharacterBtn)
    divCharacter.append(h2Title, img, btnContainer, h3, h5, pPersonal, pHobbies, pCp, h5AN, ul)
    divC.append(divCharacter)
    divDisplay.append(divC)
}

function buildActivityLi(activity, ul) {
    let li = document.createElement('li')
    li.setAttribute('data-activity-id', activity.id)
    li.textContent = `${activity.name}`

    ul.append(li)
}

let divA = document.createElement('div')
divA.id = 'activity-list'

function buildActivity(activity) {

    let activityAttribute = activity.attributes
    let divActivity = document.createElement('div')
    divActivity.id = activity.id
    divActivity.className = 'activity_card'

    let ul = document.createElement('ul')
    let h2Title = document.createElement('h2')
    let h3 = document.createElement('h3')
    let p = document.createElement('p')

    h2Title.textContent = "Activity"
    h3.textContent = `Name: ${activityAttribute.name}`
    p.textContent = `Description: ${activityAttribute.description}`

    let h5Event = document.createElement('h5')
    let pEvent = document.createElement('p')
    h5Event.textContent = 'Event'
    pEvent.textContent = activityAttribute.event.name

    divActivity.append(h2Title, h3, p, h5Event, pEvent)
    divA.append(divActivity)
    divDisplay.append(divA)


}

let divE = document.createElement('div')
divE.id = 'event-list'

function buildEvent(event) {

    let divEvent = document.createElement('div')
    divEvent.id = event.id
    divEvent.className = 'event_card'

    let eventAttribute = event.attributes

    let ul = document.createElement('ul')
    let h2Title = document.createElement('h2')
    let h3 = document.createElement('h3')
    let pDesc = document.createElement('p')
    let pVenue = document.createElement('p')
    let pLocation = document.createElement('p')
    let pDate = document.createElement('p')
    let pTime = document.createElement('p')

    h3.textContent = `Name: ${eventAttribute.name}`
    h2Title.textContent = "Event"

    pDesc.textContent = `Description: ${eventAttribute.description}`
    pVenue.textContent = `Venue: ${eventAttribute.venue}`
    pLocation.textContent = `Location: ${eventAttribute.location}`
    pDate.textContent = `Date: ${eventAttribute.date}`
    pTime.textContent = `Time: ${eventAttribute.time}`

    let h5AN = document.createElement('h5')
    h5AN.textContent = 'Actvities in This Event'
    eventAttribute.activities.forEach(activity => buildActivityLi(activity, ul))

    divEvent.append(h2Title, h3, pDesc, pVenue, pLocation, pDate, pTime, h5AN, ul)
    divE.append(divEvent)
    divDisplay.append(divE)
}

// divDisplay.append(divC, divA, divE)

function buildForm() {
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

function buildEditForm(divCharacter, character_id) {
    // console.log(divCharacter)
    // debugger
    divCharacter.innerHTML = ''
    let formItems = ['image', 'name', 'nickname', 'personality', 'hobbies', 'catchphrase']

    let form = document.createElement('form')
    let h4 = document.createElement('h4')
    let submit = document.createElement('input')

    h4.textContent = 'Edit Characters'
    submit.type = 'submit'
    submit.value = 'Save'

    form.appendChild(h4)

    formItems.forEach(item => {
        let label = document.createElement('label')
        let input = document.createElement('input')
        label.for = item
        label.textContent = item
        input.type = 'text'
        input.name = item
        input.placeholder = item
        input.value = item

        form.append(label, input)

    })

    form.append(submit)
        // console.log(form)
    divCharacter.append(form)

    form.addEventListener('submit', (e) => handleUpdateFormSubmit(e, character_id))
}