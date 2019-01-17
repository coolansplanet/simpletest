const browser_data = [
                        {
                            "browser" : "Internet Explorer",
                            "info"  : "Internet Explorer info",
                            "rating" : 1
                        },
                        {
                            "browser" : "Opera",
                            "info"  : "The Opera browser has some new tricks up its sleeve. Notable recent additions include a built-in VPN, an ad-blocker, and a battery-saver mode, all of which make it well worth downloading.",
                            "rating" : 3
                        },
                        {
                            "browser" : "FireFox",
                            "info"  : "Firefox can't be beat when it comes to customizability and features. It's also fast, secure, and protects your privacy. It's our Editors' Choice for Web browsers.",
                            "rating" : 5
                        },
                        {
                            "browser" : "Chrome",
                            "info"  : "Google's Chrome browser is speedy, includes leading standards support, strong security features, and a clean interface, but it's no longer the fastest browser and it lacks some features found in the competition.",
                            "rating" : 4
                        },
                        {
                            "browser" : "Safari",
                            "info"  : "Apple was widely criticized when it originally launched a very buggy and unstable version of Safari for Windows. Things have changed a lot since then however and Safari 5 has come a long way with introductions such as a new Reader icon for easier reading in one page, faster page load times and vastly improved HTML5 support for better video support and stability.",
                            "rating" : 3
                        },
                        {
                            "browser" : "Edge",
                            "info"  : "Microsoft's Edge Web browser is getting better and better. It aces the JavaScript benchmarks, has a clean interface, offers good security, and now supports extensions. But it still lacks some features found in more mature browsers.",
                            "rating" : 3
                        }
                    ];


/*
 *  JS - Exercises
 */
const browser_info = document.getElementById('browserInfo');
const complete_message = document.getElementById('completeMessage');

(function() {
    const browser_list = document.createDocumentFragment(); //Good practice for performance.

    browser_data.sort((a, b)=>{ //Sort browser_data by rate.
        return b.rating-a.rating;
    })
        //Iterates over the sorted list:
        .forEach(item => {
            //Creates one browser list item:
                const element = document.createElement("li");

            //Creates the html code for the stars:
                let rate = '';
                for (let i = 0; i < 5; i++) {
                    rate += `<i class="fa fa-star ${i < item.rating ? 'checked' : ''}"></i>`;
                }
            //Inserts html code into the created list item:
                element.innerHTML =
                `<a href="#" onclick="update(this)">${item.browser}</a>
                <div class="rating">${rate}</div>`;

            //The element knows its object, and the object knows its element:
                element.itemObject = item;
                item.element = element;

            //Add the list item into the browser_list (still not in the DOM)
                browser_list.appendChild(element);
        });
    //Inserts the browser_list into the DOM
    document.getElementById('browserList').appendChild(browser_list);
})();


const update = element => {
    //Counts how many "clicked" browsers are, and removes the "current" class to all of them:
        let visitedItems = 1; //(If this function is called, it means there's at least one visited item)
        browser_data.forEach(
            oneItem => {
                oneItem.element.classList.remove('current');
                if(oneItem.element.classList.contains('clicked')){
                    visitedItems++;
                }
            }
        )
    //Add 'current' and 'clicked' classes to the clicked list element:
        element.parentElement.classList.add('current', 'clicked');

    //Shows the clicked browser's info on the screen:
        browser_info.textContent = element.parentElement.itemObject.info;
        browser_info.classList.remove('notDisplay');

    //Once all items have been clicked, the "Finished, thank you" message is displayed on the screen:
        if (visitedItems == browser_data.length) {
            complete_message.classList.remove('notDisplay');
        }
}
