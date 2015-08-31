_tag_('jqtags.date', function (date) {

  var jq = _module_("jQuery");
  var Pikaday = _module_("Pikaday");
  var moment = _module_("moment");
  var self, $tag, pickerIsOpen = false, editable = false, format;
  var DEFAULT_FORMAT = "DD MMM YYYY";
  var DEFAULT_DATE_CONVENTION = 0;
  var M = moment();

  //moment("12-25-1995", "MM-DD-YYYY").format("DD-MM-YYYY")
  //pitana.domEvents.trigger(this.$, eventName, detail);

  jq("body").on("blur", "jq-date input", function (e) {
    if (editable) {
      $tag = jq(e.target).closest('jq-date');
      if (changeValue($tag[0], e.target.value)) {
        //date.trigger($tag[0],"input");
        //date.trigger($tag[0],"change");
      }
      editable = false;
    }
    return window.preventPropagation(e);
  });

  var setHTML = function (tag, html) {
    try {
      tag.getElementsByTagName('value')[0].innerHTML = html;
    } catch (e) {
      console.warn("jqtags.date", e);
    }
  };

  var changeValue = function (tag, value) {
    var oldValue = tag.value;
    if (value) {
      var m = date.getDateFromText(value);
      tag.value = m.format(DEFAULT_FORMAT);
      setHTML(tag, m.format(tag.format));
    } else {
      tag.value = "";
      setHTML(tag, "");
    }
    return (oldValue !== tag.value)
  };

  tag = {
    tagName: "jq-date",
    events: {
      "click icon": "showPicker",
      "dblclick value": "makeEditable",
      "keydown": "onKeyDown",
      "keyup": "onKeyUP",
      "change": "onchange"
    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "valueOnSet"
      },
      format: {
        type: 'string',
        default: DEFAULT_FORMAT
      },
      tabindex: {
        type: 'int',
        default: 0
      }
    },
    attachedCallback: function () {
      //this.$.innerHTML = '<span class="icon">D</span>'
      this.$.setAttribute("tabindex", this.$.tabindex);
      this.$.innerHTML = '<value></value><icon></icon>';
      changeValue(this.$, this.$.value);
      //this.$.setAttribute("pointer","pointer");
    },
    onchange: function (e, target) {
      if (target === this.$ || target === e.originalTarget || (e.firedBy && e.firedBy.el === target)) {
        return;
      }
      return window.preventPropagation(e);
    },
    valueOnSet: function (e) {
      if (changeValue(this.$, this.$.value)) {
        //self.trigger("change");
      }
    },
    onKeyUP: function (e) {
      var key = e.which || e.key;
      if (key === 13 && editable) {
        this.$.getElementsByTagName('input')[0].blur();
      }
    },
    onKeyDown: function (e, target) {
      var key = date.key(e);
      if (!key.isNavKey) {
        return this.makeEditable(e, target);
      }
    },
    makeEditable: function (e, target) {
      if (!editable) {
        var self = this;
        setHTML(this.$, '<input tabindex=-1 value="' + this.$.value + '">')
        $(this.$).find('input').one("change", function (e2) {
          if (editable) {
            //$tag = jq(e.target).closest('jq-date');
            if (changeValue(self.$, e2.target.value)) {
              date.trigger(self.$, "input");
              date.trigger(self.$, "change");
            }
            editable = false;
          }
          return window.preventPropagation(e2);
        });

        if (date.picker) {
          date.picker.destroy();
        }
        this.$.getElementsByTagName('input')[0].select();
        editable = true;
      }
    },
    showPicker: function () {
      self = this;
      //console.info("====",$(this.$).find("input").val())
      if (pickerIsOpen !== true) {
        pickerIsOpen = true
        format = this.$.format;
        var $value = $(this.$).find('value');
        $value.on("change", function (e2) {
          return window.preventPropagation(e2);
        });
        date.picker = new Pikaday({
          field: $value[0],
          trigger: this.$,//.getElementsByTagName('icon')[0],
          format: format,
          onSelect: function (value) {
            //console.error("eee",value,date.picker.toString())
            if (changeValue(self.$, date.picker.toString())) {
              self.trigger("input");
              self.trigger("change");
            }
          },
          onClose: function () {
            pickerIsOpen = false
            $value.off();
            date.picker.destroy();
          }
        });
        date.picker.show();
      }
    }
  };

  date.getDateFromText = function (dateString, code) {
    var dateString = dateString || "";
    var dateObj = {};
    dateObj.time = 0;
    dateObj.display = "";
    dateObj.isValid = false;
    dateObj.isTenor = false;
    dateObj.isBuisDay = false;
    var m = moment();

    if (code == undefined) var code = DEFAULT_DATE_CONVENTION;
    if (isNaN(dateString)) {
      dateString = (dateString + '').replace(/[-_,]/gi, " ").replace(/(\s\s+)/g, ' ');
      //var m1 = dateString.match(/^[1-9][0-9]*[dwmyDWMY]$/);
      //var m2 = dateString.match(/^[0-9][0-9]*[bB]*[dD]$/);
      if (/^[1-9][0-9]*[mM]$/.test(dateString)) {
        var count = parseInt(dateString.replace(/[mM]/gi, ""));
        return m.month(m.month() + count);
      } else if (/^[1-9][0-9]*[dD]$/.test(dateString)) {
        var count = parseInt(dateString.replace(/[dD]/gi, ""));
        return m.day(m.day() + count);
      } else if (/^[1-9][0-9]*[wW]$/.test(dateString)) {
        var count = parseInt(dateString.replace(/[wW]/gi, ""));
        return m.week(m.week() + count);
      } else if (/^[1-9][0-9]*[yY]$/.test(dateString)) {
        var count = parseInt(dateString.replace(/[yY]/gi, ""));
        return m.year(m.year() + count);
      } else {
        //TO CHECK DATE FORMAT
        if ((/^[A-Za-z]+[ ]*[A-Za-z0-9]+[ ]*[A-Za-z0-9]+[ ]*[0-9]{2,4}$/).test(dateString)) {
          var x = dateString.split(" ");
          x.shift();
          dateString = x.join(" ");
        }
        //TO CHECK DATE FORMAT
        if ((/^[0-9]{2,2}[ -]*[A-Za-z]{3,3}[ -]*[0-9]{2,4}$/).test(dateString)) { //NONUS:02-Aug-2011,02 Aug 2011,02Aug2011, NONUS
          dateString = dateString.replace(/[- ]*/gi, "").toLowerCase();
          dateObj.dd = dateString.substr(0, 2);
          dateObj.mm = date.getMonthFromName(dateString.substr(2, 3));
          dateObj.yy = dateString.substr(5, 4);
          dateObj.isValid = true;
        } else if ((/^[0-9]{1,1}[ -]*[A-Za-z]{3,3}[ -]*[0-9]{2,4}$/).test(dateString)) {//NONUS:2-Aug-11,2 Aug 2011,2Aug2011,NONUS
          dateString = dateString.replace(/[- ]*/gi, "").toLowerCase();
          dateObj.dd = dateString.substr(0, 1);
          dateObj.mm = date.getMonthFromName(dateString.substr(1, 3));
          dateObj.yy = dateString.substr(4, 4);
          dateObj.isValid = true;
        } else if ((/^[0-9]{1,2}[ -\/][0-9]{1,2}[ -\/][0-9]{2,4}$/).test(dateString)) {
          dateString = dateString.replace(/[- \/]+/gi, " ");
          var _dateString = dateString.split(" ");
          if (code == 1) { //NONUS:02/08/11,02/08/2011,02-08-2011,02-08-11
            dateObj.dd = _dateString[0];
            dateObj.mm = _dateString[1];
            dateObj.yy = _dateString[2];
          } else if (code == 0) {//US:02/08/11,02/08/2011,02-08-2011,02-08-11
            dateObj.mm = _dateString[0];
            dateObj.dd = _dateString[1];
            dateObj.yy = _dateString[2];
          }
          dateObj.isValid = true;
        } else if ((/^[A-Za-z]{3,3}[ -]*[0-9]{2,2}[ -]*[0-9]{2,4}$/).test(dateString)) { //US:02-Aug-2011,02 Aug 2011,02Aug2011,
          dateString = dateString.replace(/[- ]*/gi, "").toLowerCase();
          dateObj.mm = date.getMonthFromName(dateString.substr(0, 3));
          dateObj.dd = dateString.substr(3, 2);
          dateObj.yy = dateString.substr(5, 4);
          dateObj.isValid = true;
        } else if ((/^[A-Za-z]{3,3}[ -]*[0-9]{1,1}[ -]*[0-9]{2,4}$/).test(dateString)) {//US:2-Aug-11,2 Aug 2011,2Aug2011
          dateString = dateString.replace(/[- ]*/gi, "").toLowerCase();
          dateObj.mm = date.getMonthFromName(dateString.substr(0, 3));
          dateObj.dd = dateString.substr(3, 1);
          dateObj.yy = dateString.substr(4, 4);
          dateObj.isValid = true;
        }

        if (dateObj.isValid) {
          if (dateObj.yy.length === 2) {
            dateObj.yyyy = "20" + dateObj.yy;
          } else if (dateObj.yy.length === 4) {
            dateObj.yyyy = dateObj.yy;
            dateObj.yy = dateObj.yy.substr(2, 2);
          } else {
            dateObj.isValid = false;
          }
          if (dateObj.isValid) {
            //if(dateObj.mm.length==1) dateObj.mm = "0" + dateObj.mm;
            //if(dateObj.dd.length==1) dateObj.dd = "0" + dateObj.dd;
            if (dateObj.mm > 12 && dateObj.dd < 13) { //SWAP MONTH AND DATE
              var _mm = dateObj.mm;
              dateObj.mm = dateObj.dd;
              dateObj.dd = _mm;
            }
            //dateObj.isValid = date.getValidationForDate(dateObj.dd,dateObj.mm,dateObj.yyyy);
          }
        }
      }
      if (dateObj.isValid) {
        return moment([dateObj.yyyy, dateObj.mm - 1, dateObj.dd]);
      }
    } else {
      if ((dateString) > 31516200000) {
        return moment.unix(dateString)
      }
    }
    return moment("INVALID_DATE");
  };

  date.getMonthFromName = function (monthStr) {
    return  M.month(monthStr).month() + 1;
  };
  date.getValidationForDate = function (day, month, year) {
    var dd = parseInt(day);
    var mm = parseInt(month);
    var yy = parseInt(year);
    var isValid = true;
    var mm31 = [1, 3, 5, 7, 8, 10, 12];
    if (mm < 1 || mm > 12) return false;
    if (mm == 2) {
      if (yy % 400 != 0 && yy % 4 != 0) {
        if (dd > 28) return false;
      } else if (dd > 29)  return false;
    } else if (((mm % 2 == 1 && mm < 8) || (mm % 2 == 0 && mm > 7) ) && dd > 31) {
      return false;
    } else if (((mm % 2 == 1 && mm > 7) || (mm % 2 == 0 && mm < 8) ) && dd > 30) {
      return false;
    }
    return true;
  }


  return tag;
});