
// Function that detects whether
// localStorage is both supported and available
// from MDN Web Docs

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}

function addItemToLocalStorage(key, value) {
    if (storageAvailable("localStorage")) {
        localStorage.setItem(key, value);
        console.log("Item successfully set in localStorage!");
    } else {
        console.error("Local storage is not available.");
    }
}

function removeItemFromLocalStorage(key) {
    if (storageAvailable("localStorage")) {
        localStorage.removeItem(key)
        console.log("Item successfully removed from localStorage!");
    } else {
        console.error("Local storage is not available.");
    }
}

function getItemFromLocalStorage(key) {
    if (storageAvailable("localStorage")) {
        const value = localStorage.getItem(key)
        console.log("Item successfully retrieved from localStorage!")
        return value;
    } else {
        console.error("Local storage is not available.");
    } 
}

export {addItemToLocalStorage, removeItemFromLocalStorage, getItemFromLocalStorage};
