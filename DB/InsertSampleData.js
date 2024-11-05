import { 
    insertUserData,
    insertSubjects,
    insertLabBatches,
    insertLectureBatches,
    insertStudentsSubjects,
    insertTimetableEntries
} from "./InsertData.js";

import { registerUser } from "./UserOperations.js";


// Function to add sample data to the database
export async function addSampleData() {
    try {
        await registerUser('rishi.tiku@spit.ac.in', '1234');
        await registerUser('arsh.raina@spit.ac.in', '1234');

        // Insert Students
        await insertUserData([
            [1, 2021700067, 'Rishi Tiku', 7, 4],
            [2, 2021600053, 'Arsh Raina', 7, 3],
        ]);

        // Insert Subjects
        await insertSubjects([
            [1, 'BDA'], 
            [2, 'NLP'],
            [3, 'CA'],
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
                [2021700067, 1, 0, 4],
                [2021700067, 3, 0, 1],
                [2021600053, 2, 0, 1],
                [2021600053, 3, 0, 1],
            ]
        )

        // Insert Timetable Entries
        await insertTimetableEntries([
            ['10:30:00', '12:30:00', 'Tuesday',   1, null, 3,    '404'    ], // BDA - C
            ['13:30:00', '15:30:00', 'Thursday',  1, null, 4,    '404'    ], // BDA - D
            ['13:30:00', '15:30:00', 'Wednesday', 3, 0,    null, '405'    ], // CA - Common
            ['15:30:00', '17:30:00', 'Tuesday',   3, null, 1,    '406 - A'], // CA - Batch O
            ['13:30:00', '15:30:00', 'Tuesday',   2, 0,    null, '405'    ]  // NLP - Common
        ]);

        console.log('Sample data inserted successfully.');
    } catch (error) {
        console.error('Error inserting sample data: ', error);
    }
}

// Call the function to add sample data
// addSampleData();
