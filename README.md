# Blackjack

## Motivations


### CSS Files


CSS files are created for individual components and placed in the same directory as the components. This aims to provide three things:
- Styles and components are close to each other, making it easier to update them together
- A single global css file doesn't grow big enough that it becomes hard to understand
- Accidental conflicts between similarly named classes in different components are avoided


### Component export
Components are exported at the root of the library via an index file. It is intended that pages import them this way rather than reference the component implementations directly. This ensures the project can be easily refactored should components need to be renamed or even extracted into their own external shared libraries. Structuring components this way is also consistent with most major public libraries.


### Object returned from `draw()` api
A new object is constructed and returned from the `draw()` function based on the payload rather than just returning the payload itself. This makes sure that any changes in the api are abstracted away from any component implementations, and any required refactors can be encapsulated inside the api module.


### Outcome Notification Color
The immediate expectation for a notification is that it should be green if something is successful and red if it isn't. However, casino games are designed to keep players engaged. A neutral color is chosen as the background for the notification message related to the game's outcome so that the player isn't unintentionally urged to stop playing.
