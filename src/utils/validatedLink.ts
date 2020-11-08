const stringIsAValidUrl = async url => {
  try {
    await new URL(url)
    return true
  } catch (err) {
    return false
  }
}
export { stringIsAValidUrl }
