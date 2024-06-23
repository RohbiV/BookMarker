// lets have some fun with JS

let inputSite = document.querySelector("#websiteName");
let inputURL = document.querySelector("#URL");

const btn = document.querySelector("#submit");
const container = document.querySelector(".inputcontainer");
const outerbx = document.querySelector(".outerbox");

let siteName, URLName;
let bookmarks = [];

inputSite.addEventListener("keyup", (e) => {
    siteName = inputSite.value;
    // console.log(siteName);
});

const validate = (url) => {
    //validation for url
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

inputURL.addEventListener("keyup", (e) => {
    URLName = inputURL.value;
    // fun();
});

// const fun = ()=>{
//     console.log(siteName);
//     console.log(URLName);
// };

const createBookmark = () => {
    if(!siteName || !URLName){
        alert("Enter proper values!");
        return;
    }

    const div = document.createElement("div"); //creating the upper div

    const divText = document.createTextNode(siteName); //creating item name
    div.append(divText);

    const visBtn = document.createElement("a"); // adding visit button
    visBtn.innerText = "visit";
    visBtn.className = "VisBtn";
    visBtn.href = URLName;
    div.append(visBtn);

    const delBtn = document.createElement("button"); //adding delete button
    delBtn.innerText = "Delete";
    div.append(delBtn);

    div.className = "items"; // adding the class name items to bookmarks

    container.insertAdjacentElement("afterend", div);

    // now adding functionality in delete button

    delBtn.addEventListener("click", (e) => {
        e.target.parentNode.remove();
    });


    
};

btn.addEventListener("click", () => {
    inputSite.blur();
    let isValid = validate(inputURL.value);

    if (isValid) {
        URLName = inputURL.value;
    } else {
        alert("Enter a valid URL");
        inputURL.value = "";
    }

    createBookmark();
    storeElem();
    inputSite.value = "";
    inputURL.value = "";
});




const saveData = (bookmark) =>{
    console.log(bookmarks); 
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
};

const getData = ()=>{
    if(localStorage.getItem("bookmarks") === null) {
        console.log("do nothing!");
    }
    else{
        var fetchdata = JSON.parse(localStorage.getItem("bookmarks"));
        fetchdata.forEach(element => {
        //    console.log(element.websitename);
        //    console.log(element.siteurl); 
        siteName = element.websitename;
        URLName = element.siteurl;
        createBookmark();
        saveData(element);
        });
    }
}


const storeElem = () =>{
    let bookmark = {    //storing in objects for further loading as object on local storage
        websitename: siteName,
        siteurl: URLName
    };
    saveData(bookmark);
};


getData();
