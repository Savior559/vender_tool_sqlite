// // main.js
// import Vue from 'vue';
// import App from './App.vue';
// import SQLiteHelper from './utils/SQLiteHelper.js'

// Vue.config.productionTip = false;

// async function checkPlusAvailability() {
//   if (typeof window !== 'undefined') {
//     if (!window.plus) {
//       console.error('Plus object is not available. Make sure plus plugin is installed and loaded correctly.');
//       return false;
//     }
//   }
// 	console.log(uni.getSystemInfoSync().platform)
//   return true;
// }

// async function bootstrap() {
//   const isPlusAvailable = await checkPlusAvailability();
//   console.log(isPlusAvailable);

//   if (isPlusAvailable) {
//     const databaseName = 'MyDatabase';
//     const tableName = 'Materials';
//     const dbHelper = new SQLiteHelper(databaseName, tableName);
//     console.log(dbHelper);
	
// 	// document.addEventListener('plusready', function() {
// 	//   // 在这里调用 plus api
	
// 	//   // 示例：使用 plus.device 获取设备信息
// 	//   const deviceInfo = plus.device.getInfo();
// 	//   console.log('Device Info:', deviceInfo);
	
// 	//    initializeDB();
	
// 	//   // 其他 plus api 的使用...
// 	// }, false);

//  //    async function initializeDB() {
// 	// 	console.log("qqqqq");
//  //      await dbHelper.init();
//  //      console.log("qqqqq");
//  //      await dbHelper.createTable();
//  //    }

   

//     const vuee = new Vue({
//       store,
//       router,
//       render: (h) => h(App),
//     }).$mount('#app');
// 	console.log(vuee)
//   } else {
//     // Plus 插件不可用时的处理逻辑，如显示错误提示或重定向到错误页面
//     console.error('Plus plugin is not available. The application cannot proceed.');
// 	console.log(plus)
//   }
// }

// bootstrap();
import Vue from 'vue';
import App from './App.vue';
import plus from '@dcloudio/uni-app-plus';

Vue.prototype.$plus = plus;
console.log(plus)
import Database from './utils/database.js';

Vue.config.productionTip = false;

(async () => {
  try {
    await Database.openDatabase();
    console.log('数据库已打开，准备初始化表结构...');

    // 初始化users表
    await Database.executeSQL(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    new Vue({
      render: (h) => h(App),
    }).$mount('#app');
  } catch (error) {
    console.error('初始化数据库时发生错误:', error);
  }
})();