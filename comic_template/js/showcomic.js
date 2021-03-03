//showcomic.js, by Dannarchy & geno7

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 5; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files. 
//MUST UPDATE NUMBER MANUALLY EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

const pgAltSplit = [
  [1, "Here's some Alt Text!"],
  [2, "Here's some more alt text"],
  [1, "Here's a third helping of alt text"],
];

//SETTINGS
const folder = "comics"; //name of the folder where you keep all the comics
const image = "pg"; //what you'll name all your comic pages
const imgPart = "_" //special character you put after the page number to subdivide pages into multiple image files (ie pg2_1, pg2_2, etc)
const ext = "png"; //file extension of your comic pages

if (pg == 0) {pg = maxpg;} //display MOST RECENT COMIC when the webpage is loaded. if you want to instead have the FIRST COMIC displayed first, change maxpg to 1.

//ACTUALLY SHOWING THE COMICS AND NAV ON THE PAGE
writeNav(); //show navigation at the top of the comic

writePageClickable(true); //show the current page. to toggle whether pages can be clicked to move to the next one, set this to true or false.

writeNav(); //show navigation at the bottom of the comic

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
      `<a href="?pg=` + (pg + 1) + `"/>` + writePage() + `</a><br/>`
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

//NAV
function writeNav() { //this is a function that writes both the top and bottom nav buttons
  //FIRST BUTTON
  if (pg > 1) { //wait until page 2 to make button active
  document.write(`<a href="?pg=` + 1 + `"/>First</a>`);
  } else {
  document.write(`First`);
  }

  document.write(` | `); //divider

  //PREV BUTTON
  if (pg > 1) { //wait until page 2 to make button active
  document.write(`<a href="?pg=` + (pg - 1) + `"/>Prev</a>`);
  } else {
  document.write(`Prev`);
  }

  document.write(` | `); //divider

  //NEXT BUTTON
  if (pg < maxpg) { //only make active if not on the last page
    document.write(`<a href="?pg=` + (pg + 1) + `"/>Next</a>`);
  } else {
  document.write(`Next`);
  }

  document.write(` | `); //divider

  //LAST BUTTON
  if (pg < maxpg) { //only make active if not on last page
  document.write(`<a href="?pg=` + maxpg + `"/>Last</a> <br />`);
  } else {
  document.write(`Last <br />`); //note that line breaks are added after each document.write, mainly to correctly place the top nav
  }
}

//KEYBOARD NAVIGATION
function keyNav() {
  document.addEventListener("keydown", (e) => {
  if ((e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') && pg < maxpg) { //right arrow or D goes to next page
    window.location.href = "?pg=" + (pg + 1);
  } else if ((e.key == "ArrowLeft" || e.key.toLowerCase() == "a") && pg > 1) { //left arrow or A goes to previous page
    window.location.href = "?pg=" + (pg - 1);
  } else if (e.key.toLowerCase() == "w") { //W scrolls up
    window.scrollBy({ top: -30 });
  } else if (e.key.toLowerCase() == "s") { //S scrolls down
    window.scrollBy({ top: 30 });
  }
});};
