const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'rootroot',
    database: 'meetup'
});

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS Inviter (
    inviter_id INT AUTO_INCREMENT PRIMARY KEY,
    inviter_name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(50),
    invited_by VARCHAR(50),
    FOREIGN KEY (invited_by) REFERENCES Inviter(inviter_name)
);

CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
);

CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(50),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
);
`;


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);

    connection.query(createTablesQuery, (err, results) => {
        if (err) {
            console.error('Error creating tables: ' + err.message);
        } else {
            console.log('Tables created successfully');
            insertData();
        }
    });
});

function insertData() {
    const insertQueries = [
        "INSERT INTO Inviter (inviter_name) VALUES ('Jimmy')",
        "INSERT INTO Inviter (inviter_name) VALUES ('Alice')",
        "INSERT INTO Inviter (inviter_name) VALUES ('Bob')",
        "INSERT INTO Inviter (inviter_name) VALUES ('Emma')",
        "INSERT INTO Inviter (inviter_name) VALUES ('David')",
        "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Michael', 'Jimmy')",
        "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Sarah', 'Jimmy')",
        "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Emily', 'Bob')",
        "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Ryan', 'David')",
        "INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Sophia', 'Emma')",
        "INSERT INTO Room (room_name, floor_number) VALUES ('Room A', 1)",
        "INSERT INTO Room (room_name, floor_number) VALUES ('Room B', 2)",
        "INSERT INTO Room (room_name, floor_number) VALUES ('Room C', 1)",
        "INSERT INTO Room (room_name, floor_number) VALUES ('Room D', 3)",
        "INSERT INTO Room (room_name, floor_number) VALUES ('Room E', 2)",
        "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Project Review', '10:00', '11:30', 1)",
        "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Team Standup', '09:00', '09:30', 2)",
        "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Training Session', '14:00', '16:00', 3)",
        "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Board Meeting', '15:30', '17:00', 4)",
        "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Client Presentation', '13:00', '14:30', 5)"
    ];

    insertQueries.forEach(query => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error inserting data: ' + err.message);
            }
        });
    });
}
