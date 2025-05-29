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
  nameSpacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" /></div>`;
    const thisNs = io(`http://localhost:9000${ns.endpoint}`);
    thisNs.on("nsChange", (data) => {
      console.log("Namespace changed:", data);
    });
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      console.log(element);
      element.addEventListener("click", (e) => {
        joinNs(element, nsData);
      });
    }
  );
  joinNs(document.getElementsByClassName("namespace")[0], nsData);
});
