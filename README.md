# Task and User Management System
A comprehensive role-based management system for tasks and users, catering to three roles: Admin, Manager, and Employee. The application allows efficient task delegation and user management with specific functionalities tailored for each role.

## Features: Role-Based Permissions

### Admin: Full control over users and tasks.
#### Permissions: 
- View, Add, Edit, and Delete Users.
- View, Add, Edit, and Delete Tasks.

### Manager: Manage tasks assigned to their team and view user details.
#### Permissions:
- View Users.
- View, Add, and Edit Tasks.

### Employee: Limited access to their tasks.
#### Permissions:
- View assigned tasks.
- Update the status of their tasks.

## How It Works:

#### Admin Panel: Allows full control over the user and task management.

Admin can:
- Add, Edit, and Delete both users and tasks.
- View detailed reports on the system's status.

#### Manager Panel: Designed for task management within the team.

Manager can:
- View the list of users.
- Add new tasks or edit existing tasks.
- View tasks assigned to their team members.

#### Employee Panel: The simplified interface shows only tasks assigned to the logged-in employee.

Employee can:
- View task details.
- Update task status to reflect progress.

## Steps to Run the Project

1. Prerequisites
- Node.js installed on your system.
- JSON Server for mocking the backend.
  
2. Clone the Repository
```
   git clone <repository_url>
   cd <project_directory>
```

3. Install Dependencies
   ``` npm install ```

5. Start the JSON Server
- Create a db.json file in the root directory with the following structure:
- Start the JSON Server: 
``` npx json-server --watch db.json --port 5000 ``` 

5. Start the React Application
npm start
This will start the application at http://localhost:3000.

## Usage Instructions

### Login:
- Log in with the appropriate Admin, Manager, or Employee credentials.
- The UI dynamically adjusts based on the user's role.
![image](https://github.com/user-attachments/assets/218aea88-c096-47b3-9ab4-a2659977b796)
  
#### Admin Actions:
- Navigate to the Admin Panel to manage users and tasks.
- Perform Add, Edit, and Delete operations on users and tasks.
![image](https://github.com/user-attachments/assets/75317d47-66ec-4c4a-92e3-5562e5a433b5)


#### Manager Actions:
- View the list of team members and their tasks.
- Add new tasks or edit existing ones.
  ![image](https://github.com/user-attachments/assets/364e7e35-691e-4c1f-bf8e-6feef09ec646)

#### Employee Actions:
- View tasks assigned to you.
- Update the task status (e.g., Pending, In Progress, Completed).
![image](https://github.com/user-attachments/assets/05cd39a1-504d-4078-a886-af14725c1d21)

### Key Highlights
*Role-Based UI*: Dynamically adjusts based on the logged-in user's role.
*Task Delegation*: Assign tasks with deadlines and statuses to specific users.
*Permissions*: Granular access control ensures security and role-specific functionality.
*Enhanced Security with Encrypted Cookies*: This project incorporates secure storage and management of sensitive user data using AES encryption for cookies. This ensures that user details, such as authentication tokens, are encrypted before being stored and decrypted when accessed, providing an additional layer of security.

### Future Enhancements
- Implement a database instead of a mock JSON server.
