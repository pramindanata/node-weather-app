let somePromise = new Promise((resolve, reject) => {
    resolve('Asyique');
});

let promise = (param) => {
    return new Promise((resolve, reject) => {

    });
}

somePromise.then(msg => {
    console.log(msg);
});