//comic_settings.js was created by geno7, with much needed assistance from Dannarchy

//this is the main file you'll be messing with to manage and update your comic. most (not all) of the toggle-able settings are here

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 5; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files. 
//MUST UPDATE NUMBER MANUALLY EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

//this is what controls how many image files each comic page is split into, as well as what you want the alt text (text that appears upon mouseover) of each page to be.
//for those uninterested in alt text or image subdivision, DELETE everything between the first opening and closing brackets (so it says pgData = [];)
const pgData = [
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

//

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
