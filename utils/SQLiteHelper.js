// SQLiteHelper.js
import { promisify } from './promisify.js';

export default class SQLiteHelper {
  constructor(databaseName, tableName) {
    this.databaseName = databaseName;
    this.tableName = tableName;
    this.db = null;
  }
  
  async init() {
	  console.log(!this.db)
    if (!this.db) {
      const start = Date.now();
	console.log("====")
	console.log(plus.sqlite)
	try {
	  const openDatabasePromise = promisify(window.plus.sqlite.openDatabase);
	} catch (error) {
	  console.error('Error creating promisified openDatabase function:', error);
	}
      this.db = await promisify(plus.sqlite.openDatabase)({
        name: this.databaseName,
        path: '_doc/' + this.databaseName + '.db',
        success(res) {
          console.log('Database opened successfully:', res);
        },
        fail(err) {
          console.error('Failed to open database:', err);
        },
      });
	console.log(this.db)
      const elapsed = Date.now() - start;
      console.log(`Database initialization took ${elapsed}ms`);
    }
  }

 //  async init() {
	//   console.log("qqqqqqq")
 //    if (!this.db) {
	// 	 console.log("qqqqqqqqqqqqqqq")
 //      this.db = await promisify(plus.sqlite.openDatabase)({
 //        name: this.databaseName,
 //        path: '_doc/' + this.databaseName + '.db',
 //        success(res) {
 //          console.log('Database opened successfully:', res);
 //        },
 //        fail(err) {
 //          console.error('Failed to open database:', err);
 //        },
 //      });
	//    console.log(this.db)
 //    }
	// console.log(this.db)
 //  }

  async executeSql(sql, params = []) {
	  console.log(sql)
	  console.log(params)
    if (!this.db) {
      throw new Error('Database not initialized.');
    }

    const executeSqlPromise = promisify(this.db.executeSql.bind(this.db));
    try {
      const result = await executeSqlPromise(sql, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing SQL:', sql, params, error);
      throw error;
    }
  }

  async createTable() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER,
        price REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await this.executeSql(createTableSQL);
    console.log(`Table "${this.tableName}" created or already exists.`);
  }

  async insert(material) {
    const insertSQL = `INSERT INTO ${this.tableName} (name, quantity, price) VALUES (?, ?, ?)`;
    await this.executeSql(insertSQL, [material.name, material.quantity, material.price]);
    console.log('Material inserted:', material);
  }

  async update(materialId, updates) {
    const updateSQL = `UPDATE ${this.tableName} SET name = ?, quantity = ?, price = ? WHERE id = ?`;
    await this.executeSql(updateSQL, [updates.name, updates.quantity, updates.price, materialId]);
    console.log('Material updated:', updates);
  }

  async delete(materialId) {
    const deleteSQL = `DELETE FROM ${this.tableName} WHERE id = ?`;
    await this.executeSql(deleteSQL, [materialId]);
    console.log('Material deleted:', materialId);
  }

  async queryAll() {
    const selectSQL = `SELECT * FROM ${this.tableName}`;
    const materials = await this.executeSql(selectSQL);
    return materials;
  }
}