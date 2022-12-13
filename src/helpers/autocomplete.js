export default function autocomplete(textInput, arr) {

    let currentFocus;
    textInput.addEventListener("input", function(e) {
      let createMainDiv, createSecondaryDiv, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      createMainDiv = document.createElement("DIV");
      createMainDiv.setAttribute("id", this.id + "autocomplete-list");
      createMainDiv.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(createMainDiv);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].coin.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          createSecondaryDiv = document.createElement("DIV");
          createSecondaryDiv.innerHTML = "<strong>" + arr[i].coin.substr(0, val.length) + "</strong>";
          createSecondaryDiv.innerHTML += arr[i].coin.substr(val.length);
          createSecondaryDiv.innerHTML += "<input type='hidden' value='" + arr[i].coin + "'>";
          createSecondaryDiv.addEventListener("click", function(e) {
            textInput.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });
          createMainDiv.appendChild(createSecondaryDiv);
        }
      }
    });
    textInput.addEventListener("keydown", function(e) {
        let findId = document.getElementById(this.id + "autocomplete-list");
        if (findId) findId = findId.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(findId);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(findId);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (findId) findId[currentFocus].click();
          }
        }
    });
    function addActive(findId) {
      if (!findId) return false;
      removeActive(findId);
      if (currentFocus >= findId.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (findId.length - 1);
      findId[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(findId) {
      for (var i = 0; i < findId.length; i++) {
        findId[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var findId = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < findId.length; i++) {
        if (elmnt != findId[i] && elmnt != textInput) {
        findId[i].parentNode.removeChild(findId[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
