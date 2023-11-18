document.addEventListener("DOMContentLoaded", function () {
    var register = document.getElementById("register");
    var end = document.getElementById("endButton");
    var ageInput = document.getElementById("age");
    var userInfoArray = [];
    var userIndex = 0; 
    var gamingSection = document.getElementById("GamingSection");
    var registrationSection = document.getElementById("registrationSection");
    var allPlayers = document.getElementById("allPlayers");
    var isCompleted = false;
    var start = document.getElementById("start");
    gamingSection.style.display = "none";
    registrationSection.style.display = "flex";
    allPlayers.style.display ="none";
    ageInput.disabled = true;
    start.disabled = true;
    document.getElementById("DoBirth").addEventListener("change", function () {
        var DoBirth = document.getElementById("DoBirth").value;
        var currentDate = new Date();
        var dob = new Date(DoBirth);
        var age = currentDate.getFullYear() - dob.getFullYear();

        if (age >= 8 && age <= 12) {
            document.getElementById("Validator4").textContent = "✔";
            ageInput.value = age;
        }
    });

    document.addEventListener("input", function () {
        var fNameCheck = document.getElementById("Fname").value;
        var lNameCheck = document.getElementById("Lname").value;
        var emailCheck = document.getElementById("email").value;
        var genderCheckMale = document.querySelector('input[type="radio"][name="gender"]:checked');
        var genderCheckFemale = document.querySelector('input[type="radio"][name="gender"]:checked');

        if (fNameCheck.length > 3) {
            document.getElementById("Validator1").textContent = "✔";
        } else {
            document.getElementById("Validator1").textContent = "✖";
        }

        if (lNameCheck.length > 3) {
            document.getElementById("Validator2").textContent = "✔";
        } else {
            document.getElementById("Validator2").textContent = "✖";
        }

        if (emailCheck.toLowerCase().endsWith("@gmail.com")) {
            document.getElementById("Validator3").textContent = "✔";
        } else {
            document.getElementById("Validator3").textContent = "✖";
        }

        if (genderCheckMale || genderCheckFemale) {
            document.getElementById("Validator5").textContent = "✔";
        } else {
            document.getElementById("Validator5").textContent = "✖";
        }

        if (
            fNameCheck.length > 3 &&
            lNameCheck.length > 3 &&
            emailCheck.toLowerCase().endsWith("@gmail.com") &&
            (genderCheckMale || genderCheckFemale) &&
            document.getElementById("Validator4").textContent === "✔" // Age validator
        ) {
            register.disabled = false;
            return isCompleted = true;
        } 
    });

   
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        if (isCompleted) {
            Register();
            
            start.disabled = false
            localStorage.setItem('userInfoArray', JSON.stringify(userInfoArray));
            
            
            
          
        }
    });
    start.addEventListener("click", function(){
        
        register.disabled = true;
        gamingSection.style.display = "flex";
        registrationSection.style.display = "none";
        showAllStats();
        resetGame();
    });

  end.addEventListener("click", function () {
    register.disabled = false;
    localStorage.setItem('userInfoArray', JSON.stringify(userInfoArray));

    findPercentageScore();
    
    registrationSection.style.display = "none";

    setTimeout(function () {
        allPlayers.style.display = "none";
        gamingSection.style.display = "flex";
        setTimeout(function () {
            allPlayers.style.display = "block";
            gamingSection.style.display = "none";
            showAllStats();

            setTimeout(function () {
                registrationSection.style.display = "flex";
                allPlayers.style.display = "none";
            }, 10000);

        }, 10000);

    }, 10000);
});

    

   
function Register() {
    var Fname = document.getElementById("Fname").value;
    var Lname = document.getElementById("Lname").value;
    var DoBirth = document.getElementById("DoBirth").value;
    var currentDate = new Date();
    var dob = new Date(DoBirth);
    var age = currentDate.getFullYear() - dob.getFullYear();

    var gender = ""; // Default value, change accordingly

    // Get the selected gender value
    var genderInputs = document.querySelectorAll('input[type="radio"][name="gender"]:checked');
    if (genderInputs.length > 0) {
        gender = genderInputs[0].value;
    }

    var userInfo = {
        Fname: Fname,
        Lname: Lname,
        DoBirth: DoBirth,
        age: age,
        gender: gender, // Assign the gender value
        Questions: [],
        Answers: [],
        Status: [],
        Percentage: 0
    };
    userInfoArray.push(userInfo);
    userIndex = userInfoArray.length - 1;
}











    const storedUserInfo = JSON.parse(localStorage.getItem('userInfoArray')) || [];
    let questionCount = 1;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let showpercentage = 0;
    const incorrectEquations = [];
    let random1, random2, answer; 

    document.getElementById("status").disabled = true;

    function PlayGame() {
        random1 = Math.floor(Math.random() * 9) + 1;
        random2 = Math.floor(Math.random() * 5) + 1;
        answer = random1 * random2;
        document.getElementById("value1").textContent = random1;
        document.getElementById("value2").textContent = random2;
        document.getElementById("questionNumber").textContent = questionCount;

        questionCount++;
        return answer;
    }

    document.querySelector("#nextButton").addEventListener('click', function () {
        answer = PlayGame();
        document.getElementById("answer").value = ""; 
        document.getElementById("status").value = "";
    //    updatePlayerStats(); 
    });

    function resetGame() {
        document.getElementById("answer").value = ""; 
        document.getElementById("status").value = "";
        document.getElementById("correctAnswers").textContent = "";
        document.getElementById("totalQuestions").textContent = "";
        document.getElementById("incorrectAnswers").textContent = "";
        document.getElementById("showpercentage").textContent = "";
        playerNameCell.textContent = "";

    }



    
 

    function CheckAnswer() {
        let userAns = document.getElementById("answer").value.trim();
        if (userAns === "") {
            document.getElementById("status").value = "No number.";
            return;
        }
    
        var currentUser = userInfoArray[userIndex];
    
        // Ensure Status, Questions, and Answers are arrays
        currentUser.Status = currentUser.Status || [];
        currentUser.Questions = currentUser.Questions || [];
        currentUser.Answers = currentUser.Answers || [];
    
        if (answer === parseInt(userAns, 10)) {
            document.getElementById("status").value = "Correct Answer";
            correctAnswers++;
            currentUser.Status.push("Correct");
        } else {
            document.getElementById("status").value = "Incorrect Answer";
            incorrectAnswers++;
            incorrectEquations.push(`${random1} x ${random2} = ${userAns}`);
            currentUser.Status.push("Incorrect");
        }
        currentUser.Questions.push(`${random1} x ${random2}`);
        currentUser.Answers.push(userAns);
        // showAllStats();
    }
    
    
    
    
    
    document.getElementById("chkAnsButton").addEventListener('click', function () {
        CheckAnswer();
        showAllStats();
    });

    function findPercentageScore() {
        const playerNameCell = document.querySelector('#playerName');
    
        if (userInfoArray.length > 0 && userIndex < userInfoArray.length) {
            const currentUser = userInfoArray[userIndex];
            playerNameCell.textContent = `: ${currentUser.Fname} ${currentUser.Lname}`;
    
            showpercentage = (correctAnswers / (questionCount - 1)) * 100;
    
            document.getElementById("correctAnswers").textContent = correctAnswers;
            document.getElementById("totalQuestions").textContent = questionCount - 1;
            document.getElementById("incorrectAnswers").textContent = incorrectAnswers;
            document.getElementById("showpercentage").textContent = showpercentage;
    
            const textarea = document.getElementById('incorrectEquations');
            textarea.value = incorrectEquations.join('\n');
    
            // Update Percentage
            currentUser.Percentage = showpercentage;
            currentUser.correctAnswers = correctAnswers;
            currentUser.questionCount = questionCount - 1;
    
            // Handle Arrays by joining them
            currentUser.Questions = Array.isArray(currentUser.Questions) ? currentUser.Questions.join(', ') : '';
            currentUser.Answers = Array.isArray(currentUser.Answers) ? currentUser.Answers.join(', ') : '';
            currentUser.Status = Array.isArray(currentUser.Status) ? currentUser.Status.join(', ') : '';
    
            // Update the user information here
            localStorage.setItem('userInfoArray', JSON.stringify(userInfoArray));
        } else {
            playerNameCell.textContent = "No user found";
        }
    }
    

    
    PlayGame();









    function showAllStats() {
        var table = document.getElementById("showallplayers");

      
        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }

        userInfoArray.forEach(function (player) {
            var newRow = table.insertRow();

            newRow.insertCell(0).textContent = player.Fname;
            newRow.insertCell(1).textContent = player.Lname;
            newRow.insertCell(2).textContent = player.age;
            newRow.insertCell(3).textContent = player.Questions;
            newRow.insertCell(4).textContent = player.Answers;
            newRow.insertCell(5).textContent = player.Status;

          
            const percentageCell = newRow.insertCell(6);

            if (player.questionCount > 0) {
                const playerPercentage = (player.correctAnswers / player.questionCount) * 100;
                percentageCell.textContent = playerPercentage.toFixed(2) + '%';
            } else {
              
                percentageCell.textContent = '0%';
            }
        });
    }
    

    













    function showCharts() {
        var chartsContainer = document.getElementById("showcharts");
      
        chartsContainer.innerHTML = "";
      
        var maleCount = userInfoArray.filter(player => player.gender === "male").length;
        var femaleCount = userInfoArray.filter(player => player.gender === "female").length;
        var totalPlayers = userInfoArray.length;
      
        var malePercentage = (maleCount / totalPlayers) * 100;
        var femalePercentage = (femaleCount / totalPlayers) * 100;
      
        chartsContainer.innerHTML += `
          <div class="chart-container">
            <h3 class="chart-label header1">Gender Distribution</h3>
            <div class="chart">
              <label class="chart-label">Male:</label>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${malePercentage.toFixed(2)}%"></div>
              </div>
              <span class="percentage-text">${malePercentage.toFixed(2)}%</span>
            </div>
            <div class="chart">
              <label class="chart-label">Female:</label>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${femalePercentage.toFixed(2)}%"></div>
              </div>
              <span class="percentage-text">${femalePercentage.toFixed(2)}%</span>
            </div>
          </div>
        `;
      
        var percentageRanges = [50, 60, 70, 80, 90, 100];
        var rangeCounts = Array(percentageRanges.length).fill(0);
      
        userInfoArray.forEach(player => {
          var playerPercentage = player.Percentage;
      
          for (var i = 0; i < percentageRanges.length; i++) {
            if (playerPercentage <= percentageRanges[i]) {
              rangeCounts[i]++;
              break;
            }
          }
        });
      
        chartsContainer.innerHTML += `
          <div class="chart-container">
            <h3 class="chart-label header1">Percentage Score Distribution</h3>
            ${percentageRanges.map((range, index) => `
              <div class="chart">
                <label class="chart-label">${range}-${percentageRanges[index + 1] || 100}:</label>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${(rangeCounts[index] / totalPlayers) * 100}%"></div>
                </div>
                <span class="percentage-text">${((rangeCounts[index] / totalPlayers) * 100).toFixed(2)}%</span>
              </div>
            `).join('')}
          </div>
        `;
      }
      
      setInterval(showCharts, 5000);
      


    document.getElementById("percentageScoreButton").addEventListener("click", function () {
        findPercentageScore();
    });
    











 


    
});

