export function getHydraItemById(collection, id) {
    return collection["hydra:member"].find(item => item["@id"] === id);
}

export function getHydraItemByName(collection, name) {
    return collection["hydra:member"].find(item => item.name.toLowerCase() === name.toLowerCase());
}

export function getHydraItemByDbId(collection, id) {
    return collection["hydra:member"].find(item => item.id === id);
}