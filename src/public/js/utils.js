// actualiza hacia abajo el scroll de los mensajes
export const updateScroll = () => {
  var element = document.getElementById("messages");
  element.scrollTop = element.scrollHeight;
};

// Evitar insersión de código html
export const escapeHtml = (text) => {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};
