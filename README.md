# codeforces-stalk-webapp (Obselete)

## Warning ! ⚠️

- I made this project 2 years ago, when i knew nothing but jquery and basic api requests using fetch and jquery
- This project has a lot of loopholes and please donot use it for learning purposes
  - Example: It exceeds the api calls that can be made via frontend and a warning and error is generated in the console after large number of requests
- I don't have any free time to redo this project, But this is how i would redo the project now after 2 years if i had to do it
  - Move the entire services that perform API calls to the backend
  - Let the backend communicate with the frontend through server sent events or web sockets, it will push a new submission message, which the frontend will be handling

A simple web app to stalk you're friends on codeforces.

#### Checklist

- [x] Single user stalking feature
- [ ] Choosing the interval of making a request
- [ ] Add a contest mode
- [ ] Multiple user stalking feature
- [ ] BUG: Read about `Brower preventing the site to make requests after a certain limit`
- [ ] make a styling for `mainpage: index.html`
- [ ] Rewrite the code using Vanilla JS ES6 and using fetch API.
