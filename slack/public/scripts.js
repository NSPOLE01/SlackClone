const userName = "Nikhil";
const password = "X";

const socket = io("http://localhost:9000");

const nameSpaceSockets = [];
const listeners = {
  nsChange: [],
  messageToRoom: [],
};

let selectedNsId = 0;

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  console.log(newMessage, selectedNsId);
  nameSpaceSockets[selectedNsId].emit("newMessageToRoom", {
    newMessage,
    date: Date.now(),
    avatar: "https://via.placeholder.com/30",
    userName,
    selectedNsId,
  });
  document.querySelector("#user-message").value = "";
});

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on("nsChange", (data) => {
      console.log("Namespace changed:", data);
    });
    listeners.nsChange[nsId] = true;
  }
  if (!listeners.messageToRoom[nsId]) {
    nameSpaceSockets[nsId].on("messageToRoom", (data) => {
      console.log(data);
      document.querySelector("#messages").innerHTML += buildMessage(data);
    });
    listeners.messageToRoom[nsId] = true;
  }
};

socket.on("connect", () => {
  console.log("Connected");
  socket.emit("clientConnect");
});

socket.on("nsList", (nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector(".namespaces");
  nameSpacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" /></div>`;

    if (!nameSpaceSockets[ns.id]) {
      nameSpaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
    }
    addListeners(ns.id);
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        console.log(element);
        joinNs(element, nsData);
      });
    }
  );
  joinNs(document.getElementsByClassName("namespace")[0], nsData);
});

const buildMessage = (data) =>
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
