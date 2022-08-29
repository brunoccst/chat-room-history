export const formatToTimeOnly = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })
}