window.addEventListener("DOMContentLoaded", async () => {
    setPlaceholderPoll();
    document.querySelectorAll(".poll-option").forEach((opt) => {
        opt.addEventListener("click", (e) => {
            console.log(typeof e.target);
            if (String(e.target) != "input") {
                console.log(e.target.children("input"));
            }
        });
    });
})
function getPolls() {
    let items = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes("poll")) {
            items[key] = localStorage.getItem(key);
        }
    }
    return items;
}
function closePoll() {
    document.querySelector('.poll-widget').style.height = "0px";
    document.querySelector('.poll-widget').style.width = "0px";
    document.querySelector('.poll-widget').style.display = "none";
}
function changeQuestions() {
    document.querySelector(".questions-container").style.height = "100%";
    document.querySelector(".questions-container form").style.display = "flex";
    document.querySelector(".widget-body").style.height = "0%";
    document.querySelector(".widget-body").style.display = "none";
}
function generateId() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');
    var milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
    var dateTimeId = year + month + day + hours + minutes + seconds + milliseconds;
    return dateTimeId;
}
function savePoll(event) {
    event.preventDefault();
    var formData = new FormData(document.getElementById("add-question-form"));
    var formObject = {};
    formData.forEach(function (value, key) {
        formObject[key] = value;
    });
    var id = generateId();
    formObject.id = id;
    let pollAnswers = {};
    let count = 1;
    Object.keys(formObject).forEach((e) => {
        if (e.includes("poll-answer")) {
            formObject.options = { ...formObject.options, [count]: { text: formObject[e], votes: 0 } };
            count++;
            delete formObject[e];
        }
    });
    formObject.display = 0;
    if (formObject.question != "") {
        localStorage.setItem('poll-' + id, JSON.stringify(formObject));
    }
    document.querySelector(".questions-container").style.height = "0px";
    document.querySelector(".questions-container form").style.display = "none";
    document.querySelector(".widget-body").style.height = "100%";
    document.querySelector(".widget-body").style.display = "flex";
    setPoll("poll-"+id);
}
function setPoll(pollId) {
    let poll = JSON.parse(localStorage.getItem(pollId));
    console.log(poll);
    poll.display = 1;
    console.log(poll);
    document.querySelector(".poll-question").innerHTML = poll.question;
    document.querySelector("#poll-id").value = poll.id;
    document.querySelector(".poll-options").innerHTML = "";
    for (let i = 0; i < Object.values(poll.options).length; i++) {
        let optionText = Object.values(poll.options)[i].text;
        let optionValue = Object.keys(poll.options)[i];
        document.querySelector(".poll-options").innerHTML += `<li class="poll-option"><label><input type="radio" name="color" value="${optionValue}"">${optionText}</label></li>`
    };
    poll = JSON.stringify(poll)
    localStorage.setItem(pollId, poll);
}
function submitVote(event) {
    let pollId = document.querySelector("#poll-id").value;
    let poll = JSON.parse(localStorage.getItem("poll-" + pollId));
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    let selectedRadioButton = null;
    radioButtons.forEach(function (radioButton) {
        if (radioButton.checked) {
            selectedRadioButton = radioButton;
        }
    });
    let chosenAnswer = selectedRadioButton.value;
    poll.options[chosenAnswer].votes++;
    localStorage.setItem("poll-" + pollId, JSON.stringify(poll));
    displayResult();
}
function displayResult() {
    let pollId = document.querySelector("#poll-id").value;
    let poll = JSON.parse(localStorage.getItem("poll-" + pollId));
    let finalVotes = [];
    for (let i = 0; i < Object.values(poll.options).length; i++) {
        finalVotes.push(Object.values(poll.options)[i].votes);
    };
    let totalVoteCount = 0;
    for (let i = 0; i < finalVotes.length; i++) {
        totalVoteCount += finalVotes[i];
    }
    console.log(totalVoteCount);
    for (let i = 0; i < finalVotes.length; i++) {
        finalVotes[i] = Math.floor(finalVotes[i] * (100 / totalVoteCount));
    }
    console.log(finalVotes);
    let count = 0;
    document.querySelectorAll(".poll-option").forEach((opt) => {
        opt.innerHTML += `<progress id="file" value="${finalVotes[count]}" max="100"> ${finalVotes[count]}% </progress>`;
        count++;
    })
    document.querySelector(".poll-submit").style.display = "none";
    document.querySelectorAll("input[type='radio']").forEach((e) => { e.style.display = "none"; });
}
function changePoll() {
    let pollId = document.querySelector("#poll-id").value;
    const polls = { ...localStorage }
    console.log(polls);
    const pollIDs = Object.keys(polls);
    let filteredPolls = pollIDs.filter((poll) => {
        if (JSON.parse(polls[poll]).display == 0) {
            return poll;
        }
    })
    console.log(filteredPolls);
    let randomPoll = filteredPolls[Math.floor(Math.random() * filteredPolls.length)];
    if (randomPoll) {
        setPoll(randomPoll);
    } else {
        document.querySelector('.widget-main-container').innerHTML = "<p>No more polls!</p>"
    }
    document.querySelectorAll("input[type='radio']").forEach((e) => { e.style.display = "inline-block"; });
}