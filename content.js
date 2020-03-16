const inputHeads = new Set(["Input:", "Input"]);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            // Get the test case texts from Input sections.
            // For problem in contest, there is a hidden `.source-content`. Ignore it.
            document.querySelector('.source-content') && document.querySelector('.source-content').remove();
            text = Array.from(document.querySelectorAll('strong, b'))
                .filter(x => inputHeads.has(x.innerText.trim()))
                .map(x => x.nextSibling.textContent.split('\n'))
                .flat()
                .map(x => x.trim().replace(/(\,\ )?\w+\ =\ /g, '\n').trim())
                .filter(x => Boolean(x))
                .join('\n');

            // Paste the texts into clipboard
            var copyFrom = document.createElement("textarea");
            copyFrom.textContent = text;
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.blur();
            document.body.removeChild(copyFrom);
        }
    }
);