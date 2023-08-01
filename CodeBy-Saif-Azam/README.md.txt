Name and Email Management Application
The Name and Email Management Application is a simple CRUD (Create, Read, Update, Delete) web application that allows users to manage names and email addresses. The application is built using React on the front-end and Node.js with Express on the back-end. It stores the data in a local file (data.txt) on the server.

Features
Add Name and Email: Users can add new names and email addresses to the database by entering the details through a user-friendly form.
View Names and Emails: The application provides a table view to display all the entered names and email addresses.
Edit Name and Email: Users can edit the details of an existing name or email address.
Delete Name and Email: Users can delete a name and email address from the database.

Front-End (React)
The front-end of the application is built using React. The following components are used:
UserForm: This component allows users to enter new names and email addresses. It includes form fields for the name and email. On submission, the data is sent to the back-end for storage.
UserTable: This component displays all the stored names and email addresses in a tabular format. It provides options to edit or delete individual records.
App: The main component that renders both UserForm and UserTable. It also manages the state of the data fetched from the back-end.

Back-End (Node.js with Express)
The back-end of the application is built using Node.js with Express. The following API endpoints are used:

GET /show: This endpoint sends the stored name and email data as a JSON response to the front-end. It reads the data from the data.txt file using fs.readFileSync, parses it into a JSON array, and sends it as the response.
POST /submit: This endpoint receives data from the front-end when a user adds a new name and email address. The data is then stored in the back-end data file (data.txt) using the fs.appendFile method.
POST /edit: This endpoint receives data from the front-end when a user updates an existing name or email address. The back-end finds the record with the matching ID in the data, updates its details, and writes the updated data back to the data.txt file using fs.writeFileSync.
POST /delete: This endpoint receives the ID of the record to delete from the front-end. The back-end reads the data from the data.txt file, finds the record with the matching ID, removes it from the data, and writes the updated data back to the file.

Installation and Setup
To run the Name and Email Management Application, follow these steps:

Open the terminal and navigate to the project directory.
Install the required dependencies for the front-end and back-end using npm install.
Start the back-end server by running node app.js in the terminal.
Start the React development server by running npm start.
The application will open in your default web browser at http://localhost:3000.

Conclusion
The Name and Email Management Application provides a simple and efficient way to manage names and email addresses. Users can easily add, view, edit, and delete records. With React on the front-end and Express on the back-end, the application ensures a smooth user experience while securely storing the data on the server.