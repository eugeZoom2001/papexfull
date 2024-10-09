const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

const myFunc = async () => {
  await myPromise;
  import("./module/functions.js")
    .then((module) => {
      let sum = module.suma(3, 4);
      console.log("resutado", sum);
      module.writediv();

      console.log("fin");
    })
    .catch((err) => {});
};

myFunc();
