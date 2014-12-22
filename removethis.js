// ==UserScript==
// @name	RemoveThis
// @description	Remove qualquer elemento que recebeu um ctrl + right-click
// @author	daniel.uramg@gmail.com
// @version	0.24
// @downloadURL	http://ideias.2p.fm/userscripts/removethis.js
// @require     http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @match	http://*/*
// @match	https://*/*
// ==/UserScript==

function injectCSS(cssdata){
    $("head").append("<style type='text/css'>"+cssdata+"</style>");
}

$(document).ready(function(){
    
    var debug = false;
    
    //função para remover o elemento
    function removeThis(element) {
        if (debug == true) console.log(element + " removido"); //exibe no console o elemento que vai remover
        $(element).remove();
    }
    
    //Injeta CSS para destaque
    injectCSS(".removethis{border-width: 2px; border-color: yellow; background-color: yellow; border: inset;}");
    
    //dar destaque no elemento em foco
    var addclass = function(e){
        if (e.ctrlKey) { //Ctrl é pressionado
            $(e.target).addClass('removethis');
            if (debug == true) console.log(e.target + " recebeu detaque"); //exibe no console o elemento que recebeu foco
            e.stopPropagation();
        }
    };
    
    //remover destaque no elemento que perdeu o foco
    var removeclass = function(e){
        if (e.ctrlKey) { //Ctrl é pressionado
            $(e.target).removeClass('removethis');
            if (debug == true) console.log(e.target + " perdeu detaque"); //exibe no console o elemento que perdeu foco
            e.stopPropagation();
        }
    };
    
    $('*').on("mouseenter", addclass); //Chama função para destaque quando chegar o mouse
    $('*').on("mouseleave", removeclass); //Chama função para remover destaque quando sair o mouse
    
    
    //remove o elemento clicado com Ctrl pressionado
    $('*').on("contextmenu", function(e){ //Botão direito é pressionado
        if(e.ctrlKey){ //Ctrl é pressionado
            removeThis(e.target);
            return false; //evita a propagation
        }
    })
    
    //Remove destaque de todos elementos quando soltar uma tecla
    $(document).keyup(function (e) {  //O evento Kyeup é acionado quando as teclas são soltas
            if (debug == true) console.log("ctrl foi solto");
            $('*').removeClass('removethis');
    })
    
})