import * as $ from "jquery";
import Random  from "./Random";


class Options {
    private r;

    constructor(){
        this.r = new Random();
        this.bindLocales();
        this.bindSaveListener();
    }

    bindLocales(){
        let locales = this.r.getSupportedLocales()
        for (var key in locales) {
            $('<option/>').val(locales[key]).html(key).appendTo('#language');
        }
    }
    bindSaveListener(){
        $('#save-locale').click(function(){

            var obj = {locale: $("#language").val()};
            chrome.storage.sync.set(obj, function() {
                console.log('Saved Language Preference');
            });

            chrome.storage.sync.get(['locale'], function(data) {
                
            });
        });
    }
}

new Options();