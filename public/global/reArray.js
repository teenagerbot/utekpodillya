function RewriteArray(arr = [], oldElem = "", newElem = "") {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === oldElem) {
            arr[i] = newElem;
        }
    }
    return arr;
}