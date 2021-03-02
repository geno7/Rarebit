//SETUP
function findGetParameter(parameterName) { //function used to write a parameter to append to the url, to give each comic page its own unique url
    let result = null, //set result to null temporarily
    tmp = []; 
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    console.log(result);
    return result;
}

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number
let maxpg = 5; //maximum number of pages; MUST UPDATE MANUALLY EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

if (pg == 0) { 
pg = maxpg; //display most recent comic page when the webpage is loaded. if you want to instead have the first page displayed first, change maxpg to 1.
}

//VARIABLES YOU CAN TWEAK
let folder = "comics"; //name of the folder where you keep all the comics
let image = "pg"; //what you'll name all your comic pages
let ext = "png"; //file extension of your comic pages
let path = (folder != "" ? folder + "/" : "") + image + pg + "." + ext; //string a bunch of those variables together to create a path to your current comic page

//ACTUALLY SHOWING THE COMICS AND NAV ON THE PAGE
writeNav(); //show navigation at the top of the comic

if (pg < maxpg) { //check whether comic is on the last page
  document.write(`<a href="?pg=` + (pg + 1) + `"/><img src="` + path + `"/></a><br/>`); //display comic page and make it so that clicking it will lead you to the next page
} else {
  document.write(`<img src="` + path + `"/><br/>`); //display comic page without link
};

writeNav(); //show navigation at the bottom of the comic

//NAV
function writeNav() { //this is a function that writes both the top and bottom nav buttons
  //FIRST BUTTON
  if (pg > 2) { //wait until page 3 to make button active
  document.write(`<a href="?pg=` + 1 + `"/>First</a>`);
  } else {
  document.write(`First`);
  }

  document.write(` | `); //divider

  //PREV BUTTON
  if (pg > 1) { //wait until page 2 to make active
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

  document.write(` | `);

  //LAST BUTTON
  if (pg < maxpg - 1) { //only make active if not on last page
  document.write(`<a href="?pg=` + maxpg + `"/>Last</a> <br />`);
  } else {
  document.write(`Last <br />`); //note that line breaks are added after each document.write, mainly to correctly place the top nav
  }
}

//KEYBOARD NAVIGATION
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
});

console.log(pg); //debug
