export const setSession = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}
export const getSession = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}
export const removeSession = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
export const saveData = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
export const getData = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}
