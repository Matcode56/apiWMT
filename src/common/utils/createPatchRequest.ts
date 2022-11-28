export const createPatchRequest = (nameTable: string, objectDB: object, id: number) => {
  const keysObject = Object.keys(objectDB)
  const keysObjectWithoutId = keysObject.filter(key => key !== 'id')

  const valuesToUpdate: string = keysObjectWithoutId.reduce((previousValue, currentKey) => {
    const queryUpdated = `${currentKey}= '${objectDB[currentKey]}',`

    return `${previousValue} ${queryUpdated}`
  }, '')

  return `UPDATE ${nameTable} SET ${valuesToUpdate.slice(0, valuesToUpdate.length - 1)} WHERE id=${id}`
}
