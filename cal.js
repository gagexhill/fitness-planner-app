// Function to calculate BMI
function calculateBMI() {
    var heightFeet = parseInt(document.getElementById("heightFeet").value);
    var heightInches = parseInt(document.getElementById("heightInches").value);
    var weightPounds = parseInt(document.getElementById("weightPounds").value);
  
    var totalHeightInInches = heightFeet * 12 + heightInches;
    var bmi = (weightPounds / (totalHeightInInches * totalHeightInInches)) * 703;
    document.getElementById("bmiResult").innerText = bmi.toFixed(1);
  
    // Update BMI categories based on the calculated BMI
    var categories = document.querySelectorAll(".result-section div");
    categories.forEach(function (category) {
      category.classList.remove("active");
    });
  
    if (bmi < 18.5) {
      categories[0].classList.add("active");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      categories[1].classList.add("active");
    } else if (bmi >= 25 && bmi <= 29.9) {
      categories[2].classList.add("active");
    } else {
      categories[3].classList.add("active");
    }
  }
  

// BMR Calculation Function
function calculateBMR() {
  var age = parseInt(document.getElementById('bmr-age').value);
  var heightFeet = parseInt(document.getElementById('bmr-height-feet').value);
  var heightInches = parseInt(document.getElementById('bmr-height-inches').value);
  var weight = parseInt(document.getElementById('bmr-weight').value);
  var gender = document.getElementById('bmr-gender').value;

  var heightInCm = (heightFeet * 30.48) + (heightInches * 2.54);
  var bmr;

  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * heightInCm) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * heightInCm) - (4.330 * age);
  }

  document.getElementById('bmr-result').innerText = 'Your BMR is: ' + bmr.toFixed(2);
  return bmr; // For use in the calorie counter
}

// Calorie Counter Calculation Function
function calculateCalories() {
  var activityLevel = document.getElementById('calories-activity-level').value;
  var bmr = calculateBMR(); // This will call the BMR calculation function

  var activityFactors = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'veryActive': 1.9
  };

  var caloriesNeeded = bmr * activityFactors[activityLevel];
  document.getElementById('calories-result').innerText = 'Daily Calories needed: ' + caloriesNeeded.toFixed(2);
}

  
  // Reset the calculator inputs and results
  function resetCalculators() {
    document.getElementById("bmiForm").reset();
    document.getElementById("bmrForm").reset();
    document.getElementById("caloriesForm").reset();
    document.getElementById("bmiResult").innerText = "";
    document.getElementById("bmrResult").innerText = "";
    document.getElementById("caloriesBurntResult").innerText = "";
  
    var categories = document.querySelectorAll(".result-section div");
    categories.forEach(function (category) {
      category.classList.remove("active");
    });
  }
