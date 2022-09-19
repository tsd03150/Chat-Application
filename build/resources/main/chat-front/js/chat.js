const eventSource = new EventSource("http://localhost:8080/sender/kaveloper/receiver/cos");

eventSource.onmessage = (event) => {

    console.log(1, event);
    const data = JSON.parse(event.data);
    console.log(2, data);
    initMessage(data);
}


function getSendMsgBox(msg, time) {
    return `    
    <div class="sent_msg">
        <p>${msg}</p>
        <span class="time_date">${time}</span>
    </div>`
}

function initMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    chatOutgoingBox.innerHTML = getSendMsgBox(data.msg, data.createdAt);

    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

async function addMessage() {
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + " | " + date.getMonth() + "/" + date.getDate();

    let chat = {
        sender: "kaveloper",
        receiver: "cos",
        msg : msgInput.value
    };

    let response = await fetch("http://localhost:8080/chat", {
        method: "post",
        body: JSON.stringify(chat), // 자바스크립트 객체를 json 형태로 변환
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });

    let parseResponse = await response.json();

    // chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, now);
    // chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

document.querySelector("#chat-send").addEventListener("click", () => {
    addMessage()
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        addMessage()
    }
});