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
let sectionElemList = [];
const navbarUlElem = document.getElementById("navbar__list");
let navItemStringList = [];
let navItemElemList = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */



// helper to return true f the element is in the viewport, otherwise returns false
function isInViewport(element) {

    // in rect the position and releative distance to 0 point of view port coordination system is stored
    const rect = element.getBoundingClientRect();
    return (
        // conditions are true if element is on the screen to the or better to say not further away from top of screen then 150 up from the top and 250 down
        rect.top >= -150 && rect.top <= 250
    );
}


// tests all content sections of the page and returns which one of them is in the view port, if none is visable, null is returned
function getSectionInViewport() {
    for (const containerInSection of sectionDivList) {


        if (isInViewport(containerInSection)) {

            let sectionElem = containerInSection.parentElement;

            currentSection = sectionElem;
            return sectionElem;
        }


    }
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

            const textOfListBullet = document.createTextNode(sectionHeadingContent);

            ulBullet.appendChild(textOfListBullet);


            if (typeof navItemStringList === "undefined" || !navItemElemList.includes(ulBullet)) {

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



// Add class 'active' to section when near top of viewport and change the design to have moving circles behing section

function checkFocusToUpdateSectionDesign() {

    setTimeout(getSectionInViewport);

    let sectionElem = currentSection;

    if ((sectionElem !== "null") && (typeof sectionElem !== "undefined")) {


        sectionElem.classList.add("active-section-body");


        headingToSearchForInNavBarLinks = sectionElem.querySelector("h2").innerHTML
        let index = navItemStringList.indexOf(headingToSearchForInNavBarLinks);
        if (index !== -1) {
            navItemElemList[index].classList.add("menu__link_active");
        }

    }

    for (const sectionDiv of sectionDivList) {

        const section = sectionDiv.parentElement;

        if (section !== sectionElem && section.classList.contains("active-section-body")) {

            section.classList.remove("active-section-body");

            headingToSearchForInNavBarLinks = sectionDiv.querySelector("h2").innerHTML

            let index = navItemStringList.indexOf(headingToSearchForInNavBarLinks);
            if (index >= 0) {
                navItemElemList[index].classList.remove("menu__link_active");
            }

        }
    }
}




// Scroll to anchor ID using scrollIntoView with smoothness 

function respondToTheClick(evt) {


    const index = navItemStringList.indexOf(evt.target.textContent);


    sectionElemList = document.getElementsByTagName("section");

    let element_to_scroll_to = sectionElemList[index];
    // Basically `element_to_scroll_to` just have to be a reference
    // to any DOM element present on the page
    // Then:
    element_to_scroll_to.scrollIntoView({
        behavior: "smooth"
    });
}


//

function checkScrolling() {

    setTimeout(hideNavBarScrolling);


    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {

    }, 600);

}

// hide navbar while scrolling

function hideNavBarScrolling() {
    const header = document.querySelector(".page__header");
    const nav = document.querySelector(".navbar__menu");

    nav.classList.add("hidden");
    header.classList.add("hidden");


}


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Check page focus every 300 milliseconds and build navbar from that

document.addEventListener("DOMContentLoaded", buildNavBar);




// Scroll to section on link click


document.querySelector(".navbar__menu").addEventListener('click', function(event) {
    event.preventDefault();
    respondToTheClick(event);
});


// Set sections as active
let timer = null;
window.addEventListener('scroll', function() {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {

        const header = document.querySelector(".page__header");
        const nav = document.querySelector(".navbar__menu");

        nav.classList.remove("hidden");
        header.classList.remove("hidden");
        setTimeout(intervalHelper);
    }, 150);
}, false);



// Listen for scroll events
window.addEventListener('scroll', checkScrolling, false);