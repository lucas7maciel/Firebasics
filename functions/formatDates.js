export function formatCreatedAt(dt) {
  return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`
}

export function formatLastLogin(dt) {
  return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()} `
         `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
}