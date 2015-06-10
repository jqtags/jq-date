_tag_('jqtags.date',function(date){
	
	return {
	    tagName: "jq-date",
	    events: {
	        "change .switch-input":"toggleValue"
	    },
	    accessors: {
	        value: {
	            type: "boolean"
	        },
	        on: {
	            type: "string",
	            default : "On"
	        },
	        off: {
	            type: "string",
	        	default : "Off"
	        },
	        label: {
	            type: "string",
	        	default : ""
	        }
	    },
	    attachedCallback: function () {
	    	console.info("---",this.$);
	    },
	    toggleValue : function(){
	    	this.$.value = !this.$.value;
	    }
	};
	
});