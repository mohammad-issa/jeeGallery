var jee_components = function() {};
jee_components.prototype = {
    con_unit: function(title,msg) {
        return '<div class="jee-message">'+
        '<div class="jee-title">'+ title +'</div>'+
        '<span class="jee-msg">' + msg + '</span>'+
        '</div>';
    },
}
"use strict";

var jee_messages = function() {

    this.option = {
        top: 70,
        messageDuration: 3000,
        fadeOut : true,

    }
    this.components = new jee_components();
    this.jee_unit = document.getElementsByClassName("jee-unit");
};
jee_messages.prototype = {

    msgOption: function(obj) {
        this.option.messageDuration = obj.messageDuration !== undefined ? obj.messageDuration : this.option.messageDuration;
        this.option.fadeOut = obj.fadeOut !== undefined ? obj.fadeOut : this.option.fadeOut;
        this.option.top = obj.top !== undefined ? obj.top : this.option.top;
    },

    computeHeigth: function(elmClass, length) {
        var elm = document.getElementsByClassName(elmClass)[length];
        var height = elm.offsetHeight;
        var style = getComputedStyle(elm);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    },

    init: function() {
        var main_div = document.createElement("div");
        main_div.className = 'jee';
        document.body.appendChild(main_div);
    },

    jeeAdd: function(type,title,msg) {
        var jee_div = document.createElement("div");
        jee_div.className = 'jee-unit';
        document.getElementsByClassName('jee')[0].appendChild(jee_div);

        var length = this.jee_unit.length;
        switch (type) {

		    case 'error':
        		this.jee_unit[length - 1].className += " jee-error";
		        break;

		    case 'success':
        		this.jee_unit[length - 1].className += " jee-success";
		        break;

		    case 'info':
        		this.jee_unit[length - 1].className += " jee-info";
		        break;

		    case 'warning':
        		this.jee_unit[length - 1].className += " jee-warning";
		        break;

            default: 
        		this.jee_unit[length - 1].className += " jee-default";
        		console.warn('JeeMessages : please select type of message');
		}

		this.jee_unit[length - 1].innerHTML = this.components.con_unit(title,msg);

        var element_heigth = this.computeHeigth('jee-unit', length - 1);
        var total_heigth =0;
        for (var i = 0; i < this.jee_unit.length; i++) {
        	total_heigth+=this.computeHeigth('jee-unit', i);
        }
        this.jee_unit[length - 1].style.top =  total_heigth + this.option.top - element_heigth + "px";

        if (length == 1) {
            this.timings();
        }

    },
    fadeEffect: function() {
        var fadeTarget = this.jee_unit[0];
        var fade_interval = setInterval(function() {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity < 0.1) {
                jeeMessages.shiftUp();
                clearInterval(fade_interval);
            } else {
                fadeTarget.style.opacity -= 0.1;
            }
        }, 50);
    },

    shiftUp: function() {
        var _length = this.jee_unit.length;
        for (var i = 0; i < _length - 1; i++) {
            var prev_heigth = this.computeHeigth('jee-unit', 0);
            var curr_top = parseFloat($('.jee-unit').eq(i + 1).css("top"));

            $('.jee-unit').eq(i + 1).animate({ top: curr_top - prev_heigth });
        }
        this.removeMsg();
    },

    removeMsg: function() {
        var child = this.jee_unit;
        child[0].parentNode.removeChild(child[0]);
        jeeMessages.timings();
    },

    timings: function() {
        var length = this.jee_unit.length;
        if (length >= 1) {
            setTimeout(function() {
            	if(jeeMessages.option.fadeOut){
                	jeeMessages.fadeEffect();
            	}
            	else{
                	jeeMessages.shiftUp();
            	}
            }, this.option.messageDuration);
        }
    },
}

// --------------------------------------------------

var jeeMessages = new jee_messages();
jeeMessages.init();