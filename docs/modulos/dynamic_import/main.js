const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

const myFunc = async () => {
  await myPromise;
  import("./module/functions.js")
    .then((module) => {
      module.init();
    })
    .catch((err) => {});
};

myFunc();
