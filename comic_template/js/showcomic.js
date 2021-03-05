//showcomic.js was created by geno7, with much needed assistance from Dannarchy

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 5; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files. 
//MUST UPDATE NUMBER MANUALLY EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

//this is what controls how many image files each comic page is split into, as well as what you want the alt text (text that appears upon mouseover) of each page to be.
//for those uninterested in alt text or image subdivision, DELETE everything between the first opening and closing brackets (so it says pgAltSplit = [];)
const pgAltSplit = [
  [1, "Here's some Alt Text!"], //first page
  [2, "Here's some more alt text"], //second page
  [1, "Here's a third helping of alt text"], //third page, and so on
];
//if you are interested though, basically add the following onto a new line BEFORE the final closing bracket for every comic you add:
//[number of images, "alt text"],
//and edit accordingly

// COMIC PAGE SETTINGS
const folder = "img/comics"; //name of the folder where you keep all the comics
const image = "pg"; //what you'll name all your comic pages
const imgPart = "_" //special character(s) you put after the page number to subdivide pages into multiple image files (ie pg2_1, pg2_2, etc)
const ext = "png"; //file extension of your comic pages

//NAVIGATION SETTINGS
const navText = ["First","Previous","Next","Last"]; //alt text for your nav images, or just the text that shows up if you're not using images
const navFolder = "img/comicnav"; //directory where nav images are stored
const navExt = "png" //file extension of nav images
const navScrollTo = "#show-comic"; //id of the div you want the page to automatically scroll to when you click to the next comic. will turn off if you delete text between quotation marks

if (pg == 0) {pg = maxpg;} //display MOST RECENT COMIC when the webpage is loaded. if you want to instead have the FIRST COMIC displayed first, change maxpg to 1.

//ACTUALLY SHOWING THE COMICS AND NAV ON THE PAGE
writeNav(false); //show navigation at the top of the comic. to toggle either images or text for nav, set this to true or false.

writePageClickable(true); //show the current page. to toggle whether pages can be clicked to move to the next one, set this to true or false.

writeNav(true); //show navigation at the bottom of the comic. same as above.

keyNav(); //enables navigation through the comic with the arrow keys and WSAD. delete or comment out (add // at the beginning) to disable.

// below this point is more under-the-hood type stuff that we only encourage messing with if you're more familiar with js, 
// but it's still commented as extensively as possible anyway just in case

function findGetParameter(parameterName) { //function used to write a parameter to append to the url, to give each comic page its own unique url
    let result = null,
    tmp = []; 
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

//SHOW COMIC PAGE, with clickable link
function writePageClickable(clickable) {
  if (!clickable) {
    document.write(writePage() + `<br/>`); //display comic page without link
  } else if (pg < maxpg) {
    //check whether comic is on the last page
    document.write(
      `<a href="?pg=` + (pg + 1) + navScrollTo + `"/>` + writePage() + `</a><br/>`
    ); //display comic page and make it so that clicking it will lead you to the next page
  } else {
    document.write(writePage() + `<br/>`); //display comic page without link
  }
}

//function used to split pages into multiple images if needed, and add alt text
function writePage() {
  let partExtension = ""; //part extension to add to the url if the image is split into multiple parts
  let altText = ""; //variable for alt text
  let path = (folder != "" ? folder + "/" : "") + image + pg + partExtension + "." + ext; //path for your comics made out of variables strung together
  let page = ``;

  if (pgAltSplit.length < pg) { //if the array is blank or not long enough to have an entry for this page
    //debug
    console.log("page code to insert - " + page);
    console.log("alt text to print - " + altText);
    //
    page = `<img alt="` + altText + `" title="` + altText + `" src="` + path + `" />`;
    return page;
  } else if (pgAltSplit.length >= pg) { //if the array is not blank, and if its at least long enough to have an entry for the current page

    altText = pgAltSplit[pg - 1][1]; //set alt text to the text defined in the array

    if (pgAltSplit[pg-1][0] > 1) { //if theres more than one page segment
    for (let i = 1; i < pgAltSplit[pg-1][0]+1; i++) { //for loop to put all the parts of the image on the webpage
      partExtension = imgPart + i.toString();
      path = (folder != "" ? folder + "/" : "") + image + pg + partExtension + "." + ext; //reinit path (there has to be a less dumb way to do this)
      if (i > 1) {page += `<br/>`} //add line break
      page += `<img alt="` + altText + `" title="` + altText + `" src="` + path + `" />`; //add page segment
      }
    } else {
      page = `<img alt="` + altText + `" title="` + altText + `" src="` + path + `" />`;
    }
    //debug
    console.log("page code to insert - " + page);
    console.log("alt text to print - " + altText);
    //
    return page;
  }
}

//debug
console.log("array blank/not long enough? " + (pgAltSplit.length < pg));
console.log("array length - " + pgAltSplit.length);
console.log("current page - " + pg);
console.log("number of page segments - " + pgAltSplit[pg-1][0]);
console.log("alt text - " + `"` + pgAltSplit[pg - 1][1] + `"`);

console.log("nav text - " + navText);
console.log("nav image file extension - " + navExt);

function imgOrText(setImg,navTextSet) { //function that writes the indicated nav button as either an image or text

  if (setImg) { //if its an image
    return `<img src="` + navFolder + `/nav_` + navText[navTextSet].toLowerCase() + `.` + navExt + `" alt="` + navText[navTextSet] + `" />`;
  } else {
    return navText[navTextSet];
  }
}

function writeNav(imageToggle) { //this is a function that writes both the top and bottom nav buttons

  document.write(`<div class = comicnav>`) //opening div tag, give nav a class so it can be easily styled.

  //FIRST BUTTON
  if (pg > 1) { //wait until page 2 to make button active
  document.write(`<a href="?pg=` + 1 + navScrollTo + `"/>` + imgOrText(imageToggle,0) + `</a>`);
  } else {
  if (!imageToggle) {document.write(imgOrText(imageToggle,0))};
  }

  if (!imageToggle) {document.write(` | `);} //divider

  //PREV BUTTON
  if (pg > 1) { //wait until page 2 to make button active
  document.write(`<a href="?pg=` + (pg - 1) + navScrollTo + `"/>` + imgOrText(imageToggle,1) + `</a>`);
  } else {
  if (!imageToggle) {document.write(imgOrText(imageToggle,1))};
  }

  if (!imageToggle) {document.write(` | `);} //divider

  //NEXT BUTTON
  if (pg < maxpg) { //only make active if not on the last page
    document.write(`<a href="?pg=` + (pg + 1) + navScrollTo + `"/>` + imgOrText(imageToggle,2) + `</a>`);
  } else {
  if (!imageToggle) {document.write(imgOrText(imageToggle,2))};
  }

  if (!imageToggle) {document.write(` | `);} //divider

  //LAST BUTTON
  if (pg < maxpg) { //only make active if not on last page
  document.write(`<a href="?pg=` + maxpg + navScrollTo + `"/>` + imgOrText(imageToggle,3) + `</a> <br />`);
  } else {
  if (!imageToggle) {document.write(imgOrText(imageToggle,3))};
  document.write(`<br/>`) //note that line breaks are added after each document.write here, mainly to correctly place the top nav
  }

  document.write(`</div>`) //closing div tag
}

//KEYBOARD NAVIGATION
function keyNav() {
  document.addEventListener("keydown", (e) => {
  if ((e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') && pg < maxpg) { //right arrow or D goes to next page
    window.location.href = "?pg=" + (pg + 1) + navScrollTo;
  } else if ((e.key == "ArrowLeft" || e.key.toLowerCase() == "a") && pg > 1) { //left arrow or A goes to previous page
    window.location.href = "?pg=" + (pg - 1) + navScrollTo;
  } else if (e.key.toLowerCase() == "w") { //W scrolls up
    window.scrollBy({ top: -30 });
  } else if (e.key.toLowerCase() == "s") { //S scrolls down
    window.scrollBy({ top: 30 });
  }
});};
