$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let userId;
  console.log(userId)
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    userId = data.id;
    console.log(userId);
  });

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
    $.get(`/api/punches/${userId}`).then(response => {
      var mapArray = []
      response.forEach(element => {
        var day = moment(element.updatedAt).format("dddd");
        var hour = moment(element.updatedAt).format("LT");
        mapArray.push({
          day: hour
        })
      });
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'bar',
        data: mapArray,
      })
    }
// function getPunches() {
//   $.get(`/api/punches/${email}`).then(response => console.log(response))
// }

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
          .catch(err => console.log(err))
      }

});
