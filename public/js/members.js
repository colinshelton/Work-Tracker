$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let userId;
  console.log(userId)
  $.get("/api/user_data").then(data => {
    $(".member - name").text(data.email);
    userId = data.id;
    console.log(userId);
  })
  $("#clockIn").on("click", function () {
    punch(true)
  })
  $("#clockOut").on("click", function () {
    punch(false)
  })
  $("#getPunches").on("click", function () {
    console.log("punches")
    getPunches()
  })
  function getPunches() {
    $.get(`/api/punches/${userId}`)
      .then(response => {
        let charData = []; // y values for the chart datasets number of hours
        let charDay = []; // x values or days labels
        let backgroundColors = [];
        let borderColors = [];
        let currentDate;
        let oldDate = null;
        let timeIn = null;
        let timeOut = null;
        let totalHours = 0;
        let times = false; // switch to know if I got alredy clock in and clock out
        let duration;
        response.forEach((element) => {
          currentDate = moment(element.updatedAt).format("L"); // thursday, friday, monday
          //pushing day into array if it does not exists
          if (charDay.indexOf(currentDate) === -1) {
            if (oldDate) {
              charData.push(totalHours);
              backgroundColors.push(`rgba(54, ${totalHours * 100}, 153, 0.5)`)
              borderColors.push(`rgba(153, 162, ${totalHours * 100}, 1)`)
              totalHours = 0;
            }
            charDay.push(currentDate);
          }
          //punch in
          if (element.punch) {
            timeIn = moment(element.updatedAt);
          }
          //punch out same day
          if (!element.punch) {
            times = true;
            timeOut = moment(element.updatedAt);
          }
          if (currentDate === oldDate) {
            if (times) {
              times = false;
              duration = moment.duration(timeOut.diff(timeIn));
              totalHours += duration.asHours();
              console.log(totalHours);
            }
          } else {
            if (times) {
              totalHours = Math.abs(timeOut.getTime() - timeIn.getTime());
              charData.push(totalHours);
              times = false
            }
          }
          oldDate = moment(element.updatedAt).format("L");
        });
        charData.push(totalHours);
        backgroundColors.push(`rgba(255, ${totalHours * 100}, 132, 0.5)`)
        borderColors.push(`rgba(255, 99, ${totalHours * 100}, 1)`)
        let ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: charDay,
            datasets: [{
              label: "Hour Worked",
              data: charData,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
      })
  }

  function punch(inOut) {
    console.log(userId);
    // console.log(email)
    $.post("/api/punch", {
      userId: parseInt(userId),
      // email: parseVar(email)
      punch: inOut
    })
      .then((res) => {
        console.log(res);
        console.log(res.updatedAt);
        // window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => {
        console.log(err);
      });
  }; //inOut close
});