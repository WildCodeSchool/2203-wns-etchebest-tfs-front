
/**
 * Returns true if the object is empty
 * @param object 
 * @returns {boolean} 
 */

export function isEmpty(object:Object) {
  for (const _property in object) {
    return false;
  }
  return true;
}