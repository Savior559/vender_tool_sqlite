// promisify.js
function promisify(fn) {
	console.log(fn)
	console.log("aaaa")
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (result, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };

      args.push(callback); // 将回调函数追加到参数列表末尾

      fn.apply(this, args); // 使用 apply 调用原函数，确保上下文正确
    });
  };
}

export default promisify;