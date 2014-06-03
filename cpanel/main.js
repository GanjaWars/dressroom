(function () {
    function addPlus (e) {
        var _parent = this.parentNode.cloneNode(true);
        _parent.removeChild(_parent.getElementsByClassName('plus')[0]);
        var lastSelect= document.querySelectorAll('[name*=slots]');
        lastSelect = lastSelect[lastSelect.length - 1];
        this.parentNode.parentNode.insertBefore(_parent, lastSelect.parentNode.nextSibling);
    }

    function initPlus() {
        var plus = document.getElementsByClassName('plus');
        for (var i = 0, l = plus.length; i < l; i++) {
            plus[i].addEventListener('click', addPlus, false);
        }
    }

    function onFocus() {
        this.parentNode.getElementsByTagName('label')[0].className = 'focus';
    }

    function onBlur() {
        this.parentNode.getElementsByTagName('label')[0].className = '';
    }

    function initFieldFocus() {
        var input = document.querySelectorAll('input,select');
        for (var i = 0, l = input.length; i < l; i++) {
            input[i].addEventListener('focus', onFocus, false);
            input[i].addEventListener('blur', onBlur, false);
        }
    }

    initPlus();
    initFieldFocus();
})();
