let currentChannel = "#general";

let messages = {
    "#general": [
        {author: "xlays", text: "Hello everyone!", avatar: "avatars/avatar1.png"}
    ],
    "#memes": [
        {author: "Ana", text: "Check this meme 😂", avatar: "avatars/avatar2.png"}
    ],
    "#dev-log": [
        {author: "Botty", text: "Build 1.0 released", avatar: "avatars/avatar3.png"}
    ]
};

function loadMessages(channel) {
    const chat = document.getElementById("chat-messages");
    chat.innerHTML = "";
    messages[channel].forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message");
        msgDiv.innerHTML = `
            <img src="${msg.avatar}" onerror="this.style.backgroundColor='#7289da';">
            <div class="msg-text"><b>${msg.author}</b>: ${msg.text}</div>
        `;
        chat.appendChild(msgDiv);
    });
    chat.scrollTop = chat.scrollHeight;
}

function switchChannel(channel) {
    currentChannel = channel;
    document.querySelectorAll(".channel").forEach(ch => ch.classList.remove("active"));
    document.querySelector(`.channel:contains('${channel}')`)?.classList.add("active");
    document.getElementById("message-input").placeholder = "Message " + channel;
    loadMessages(channel);
}

function sendMessage() {
    const input = document.getElementById("message-input");
    const emojiPicker = document.getElementById("emoji-picker");
    const text = input.value + (emojiPicker.value || "");
    if (text.trim() === "") return;
    messages[currentChannel].push({author: "xlays", text: text, avatar: "avatars/avatar1.png"});
    input.value = "";
    loadMessages(currentChannel);
}

// Send message on Enter key
document.getElementById("message-input").addEventListener("keypress", function(e){
    if (e.key === "Enter") sendMessage();
});

window.onload = () => {
    loadMessages(currentChannel);
};
