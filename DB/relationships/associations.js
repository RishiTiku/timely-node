import { UserData } from "../models/user_data.js";
import { Users } from "../models/users.js";
import { LabBatches } from "../models/lab_batches.js";
import { LectureBatches } from "../models/lecture_batches.js";
import { StudentsSubjects } from "../models/students_subjects.js";
import { Subjects } from "../models/subjects.js";

UserData.belongsTo(Users, { foreignKey: 'id' });
Users.hasOne(UserData, { foreignKey: 'id' });

// Subject Relationships
LabBatches.belongsTo(Subjects, { foreignKey: 'SubjectID', onDelete: 'CASCADE' });
LectureBatches.belongsTo(Subjects, { foreignKey: 'SubjectID', onDelete: 'CASCADE' });
StudentsSubjects.belongsTo(Subjects, { foreignKey: 'SubjectID', onDelete: 'CASCADE' });

// Additional Relationships
StudentSubject.belongsTo(Users, { foreignKey: 'id', onDelete: 'CASCADE' });
StudentsSubjects.belongsTo(LabBatches, { foreignKey: 'LabBatchID' });
StudentsSubjects.belongsTo(LectureBatches, { foreignKey: 'LectureBatchID' });
Timetable.belongsTo(LabBatches, { foreignKey: 'LabBatchID' });
Timetable.belongsTo(LectureBatches, { foreignKey: 'LectureBatchID' });
