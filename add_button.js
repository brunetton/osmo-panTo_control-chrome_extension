var s = document.createElement('script');
// js code to be executed in the context of the page
// (see http://stackoverflow.com/questions/9263671/google-chome-application-shortcut-how-to-auto-load-javascript/9310273#9310273)

green_icon_url = chrome.extension.getURL("target-green.png");
red_icon_url = chrome.extension.getURL("target-red.png");

var onclick_function = ' \
    auto_recenter_activated = !auto_recenter_activated;  \
    icon = (auto_recenter_activated) ? "' + green_icon_url + '" : "' + red_icon_url + '";  \
    $("#auto-recenter-toggle").css("background-image", "url(" + icon + ")");  \
    if (auto_recenter_activated) {  \
        maps["map"].panTo = default_panTo_func;  \
    } else {  \
        maps["map"].panTo = function() {};  \
    };  \
';

onclick_function = onclick_function.replace(new RegExp('"', 'g'), "&apos;");

s.textContent = '  \
    parent_css_path = "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right"; \
    parent = $(parent_css_path); \
    if (parent.size() != 0) { \
        default_panTo_func = maps["map"].panTo;  \
        var auto_recenter_activated = true;  \
        parent.append(\' \
            <div class="leaflet-control-layers leaflet-control">  \
                <a id="auto-recenter-toggle"  \
                    style="width: 36px; height: 36px; display: block;  \
                        background-image: url(&apos;' + green_icon_url + '&apos;);  \
                        background-position: 50% 50%;  \
                        background-repeat: no-repeat;"  \
                    href="#" title="Auto rencenter toggle" onclick="' + onclick_function + '";  \
                ></a>  \
            </div>   \
        \'); \
    } else {  \
        console.log("panTo_control extension : it seems that we\'re not in a map page."); \
    };  \
';

// Add code to page
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};



