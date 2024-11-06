import { 
    insertStudentData,
    insertSubjects,
    insertLabBatches,
    insertLectureBatches,
    insertStudentsSubjects,
    insertTimetableEntries,
    insertFacultyData
} from "./InsertData.js";

import { registerUser } from "./UserOperations.js";


// Function to add sample data to the database
export async function addSampleData() {
    try {
        await registerUser('rishi.tiku@spit.ac.in', '1234', 'S');
        await registerUser('arsh.raina@spit.ac.in', '1234', 'S');
        await registerUser('aparna_halbe@spit.ac.in', '1234', 'F');
        await registerUser('pramod_bide@spit.ac.in', '1234', 'F');
        await registerUser('dd_ambavade@spit.ac.in', '1234', 'F');
        await registerUser('deepak_karia@spit.ac.in', '1234', 'F');

        // Insert Students
        await insertStudentData([
            [1, 2021700067, 'Rishi Tiku', 7, 4, 2025],
            [2, 2021600053, 'Arsh Raina', 7, 3, 2025],
        ]);

        await insertFacultyData([
            [3, 'AH', 'Aparna Halbe', '6th-flr - StaffRoom'],
            [4, 'PB', 'Pramod Bide', null],
            [5, 'DDA', 'Dayanand Ambavade', '410-C'],
            [6, 'DCK', 'Deepak Karia', '302' ]
        ]);

        // Insert Subjects
        await insertSubjects([
            ['BDA'], 
            ['NLP'],
            ['CA'],
        ]);

        // Insert Batches
        await insertLabBatches([
            [1, 0, 'All'], [1, 1, 'A'], [1, 2, 'B'], [1, 3, 'C'], [1, 4, 'D'],
            [2, 0, 'All'], [2, 1, 'A'], [2, 2, 'B'], [2, 3, 'C'], [2, 4, 'D'],
            [3, 0, 'All'], [3, 1, 'O'], [3, 2, 'A'], [3, 3, 'P'],
        ]);

        await insertLectureBatches([
            [1, 0, 'All'],
            [2, 0, 'All'],
            [3, 0, 'All']
        ])

        //Insert StudentSubject Entries
        await insertStudentsSubjects([
                [1, 1, 0, 4],
                [1, 3, 0, 1],
                [2, 2, 0, 1],
                [2, 3, 0, 1],
            ]
        )

        // Insert Timetable Entries
        await insertTimetableEntries([
            ['10:30:00', '12:30:00', 'Tuesday',   1, null, 3,    '404'    , 3], // BDA - C
            ['13:30:00', '15:30:00', 'Thursday',  1, null, 4,    '404'    , 3], // BDA - D
            ['13:30:00', '15:30:00', 'Wednesday', 3, 0,    null, '405'    , 5], // CA - Common
            ['15:30:00', '17:30:00', 'Tuesday',   3, null, 1,    '406 - A', 5], // CA - Batch O
            ['13:30:00', '15:30:00', 'Tuesday',   2, 0,    null, '405'    , 4], // NLP - Common
            ['13:30:00', '15:30:00', 'Tuesday',   1, 0,    null, '407'    , 3]  // BDA - Common 
        ]);

        console.log('Sample data inserted successfully.');
    } catch (error) {
        console.error('Error inserting sample data: ', error);
    }
}

// Call the function to add sample data
// addSampleData();
