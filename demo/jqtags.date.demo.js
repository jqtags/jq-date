_spam_('jqtags.date.demo',function(demo,_demo_){
	
	utils.require(":jqtags/jq-date");
	
	_demo_._init_ = function(){
		var self = this;
		this.load({
			src : "test.html"
		}).done(function(){
			self.$$.on("change","#sampledate", function(e){
				console.info("======",e)
			});
		});
	};
	
});