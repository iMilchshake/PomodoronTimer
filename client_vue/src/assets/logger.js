console.log('logger ran!')

// this kind of mocks a future database
export let clientside_storage = [];

export const addFinishObject = async function(t) {
    clientside_storage.push(t);
    console.log(clientside_storage);
}



