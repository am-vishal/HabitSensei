# HabitSensei

HabitSensei is a habit tracking web application that helps you achieve your goals and become the hero of your own Ninja journey.

## Tech Stack

### Front-End

- EJS
- Bootstrap 5
- fontawesome

### Back-End

- Node.js
- Express.js
- MongoDB
- Mongoose
- cors
- bodyParser

## Installation

1. Clone the repository: `git clone https://github.com/am-vishal/HabitSensei.git`
2. Navigate to the project directory: `cd HabitSensei`
3. Install the dependencies: `npm install`
4. Create a `.env` file in the root directory and add the following:
   MONGO_URI=<your-mongodb-uri>
5. Start the server: `npm start`
6. Open http://localhost:8000 in your browser.

## File Structure

├── config<br/>
│ ├── mongoose.js<br/>
├── models<br/>
│ ├── habitModel.js<br/>
├── routes<br/>
│ ├── habits.js<br/>
│ ├── index.js<br/>
├── views<br/>
│ ├── home.ejs<br/>
│ ├── weekly.ejs<br/>
├── index.js<br/>
├── package.json<br/>

## Usage

- Home page: `/`
  - Displays a list of habits and a form to add new habits.
- Weekly view: `/weekly`
  - Displays a list of habits with checkboxes to mark them as completed for the week.

## License

This project is licensed under the ISC License.
