import { pool } from './Configuration.js';  // Your existing database connection

export async function describeAllTables() {
  try {
    // Get all table names from the current database
    const [tables] = await pool.query("SHOW TABLES");

    // Loop through each table and describe it
    for (let i = 0; i < tables.length; i++) {
      const tableName = Object.values(tables[i])[0];  // Get the table name
      console.log(`\nSchema for table: ${tableName}`);
      
      // Fetch and display the table schema using DESCRIBE
      const [tableSchema] = await pool.query(`DESCRIBE ${tableName};`);
      console.table(tableSchema);
    }
  } catch (error) {
    console.error("Error describing tables: ", error);
  }
}

// Call the function to describe all tables
// describeAllTables();
