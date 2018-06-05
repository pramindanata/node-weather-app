let getUser = (id, callback) => {
    let user = {
        id,
        name: 'EKsa'
    };

    callback(user);
};

getUser(2, (user) => {
    console.log(user);
});