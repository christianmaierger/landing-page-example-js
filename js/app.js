/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

let sectionDivList = document.getElementsByClassName("landing__container");
let currentSection;
let navbarCompleted;
let sectionNavBarCounter = 0;
const navbarUlElem = document.getElementById("navbar__list");
let navItemStringList = [];
let navItemElemList = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getSectionInViewport() {
    for (const containerInSection of sectionDivList) {


        if (isInViewport(containerInSection)) {

            let sectionElem = containerInSection.parentElement;

            console.log('This element will be returned: ' + sectionElem.id);
            currentSection = sectionElem;
            return sectionElem;
        }


    }
    console.log('NULL will be returned: ');
    return null;

}

function intervalHelper() {

    setInterval(checkFocusToUpdateSectionDesign, 300);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav



function buildNavBar() {

    for (const sectionElem of sectionDivList) {



        if (sectionElem !== "null" && typeof sectionElem !== "undefined") {

            const fragment = document.createDocumentFragment();

            const ulBullet = document.createElement('li');

            const sectionHeadingContent = sectionElem.querySelector("h2").innerHTML;

            const textOfParagraph = document.createTextNode(sectionHeadingContent);

            ulBullet.appendChild(textOfParagraph);


            if (typeof navItemStringList === "undefined" || !navItemStringList.includes(sectionHeadingContent)) {

                navItemStringList.push(sectionHeadingContent);
                navItemElemList.push(ulBullet);

                ulBullet.classList.add("navbar__menu");
                ulBullet.classList.add("menu__link");
                fragment.append(ulBullet);

            }

            navbarUlElem.append(fragment);

        }

    }

}


/* function checkFocusToBuildNavBar() {


   setTimeout(getSectionInViewport);

    section = currentSection;


    if (section !== "null" && typeof section !== "undefined") {


        const ulBullet = document.createElement('li');

        const sectionHeadingContent = section.querySelector("h2").innerHTML;

        const textOfParagraph = document.createTextNode(sectionHeadingContent);

        ulBullet.appendChild(textOfParagraph);


        if (typeof navItemList === "undefined" || !navItemList.includes(sectionHeadingContent)) {

            navItemList.push(sectionHeadingContent);
            ulBullet.classList.add("navbar__menu");
            ulBullet.classList.add("menu__link");
            navbarUlElem.append(ulBullet);

        }



        console.log('This element in the check has the focus: ' + section.id);


    }


}
 */





// Add class 'active' to section when near top of viewport and change the design to have moving circles behing section

function checkFocusToUpdateSectionDesign() {

    setTimeout(getSectionInViewport);

    let sectionElem = currentSection;

    if ((sectionElem !== "null") && (typeof sectionElem !== "undefined")) {

        console.log('This element is in focus and will be set active: ' + sectionElem.id);
        sectionElem.classList.add("active-section-body");


        headingToSearchForInNavBarLinks = sectionElem.querySelector("h2").innerHTML
        let index = navItemStringList.indexOf(headingToSearchForInNavBarLinks);
        if (index !== -1) {
            console.log(index);
            navItemElemList[index].classList.remove("menu__link");
            navItemElemList[index].classList.add("menu__link:hover");
        }

    }

    for (const sectionDiv of sectionDivList) {

        const section = sectionDiv.parentElement;

        if (section !== sectionElem) {

            console.log("remove from " + section.id);
            section.classList.remove("active-section-body");

            headingToSearchForInNavBarLinks = sectionDiv.querySelector("h2").innerHTML

            let index = navItemStringList.indexOf(headingToSearchForInNavBarLinks);
            if (index >= 0) {
                console.log(index);
                navItemElemList[index].classList.add("menu__link");
                navItemElemList[index].classList.remove("menu__link:hover");
            }

        }
    }
}




// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Check page focus every 300 milliseconds and build navbar from that

document.addEventListener("DOMContentLoaded", buildNavBar);




// Scroll to section on link click

// Set sections as active

document.addEventListener("DOMContentLoaded", intervalHelper);