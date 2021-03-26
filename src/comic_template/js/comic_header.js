//the header of the site would be handled in this javascript file, so you don't have to copypaste it onto every page.
//There are much better methods of handling the header out there but you can stick with this one if you want
document.write(`
    <header>
        <a href="home.html"><img src="./img/logo.png" alt="" /></a> 

        <div id="nav">
            <a href="home.html">HOME</a> |
            <a href="archive.html">ARCHIVE</a> |
            <a href="characters.html">CHARACTERS</a>
        </div>
    </header>
`);