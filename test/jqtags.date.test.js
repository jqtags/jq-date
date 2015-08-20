define({
  name: 'jqtags.date.test',
  extend : "spamjs.view",
  modules : ["jqtags.date"]
}).as(function (demo, date) {

  demo._init_ = function () {
    var self = this;
    this.model({
      dateValue: ""
    });
    _importStyle_("jqtags/jq-date");
    this.$$.loadView({
      src: this.path("test.html")
    }).done(function () {
      self.$$.on("change", "#sampledate", function (e) {
        console.info("jquery.on value changed====", e)
        //self.model().dateValue = e.target.value;
      });
    });
  };

  demo.mychangefun = function (e) {
    console.info("_demo_.mychangefun eee====", e);
  }

});