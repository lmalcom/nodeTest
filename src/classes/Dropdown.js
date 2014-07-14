define(['Form', 'postal'], function(Form, postal){
var Dropdown = Form.extend({
    blockClass: "Dropdown", 
    superClass: 'Form', 
    super: Form.prototype, 
    initialize: function(attrs){
        var form = this; 
        Form.prototype.initialize.call(this, attrs); 
        $.ajax({
            method:'GET', 
            url: '/blockClassList', 
            success: function(dat){
                var inputs = []; 
                form.list = dat; 
                _.each(dat, function(input){
                    var txt = input.slice(0, -3)
                        // insert a space before all caps
                        .replace(/([A-Z])/g, ' $1')
                        // uppercase the first character
                        .replace(/^./, function(str){ return str.toUpperCase(); })
                    inputs.push({
                        value: txt, 
                        text: txt
                    }); 
                }); 
                form.inputs = inputs; 
                form.render(); 
            } 
        }); 
    }, 
    template: function(dat){ 
        var form = this; 
        var inputs = this.get('inputs'), 
            txt = '<form class="inactive"><select name="' + (this.get('name') || "") + '">'; 
        
        //create labels and inputs for all of the inputs in the array 
        _.each(inputs || [], function(input){ 
            if(input.value){ 
                txt += '<option value ="' + input.value + '">' + (input.text || input.value) + '</option>'; 
            } 
        }); 

        //submit button 
        txt+= '</select><input type="submit" class="Button" value="' + (form.get('submitVal') || 'Submit') + '"></input>'; 
        txt += '</form>'; 
        return _.template(txt); 
    }, 
    submit: function(ev){ 
        var formData; 
        ev.preventDefault(); 

        //get form data 
        formData = $(ev.target).find('select')[0].selectedIndex; 

        //send to action or alternative         
        this.send(formData); 
    }, 
    send: function(dat){
        var form = this; 
        postal.publish({
            channel: 'form', 
            topic: this._blockID, 
            data: form.list[dat]
        })
    }
    }); 
return Dropdown; 
}); 