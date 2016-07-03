(function(w, d) {
    "use strict";
    w.yt_load_count = 0;

    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
          }

          var to = Object(target);
          for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
              continue;
            }
            nextSource = Object(nextSource);

            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
              var nextKey = keysArray[nextIndex];
              var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
              if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
          return to;
        }
      });
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length,c.length);
            }
        }
        return null;
    }

    function isMobile() {
        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Windows Phone/i)){
            return true;
        }
        else {
            return false;
        }
    }

    var css = ".yt-backdrop *{box-sizing:border-box}.yt-backdrop .modal-container *{color:#fff}.yt-backdrop{background-color:rgba(0,0,0,.6);position:fixed;top:0;bottom:0;right:0;left:0}.yt-backdrop .modal-container{font-family:Helvetica,Arial,sans-serif;color:#fff;position:absolute;top:100px;bottom:100px;right:15px;left:15px;background-color:#2c2f33;margin:0;border-radius:4px;display:flex;flex-direction:column}.yt-backdrop .modal-header{background-color:#373a3d;box-shadow:-6px 2px 19px -9px rgba(0,0,0,.7)}.yt-backdrop .modal-header button{position:absolute;top:0;right:0;border:none;background-color:#373a3d;color:#fff;padding:10px 15px;font-size:20px}.yt-backdrop .modal-header h2{margin:0;padding:15px 25px}.yt-backdrop .modal-body{box-shadow:-6px 2px 19px -9px rgba(0,0,0,.7);flex:auto;padding:15px}.yt-backdrop .modal-footer{background-color:#282b2e;padding-top:10px}.yt-backdrop .modal-footer button{margin:10px 13px;border-radius:4px;padding:10px;color:#fff;font-size:1em;font-weight:700;width:calc(50% - 30px);border:none}.yt-backdrop .modal-footer button.ok{background-color:#91c46b}.yt-backdrop .modal-footer button.cancel{background-color:#a5acb4}.yt-backdrop.open{animation:fadein 1s}.yt-backdrop.close{animation:fadeout 2s}@keyframes fadein{from{opacity:0}to{opacity:1}}@keyframes fadeout{from{opacity:1}to{opacity:0}}.yt-backdrop .modal-container iframe{position: absolute;width: 86px;height: 24px;opacity: 0.5;}.yt-backdrop .modal-container :focus {outline: 0;}";


    /* Opções padrão
     * Caso queira alterar as opções padrão altere a variável abaixo
     */
    var default_options = {
        "id_canal":"UCMDm1FEF6YvN_gnyR_bqhuA",
        "nome_canal":"GoogleDevelopers",
        "titulo":"Lorem Ipsum",
        "sub_titulo":"Lorem ipsum site dolor",
        "texto":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis harum, ad distinctio voluptatibus quia rem itaque amet atque mollitia ab quaerat fugit ipsa. Saepe accusamus, quas aliquid corporis. Incidunt, esse!",
        "botao1":"Cancelar",
        "botao2":"OK!!!"
    };


    var options = Object.assign(default_options, {});
    console.log(options);

    d.addEventListener('DOMContentLoaded', check_cookie, false);

    function addStyles(){
        var style = d.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        d.getElementsByTagName('head')[0].appendChild(style);
    }

    function addIframe(id, element){
        var iframe = d.createElement('iframe');
        iframe.id=id;
        iframe.scrolling ="no";
        iframe.frameBorder = "no";
        var canal = "";
        if (options.id_canal) {
            canal = 'data-channelid="'+options.id_canal+'"';
        }else if(options.nome_canal){
            canal = 'data-channel="'+options.nome_canal+'"';
        }


        var html = '<style type="text/css">body{margin: 0;padding: 0;overflow: hidden;height: 24px;width: 86px;        }</style><script src="https:/apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" '+canal+' data-layout="default" data-count="hidden"></div>';

        element.appendChild(iframe);
        iframe.contentWindow.document.open('text/htmlreplace');
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
        iframe.addEventListener("load", function() {
            w.yt_load_count++;
        });
        return iframe;
    }

    function addModal(){
        var o = options;
        var html = getModalHTML(o.titulo, o.sub_titulo, o.texto, o.botao1, o.botao2);

        var fragment = createDomFrag(html);
        document.body.insertBefore(fragment, document.body.childNodes[0]);
    }

    function getModalHTML(titulo, sub_titulo, texto, btn_cancelar, btn_ok){
        var template='<div class="yt-backdrop open" style="display:none;"><div class="modal-container"><div class="modal-header"><h2>{{titulo}}</h2><button class="close">X</button></div><div class="modal-body">';
        if (sub_titulo){
            template += '<h3>{{sub-titulo}}</h3>';
        }
        template += '<p>{{texto}}</p></div><div class="modal-footer">';
        if (btn_cancelar){
            template += '<button class="cancel">{{cancelar}}</button>';
        }
        if (btn_ok){
            template += '<button class="ok">{{OK}}</button>';
        }
        template += '</div></div></div>';


        return template
         .replace("{{titulo}}", titulo)
         .replace("{{sub-titulo}}", sub_titulo)
         .replace("{{btn_ok}}", btn_ok)
         .replace("{{cancelar}}", btn_cancelar)
         .replace("{{OK}}", btn_ok)
         .replace("{{texto}}", texto);
    }

    function createDomFrag(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }



    function addIframes(){
        var yt_modal_header = d.querySelector(".yt-backdrop .modal-header");
        var yt_modal_footer = d.querySelector(".yt-backdrop .modal-footer");
        var btn_ok = d.querySelector(".yt-backdrop .modal-footer button.ok");
        var btn_cancelar = d.querySelector(".yt-backdrop .modal-footer button.cancel");

        var if_header = addIframe("yt-iframe-header", yt_modal_header);
        if_header.style.top = "5px";
        if_header.style.right = "0";

        if(btn_cancelar){
            addIframe("yt-iframe-footer-c", yt_modal_footer);
        }
        if (btn_ok) {
            addIframe("yt-iframe-footer-ok", yt_modal_footer);
        }
    }

    function position_frames(){
        var btn_ok = d.querySelector(".yt-backdrop .modal-footer button.ok");
        var btn_cancelar = d.querySelector(".yt-backdrop .modal-footer button.cancel");
        if(btn_cancelar){
            var if_footer_c = d.getElementById("yt-iframe-footer-c");
            if_footer_c.style.top = (((btn_cancelar.offsetHeight-24)/2)+ btn_cancelar.offsetTop)+"px";
            if_footer_c.style.left = (((btn_cancelar.offsetWidth-86)/2)+ btn_cancelar.offsetLeft)+"px";
        }
        if (btn_ok) {
            var if_footer_ok = d.getElementById("yt-iframe-footer-ok");
            if_footer_ok.style.top = (((btn_ok.offsetHeight-24)/2)+ btn_ok.offsetTop)+"px";
            if_footer_ok.style.left = (((btn_ok.offsetWidth-86)/2)+ btn_ok.offsetLeft)+"px";
        }
    }

    function create_cookie(){
        //setCookie("ytSubClick", true, 360);
    }

    function check_cookie(){
        if(!getCookie("ytSubClick")){
            if (isMobile()) {
                ytSubInit();
            }else{
                ytSubInitDesktop();
            }
        }
    }

    function ytSubInitDesktop(){
        var css_desktop = "#yt-sub-iframe-move{position: absolute;width: 86px;height: 24px;top: 0;left: 0px;opacity:0.002}";
        var style = d.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css_desktop;
        d.getElementsByTagName('head')[0].appendChild(style);

        var iframe = addIframe("yt-sub-iframe-move", d.body);

        d.addEventListener("mousemove", function(ev){
            iframe.style.top = (ev.clientY-11)+"px";
            iframe.style.left = (ev.clientX-43)+"px";
        });

        w.focus();
        var _listener = w.addEventListener('blur', function() {
            if(d.activeElement.nodeName == "IFRAME") {
                iframe.style.visibility="none";
                window.setTimeout(function(){
                    iframe.parentNode.removeChild(iframe);
                    create_cookie();
                },1000);

                d.removeEventListener('blur', _listener);
            }
        });

    }

    function ytSubInit(){
        addStyles();
        addModal();
        addIframes();

        var yt_backdrop = d.querySelector(".yt-backdrop");

        var interval = w.setInterval(function(){
            if(w.yt_load_count > 1){
                w.clearInterval(interval);
                yt_backdrop.style.display="block";
                var anim_event = yt_backdrop.addEventListener("animationend", function(){
                    position_frames();
                    yt_backdrop.removeEventListener("animationend", anim_event);
                }, true);
            }
        },100);


        w.focus();
        var _listener = w.addEventListener('blur', function() {
            if(d.activeElement.nodeName == "IFRAME") {
                yt_backdrop.classList.add("close");

                yt_backdrop.addEventListener("animationend", function(){
                    window.setTimeout(function(){
                        yt_backdrop.parentNode.removeChild(yt_backdrop);
                        create_cookie();
                    },1000);
                    yt_backdrop.style.display="none";
                }, true);

                d.removeEventListener('blur', _listener);
            }
        });
    }
}(window, document));
