import mysql from "mysql2/promise";

import { PoolConnection } from "mysql2/promise";
let pool: mysql.Pool;

// Helper function to get a connection from the pool, execute a single query, and release it
export async function executeQuery<T>(query: string, values: any[] = []) {
  const pool = getDatabasePool();
  let connection: PoolConnection | undefined;
  try {
    connection = await pool.getConnection();
    const [rows]: any = await connection.execute(query, values);
    return rows;
  } catch (error) {
    console.error("Error executing query:", query, values, error);
    throw error;
  } finally {
    if (connection) {
      connection.release(); // always release the connection back to the pool
    }
  }
}
export async function initializeDatabase() {
  try {
    pool = mysql.createPool({
      uri: process.env.JAWSDB_URL,
      waitForConnections: true,
      connectionLimit: 8,
      queueLimit: 0,
    });

    //  Test connection
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log(
      "Database connection pool established and tested successfully."
    );
  } catch (error) {
    console.error("Failed to initialize database connection pool:", error);
    process.exit(1);
  }
}

// This function provides the pool to other modules
export const getDatabasePool = () => {
  if (!pool) {
    throw new Error(
      "Database pool not initialized. Call initializeDatabase() first."
    );
  }
  return pool;
};
