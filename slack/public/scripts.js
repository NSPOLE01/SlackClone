const userName = "Nikhil";
const password = "X";

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("Connected");
  socket.emit("clientConnect");
});

socket.on("nsList", (nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector(".namespaces");
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `<div class="namespace" data-ns="${ns.name}"><img src="${ns.image}" /></div>`;
  });
});
