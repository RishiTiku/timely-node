import { pool } from './Configuration.js';

export const createTableUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );`,
      (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

export const createTableUserTokens = () => {
  return new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE user_tokens (
                  user_id INT NOT NULL,
                  access_token VARCHAR(512) NOT NULL,
                  refresh_token VARCHAR(512) NOT NULL,
                  access_token_expires TIMESTAMP NOT NULL,
                  refresh_token_expires TIMESTAMP NOT NULL,
                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                );`,
      (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

export const createTableUserData = () => {
  return new Promise((resolve, reject) => {
    pool.query(`CREATE TABLE user_data (
                  id INT NOT NULL,
                  college_uid BIGINT,
                  name VARCHAR(255),
                  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
              );`,
      (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}


export const createTableStudents = () => {
    return new Promise((resolve, reject) => {
      pool.query(`CREATE TABLE Students
        (UID INT PRIMARY KEY, 
        Name VARCHAR(255) NOT NULL);`,
        (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
};

export const createTableSubjects = () => {
    return new Promise((resolve, reject) => {
      pool.query(`CREATE TABLE Subjects 
        (SubjectID INT PRIMARY KEY,
        SubjectName VARCHAR(255) NOT NULL);`,
        (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
};

export const createTableBatches = () => {
    return new Promise((resolve, reject) => {
      pool.query(`CREATE TABLE Batches (
                    SubjectID INT,
                    BatchID INT,
                    BatchName VARCHAR(255) NOT NULL,
                    PRIMARY KEY (SubjectID, BatchID),
                    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE
                  );`,
        (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
};

export const createTableStudentsSubjects = () => {
  return new Promise((resolve, reject) => {
      pool.query(`
          CREATE TABLE IF NOT EXISTS Students_Subjects (
              UID INT NOT NULL,
              SubjectID INT NOT NULL,
              BatchID INT NOT NULL,
              PRIMARY KEY (UID, SubjectID, BatchID), -- Composite primary key to ensure uniqueness
              FOREIGN KEY (UID) REFERENCES Students(UID) ON DELETE CASCADE,
              FOREIGN KEY (SubjectID, BatchID) REFERENCES Batches(SubjectID, BatchID) ON DELETE CASCADE
          );
      `, (error, results) => {
          if (error) return reject(error);
          resolve(results);
      });
  });
};


export const createTableTimetable = () => {
  return new Promise((resolve, reject) => {
      pool.query(`
          CREATE TABLE IF NOT EXISTS Timetable (
              TimetableID INT PRIMARY KEY AUTO_INCREMENT,
              StartTime TIME NOT NULL,
              EndTime TIME NOT NULL,
              Day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
              SubjectID INT NOT NULL,
              BatchID INT NOT NULL,
              RoomNumber VARCHAR(255),
              FOREIGN KEY (SubjectID, BatchID) REFERENCES Batches(SubjectID, BatchID) ON DELETE CASCADE, -- Composite foreign key
              UNIQUE (StartTime, EndTime, Day, SubjectID, BatchID)
          );
      `, (error, results) => {
          if (error) return reject(error);
          resolve(results);
      });
  });
};

  
export async function createTables(){
  try{
    await createTableStudents();
    await createTableSubjects();
    await createTableBatches();
    await createTableTimetable();
    await createTableStudentsSubjects();
    console.log('All tables created successfully!');
  }
  catch (err){
    console.log('Error: ', err);
  }
}