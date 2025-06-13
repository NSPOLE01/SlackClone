const buildMessageHtml = (data) =>
  ` <li>
      <div class="user-image">
        <img src="${data.avatar}" />
      </div>
      <div class="user-message">
        <div class="user-name-time">
          ${data.userName} <span>${new Date(data.date).toLocaleString()}</span>
        </div>
        <div class="message-text">${data.newMessage}</div>
      </div>
    </li>`;
