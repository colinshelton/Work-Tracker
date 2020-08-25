$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let userId;
  console.log(userId)
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    userId = data.id
  });

  $("#clockIn").on("click", function() {
    punch(true)
  })

  $("#clockOut").on("click", function() {
    punch(false)
  })

  $("#getPunches").on("click", function() {
    console.log("punches")
    getPunches()
  })

  function getPunches() {
    $.get(`/api/punches/${userId}`).then(response => console.log(response))
  }

  function punch(inOut) {
    console.log(userId)
    $.post("/api/punch", {
      userId: parseInt(userId),
      punch: inOut
    })
      .then((res) => {
        console.log(res)
        //window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => console.log(err)) 
  }

});
