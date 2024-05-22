var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");

var validIconName = document.getElementById("validIconName");
var invalidIconName = document.getElementById("invalidIconName");

var validIconURL = document.getElementById("validIconURL");
var invalidIconURL = document.getElementById("invalidIconURL");

var checker = document.querySelector(".check-validity");

var submitBtn = document.getElementById("submitBtn");

var bookMarkerList = [];


// !========> Local Storage <========! //

if (localStorage.getItem("bookmark")) {
    bookMarkerList = JSON.parse(localStorage.getItem("bookmark"));
    display();
}

// !========> Add Site Object In List <========! //

function addWebsite() {
    var site = {
        name: siteName.value,
        link: siteURL.value
    };

    if (validName() && validURL(site.link)) {
        bookMarkerList.push(site);
        localStorage.setItem("bookmark", JSON.stringify(bookMarkerList));
    }
    else {
        checker.innerHTML =
        `
        <div class="modal fade show " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block;background-color:rgba(0,0,0,.5);">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content p-3">
            <div class="modal-header border-bottom-0 py-4">
            <i class="fa-solid fa-circle text-danger px-2 fs-5"></i>
            <i class="fa-solid fa-circle text-warning px-2 fs-5"></i>
            <i class="fa-solid fa-circle text-success px-2 fs-5"></i>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeChecker()"></button>
            </div>
            <div class="modal-body text-start ">
              <h5 class="fw-bold pb-3">Site Name or Url is not valid, Please follow the rules below:</h5>
              <p><i class="fa-regular fa-circle-right text-danger px-2 fs-5"></i>Site name must contain at least 3 characters</p>
              <p><i class="fa-regular fa-circle-right text-danger px-2 fs-5"></i>Site URL must be a valid one</p>
            </div>
          </div>
        </div>
      </div>
      `;
    }

    display();
    clearForm();
}


// !========> Checker Model Closer Function <========! //
function closeChecker() {
    checker.innerHTML = ``;
}


// !========> Display Bookmarks In Table <========! //

function display() {
    var tableRow = ``;

    for (var i = 0; i < bookMarkerList.length; i++) {
        tableRow += `
        <tr>
            <td>${i}</td>
            <td>${bookMarkerList[i].name}</td>
            <td>
                <button class="btn btn-visit" onclick="visitWebsite(${i})">
                <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
            </td>
            <td>
                <button class="btn btn-delete pe-2" onclick="deleteWebsite(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
                </td>
        </tr>
        `;
    }

    document.getElementById('myData').innerHTML = tableRow;
}


// !========> Clear Form Data After Submission <========! //

function clearForm() {
    siteName.value = null;
    siteURL.value = null;
}


// !========> Visit Website In New Tab <========! //

function visitWebsite(index) {
    if(bookMarkerList[index].link.startsWith('https://')){
        window.open(bookMarkerList[index].link, "_blank");
    }else{
        window.open('https://' + bookMarkerList[index].link, "_blank");
    }
}


// !========> Delete Website From List <========! //

function deleteWebsite(index){
    bookMarkerList.splice(index, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookMarkerList));
    display();
}


// !========> Check Website Name Validation <========! //

  function validName() {
    if (siteName.value.length < 3) {
        siteName.style.setProperty('--valid-box-shadow', '#ff00004c');
        siteName.style.setProperty('--valid-border', '#ff0000');
        validIconName.style.display = 'none';
        invalidIconName.style.display = 'block';
        return false;
    }
    else {
        siteName.style.setProperty('--valid-box-shadow', '#bfd3bb');
        siteName.style.setProperty("--valid-border", "#309263");
        validIconName.style.display = 'block';
        invalidIconName.style.display = 'none';
        return true;
    }
}


// !========> Check Website URL Validation <========! //
  function validURL(url) {
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null) {
        siteURL.style.setProperty('--valid-box-shadow', '#ff00004c');
        siteURL.style.setProperty('--valid-border', '#ff0000');
        validIconURL.style.display = 'none';
        invalidIconURL.style.display = 'block';
        return false;
    }
    else {
        siteURL.style.setProperty('--valid-box-shadow', '#bfd3bb');
        siteURL.style.setProperty("--valid-border", "#309263");
        validIconURL.style.display = 'block';
        invalidIconURL.style.display = 'none';
        return true;
    }
  }


// !========> Input Field Validation <========! //

siteName.addEventListener('keyup', function() {
    validName();
    if (siteName.value.length == 0) {
        siteName.style.setProperty('--valid-box-shadow', '#FEC26080');
        siteName.style.setProperty('--valid-border', '#cea363');
        validIconName.style.display = 'none';
        invalidIconName.style.display = 'none';
    }
});

siteURL.addEventListener('keyup', function() {
    validURL(siteURL.value);
    if (siteURL.value.length == 0) {
        siteURL.style.setProperty('--valid-box-shadow', '#FEC26080');
        siteURL.style.setProperty('--valid-border', '#cea363');
        validIconURL.style.display = 'none';
        invalidIconURL.style.display = 'none';
    }
});


// !========> Submit Button Validation <========! //

submitBtn.addEventListener('click', function() {
    addWebsite();

    siteName.style.setProperty('--valid-box-shadow', '#FEC26080');
    siteName.style.setProperty('--valid-border', '#cea363');
    validIconName.style.display = 'none';
    invalidIconName.style.display = 'none';
    validIconURL.style.display = 'none';
    invalidIconURL.style.display = 'none';

});
