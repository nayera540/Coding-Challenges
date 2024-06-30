function getDaysName(index) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[index];
}

function getMonthsName(index) {
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthsOfYear[index];
}

function updateTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, '0');
  document.getElementById("time").innerText = `${(hours % 12) || 12}:${minutes}`;
}


setInterval(updateTime, 1000);

function updateDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let dayName = date.getDay();
  document.getElementById("date").innerText = `${getDaysName(dayName)}, ${getMonthsName(month)} ${day}`
}

updateDate();
// setInterval(updateDate, 1000); // 24 hours in milliseconds

function fetchDataFromProxy() {
  fetch("https://cors-anywhere.herokuapp.com/https://codingchallenges.substack.com/feed")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Read response body as text
    })
    .then((xml) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");

      // Extract the title elements
      const titleElements = xmlDoc.querySelectorAll("channel item title");

      console.log("Number of title elements:", titleElements.length);
      
      for (let i = 0; i < Math.min(titleElements.length, 4); i++) {
        console.log(titleElements[i].textContent);
      }

      // After fetching data, you can process it further or update your extension UI
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchDataFromProxy();



chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'index.html' });
});

