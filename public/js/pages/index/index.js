function Page() {
	
}

$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
	},
	createHeader: function() {
		var headerContainer = $('.js-header');
		this.header = new Header(headerContainer, 0);
	}
})//对象合并，把后面对象拷贝到前面这个对象里
