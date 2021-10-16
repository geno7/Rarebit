//comic_archive.js was created by geno7

//Writing sections of the archive page involves 2 steps:
//first, use the writeArchive function in this .js file. set the parameters (the stuff inside the parenthesis, comma separated) to toggle options.
//then, to place that section of the archive on the html page, you'd make a div, and give that div a class name of whatever you've called that section of the archive in the first parameter.
//if you put anything in that div, the list of comics will get appended after it. i.e. you can put the title of that specific section as a header in that div. 

writeArchive(
    "chrono", //class of the div that you want this section of the archive to appear in. to have it be on your html page, make an empty div with this class.
    1, //earliest page to list
    maxpg, //latest page to list. setting to maxpg will make it automatically update with the latest page
    -1, //if set to 0, list is displayed "latest first". if set to -1, list is displayed chronologically
    true, //if set to true, each comic will have its own thumbnail image next to it. if a comic doesn't have its own thumbnail, it'll be set to the default thumbnail.
    true //if set to true, each comic will have a display number
);

writeArchive("lastfirst", 1, maxpg, 0, true,true);

writeArchive("chapter1",1,3,-1,false,true) //writeArchive is for listing a RANGE of pages, take advantage of this by using headers to divide them into chapters or by month

writeArchive("chapter2", 4, 9, -1, false,false);

writeArchive("chapter3", 9, 12, -1, false,false);

writeArchive("chapter4", 13, 15, -1, false,false);

//below this point is stuff you don't really need to pay attention to if you're not super familiar with JS 

function writeArchive(divClass, min, max, reverseOrder, useThumbs,useNums) {
    //create a table to put the archive data
    let archiveTable = document.createElement("TABLE");
    archiveTable.setAttribute("class", "archiveTable"); //set class to archiveTable for css styling
    let getDiv = document.getElementsByClassName(divClass)[0]; //get div class
    getDiv.appendChild(archiveTable);
    //make the table from the currently available comics
    for (i = min; i <= max; i++) {
        let row = archiveTable.insertRow(reverseOrder); //if reverseOrder is set to 0 it'll reverse the order, otherwise it'll display it in regular order

        //insert table cells
        let cellThumb = useThumbs ? row.insertCell() : 0; //only insert thumbs and number rows if useThumbs and useNums are toggled respectively
        let cellNum = useNums ? row.insertCell() : 0;

        let cellTitle = row.insertCell();
        let cellDate = row.insertCell();

        //default values when you don't have page data set
        let pgTitle = "Page " + i;
        let pgDate = "";
        let pgNum = "";

        //url of thumbnail
        let pgThumb = thumbFolder + "/" + image + i + "." + thumbExt;
        //url of default thumbnail
        let pgThumbDefault = thumbFolder + "/" + thumbDefault + "." + thumbExt;

        if (pgData.length >= i) {
            //set values to the values indicated in the pgData object if available
            if (pgData[i - 1].title) {
                pgTitle = pgData[i - 1].title;
            }
            if (pgData[i - 1].date) {
                pgDate = pgData[i - 1].date;
            }
            if (pgData[i - 1].date) {
                pgDate = pgData[i - 1].date;
            }
            if (pgData[i - 1].pgNum) {
                pgNum = pgData[i - 1].pgNum;
            }
        }

        //make the whole row a clickable link to the corresponding comic
        row.setAttribute("class", `archiveRow`);

        let linkToComic = `${indexPage}?pg=${i + navScrollTo}`;

        row.addEventListener("click", () => {
            window.location.href = linkToComic;
        });

        if (useThumbs) {
            //draw thumbnails if you have thumbnails toggled
            cellThumb.innerHTML = `<img alt="${pgTitle}" title="${pgTitle}" src="${pgThumb}" onerror="javascript:this.src='${pgThumbDefault}'"/>`;
            cellThumb.setAttribute("class", "archiveCellThumb");
        }

        if (useNums) {
            //same for numbers
            cellNum.innerHTML = `<span><strong>${pgNum}</strong></span>`;
            cellNum.setAttribute("class", "archiveCellNum");
        }

        //draw each row
        cellTitle.innerHTML = `<span><strong>${pgTitle}</strong></span>`;
        cellTitle.setAttribute("class", "archiveCellTitle");
        cellDate.innerHTML = "<span> " + pgDate + " </span>";
        cellDate.setAttribute("class", "archiveCellDate");
        console.log(i + `created row - ${pgTitle} - ${linkToComic}`);

        //left align text if not using thumbnails
        cellTitle.className += " leftAlignTableText";
    }
}