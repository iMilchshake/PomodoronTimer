console.log('logger ran!')
console.log("x:", new Date().getTimezoneOffset());

// this kind of mocks a future database
export let clientside_storage = [];

export const addFinishObject = async function(t) {
    clientside_storage.push(t);
    console.log(clientside_storage);
}



