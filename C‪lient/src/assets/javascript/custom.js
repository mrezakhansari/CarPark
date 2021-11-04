function setInputFilter(textbox, inputFilter) {
    ["input", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                if( this.tagName != 'SELECT'){
                    this.value=this.value.replaceAll(this.oldValue, '');
                }
                if(this.value.length == 1){
                    this.classList.add("enterandpass");
                    if( this.parentElement.previousElementSibling != null){
                        this.parentElement.previousElementSibling.querySelector('.form-control').focus();
                    }
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {

                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
for (var i=0 ;i < 8; i++){
    setInputFilter(document.getElementsByClassName("pelakinputitem")[i], function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });
}
