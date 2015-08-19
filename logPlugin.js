/*
 * jQuery plugin v1.0
 * 
 * @author Halldora Johannsdottir
 * @author Thordur Bjorn Agustsson
 * 
 */

jQuery.fn.logPlugin = function () {
    /* Variable that holds the size of the logArray,
     * here user can change the size the way user wants
     * it to be.
     */
    var numbEvents = 3;

    /* Variable that holds the elements in a string for the function to work with,
     * here user can add or remove element for the function to grab.
     */
    var elements = "a, button, input, textarea, span, select";

    var logArray = [];
    var currEvent = [];

    //inisialize logArray if not inisialized before
    if (localStorage.getItem("logArr") == null) {
        currEvent = {
            urlStorage: "",
            date: "",
            tag: "",
            id: "",
            name: "",
            class: "",
            event: "",
            xCor: "",
            yCor: ""

        }
    } else {
        logArray = JSON.parse(localStorage.getItem("logArr"));//not right move here...
        console.log("else condition: " + JSON.stringify(logArray));
    };

    //onClick function getting information when clicked with mouse
    $(function onClick() {
        $(elements).mousedown(function (event) {
            dataInstall(event);
        });
    });

    //onKeyPress function getting information when pressing the key enter 
    $(function onKeyPress() {
        $(elements).keypress(function (event) {
            if (event.which === 13 || event.keycode === 13) {
                dataInstall(event);
            }
        });
    });

    //installing data into currEvent
    function dataInstall(ev) {
        currEvent = {
            urlStorage: location.href,
            date: Date(),
            tag: event.target.tagName.toLowerCase(),
            id: event.target.id,
            name: event.target.name,
            class: event.target.className,
            event: event.type,
            xCor: event.pageX,
            yCor: event.pageY
        };
        dataArray(currEvent);
        //console.log(currEvent);
    };

    //installing currEvent into logArray and in that process copy logArray
    //into localStorage
    function dataArray(array) {
        if (logArray.length === numbEvents) {
            logArray.shift();
            logArray.push(JSON.stringify(array));
            localStorage.setItem("logArr", JSON.stringify(logArray));
        } else {
            logArray.push(JSON.stringify(array));
            localStorage.setItem("logArr", JSON.stringify(logArray));
        };

        for (var i = 0; i < logArray.length; i++) {
            console.log("logArray inside dataArray: " + i + " = " + logArray[i]);
        };
        //        localStorage.clear();
    };

};

$("*").logPlugin();