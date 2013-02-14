AjaxForm = Backbone.View.extend({
    /*
     * Initialize with an el and a url
     * el is the div containing the form
     * form = MenuForm({el:'#menu-form-widget',url:'/billboards/menu/create/'});
     */

    events : {
        ".create-btn click" : "create",
    },
    initialize : function(input){
        this.el = input.el;
        this.url = input.url;
        this.baseUrl = input.url; // This is so you can rewrite the url based on the origin one passed in
    },

    create : function(id){
        obj=this;
        $(this.el).find("form").show();
        $.get(this.url, function(rs){
            if (rs.error) {
                alert_error(rs.error);
                return;
            } else {
                $(obj.el).find(".form-body").html(rs.html);
                $(obj.el).find("form").removeClass("hidden");
                obj.create_callback(rs);
            }
        },'json');
    },

    close : function(){
        $(this.el).find("form").hide();
    },

    save_one: function(){
        var data = this.toJSON();

        var obj = this;
        $.post(this.url,data,function(rs){
            $(obj.el).find(".form-body").html(rs.html);
            if (rs.error) {
                alert_error(rs.error);
                //$(obj.el).find("form").removeClass("hidden");

                return;
            } else {
                obj.success_callback(rs);
            }
        },'json');
        return false;

    },
    create_callback : function(rs){
        /*
         * This method should be overridden with you own create_callback if needed.
         */
        alert("AjaxForm.create_callback() is not defined. Plese define it");
    },

    success_callback : function (rs) {
        /*
         * This method should be overridden with you own create_callback if needed.
         */
        alert("AjaxForm.success_callback() is not defined. Plese define it");
},

    toJSON : function(){
        var inputs = $(this.el).find("form").serializeArray();
        var data = {};
        _.each(inputs,function(item){
            if (data[item.name]) {
                data[item.name] = data[item.name] + "|" +item.value;
            } else {
                data[item.name] = item.value;
            }
        });
        return data;
    },
   
});

