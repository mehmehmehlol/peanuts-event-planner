const BASE_URL = "http://localhost:3000"
const CHARACTERS_URL = `${BASE_URL}/characters`
const ACTIVITIES_URL = `${BASE_URL}/activities`
const EVENTS_URL = `${BASE_URL}/events`



// const sideBarLi = document.querySelectorAll('.leftcol ul li')
// sideBarLi.addEventListener('click', displayCharacters())

// const clearHTML = () => {
//     let divDisplay = document.querySelector('.display')
//     divDisplay.innerHTML = ''

// }


// fetch

getCharacters(CHARACTERS_URL)
getActivities(ACTIVITIES_URL)
getEvents(EVENTS_URL)

function getCharacters(url) {
    fetch(url)
        .then(res => res.json())
        .then(characters => characters.data.forEach(character => {
            buildCharacter(character)
        }))
}

function getActivities(url) {
    fetch(url)
        .then(res => res.json())
        .then(activities => activities.data.forEach(activity => buildActivity(activity)))

}

function getEvents(url) {
    fetch(url)
        .then(res => res.json())
        .then(events => events.data.forEach(event => buildEvent(event)))
}


// DOM Events
function buildCharacter(character) {
    let div = document.querySelector('#character-list')
    let divCharacter = document.createElement('div')

    divCharacter.id = character.id

    let characterAttribute = character.attributes

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
    // need a button here to edit and delete the characters
    divCharacter.append(img, h3, h5, pPersonal, pHobbies, pCp)
    div.append(divCharacter)
}

function buildActivity(activity) {
    let div = document.querySelector('#activity-list')
    let divActivity = document.createElement('div')
    divActivity.id = activity.id

    let activityAttribute = activity.attributes

    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    let pEvents = document.createElement('p')

    h3.textContent = `Name: ${activityAttribute.name}`
    p.textContent = `Description: ${activityAttribute.description}`

    divActivity.append(h3, p)
        // div.append(divActivity)

    // activity.events.forEach
}

function buildEvent(event) {
    let div = document.querySelector('#event-list')
    let divEvent = document.createElement('div')
    divEvent.id = event.id

    let eventAttribute = event.attributes

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

    divEvent.append(h2, pDesc, pVenue, pLocation, pDate, pTime)
        //     div.append(divEvent)
}