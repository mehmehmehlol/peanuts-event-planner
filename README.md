# peanuts-event-planner


// User Stories

As a user, I can create a new friend for Snoopy
As a user, I can read about Snoopy and his friends along with the participated fall activities.
As a user, I can update the information of Snoopy and his friends, as well as the characters I create.
As a user, I can delete character cards if I don't like it, and delete a fall activity from a character
Bonus: add a favorite character button.

// Models and Controllers

Models:

Snoopy and his friends
Fall Activities (has many characters)
Events
character_activity
Relationships:

Snoopy and his friends has many fall activities

Each individual fall activity has many characters that can participate.

Events joins Snoopy and his friends and fall activities together, and it belongs to each character and belongs to each activity.

has many activities.
activity -> event_id events character has many activities, activity has many characters join: character_activity
