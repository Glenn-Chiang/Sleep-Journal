export const formatDate = (timestamp: Date) => {
  return timestamp.toLocaleDateString(undefined, {weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'})
}

export const formatTime = (timestamp: Date) => {
  return timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
}