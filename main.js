// lets have some fun with JS

let inputSite = document.querySelector("#websiteName");
let inputURL = document.querySelector("#URL");

const btn = document.querySelector("#submit");
const container = document.querySelector(".inputcontainer");
const outerbx = document.querySelector(".outerbox");

let siteName, URLName;

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

    storeElem();

    
};

let bookmark;

const storeElem = () =>{
    bookmark = {    //storing in objects for further loading as object on local storage
        websitename: siteName,
        siteurl: URLName
    };
    saveData(bookmark);
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
    inputSite.value = "";
    inputURL.value = "";
});
let  bookmarks;
const saveData = (bookmark) => {     //storing data on local storage
    bookmarks = [];              
    bookmarks.push(bookmark); // creating array of objects
    localStorage.setItem("bookmark", JSON.stringify(bookmark)); //storing  as string
};

const getData = () => {             //fetching from local storage
    if (localStorage.getItem("bookmark") !== null) {           //cheking if localStorage is empty for bookmark name
        bookmarks = JSON.parse(localStorage.getItem("bookmark")); // again converting it into json format (array of objects)
        const arr = [];
        arr.push(bookmarks);
        console.log(arr);

        arr.forEach((bookmark)=>{     //now looping through each element for call
            siteName = bookmark.websitename;
            URLName = bookmark.siteurl;
            createBookmark();        //now calling the function to create bookmark
        });


        storeElem();
        
        // // siteName = siteData[0];
        // // URLName = siteData[1];
        // createBookmark();
    }
    else{
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        bookmarks.push(bookmark);
    }
};

getData();
