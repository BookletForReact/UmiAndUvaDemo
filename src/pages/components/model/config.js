export const setLongScrollTop = () => {
  setTimeout(() => {
    const chatBox = document.getElementById('chat-box')
    chatBox.scrollTop = chatBox.scrollHeight
  })
}