function isNonemptyObj(obj: Record<string, any>) {
    for (var x in obj) { if (obj.hasOwnProperty(x))  return true }
    return false
}

export {
    isNonemptyObj
} 