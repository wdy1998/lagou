function Page() {
	
}//控制器  控制各个组件之间的传值

$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createaddPosition();
		this.createPositionList();
		this.createPagination();
	},
	createHeader: function() {
		var headerContainer = $('.js-header');
		this.header = new Header(headerContainer, 1);
	},
	createaddPosition: function() {
		var positionContainer = $('.js-container');
		this.addPosition = new AddPosition(positionContainer);
		$(this.addPosition).on("change", $.proxy(this.handleAddPosition, this));
	},
	
	createPositionList: function() {
		var positionContainer = $('.js-container');
		this.positionList = new PositionList(positionContainer);
		$(this.positionList).on("change", $.proxy(this.handleListChange, this))
	},
	createPagination: function() {
		var paginationContainer = $('.js-pagination');
		this.pagination = new Pagination(paginationContainer);
		$(this.pagination).on("change", $.proxy(this.handlePaginationChange, this));
	},
	handleListChange: function(e) {
		this.pagination.setTotal(e.total);
	},
	handlePaginationChange: function(e) {
		this.positionList.changePage(e.page);
	},
	handleAddPosition: function() {
		this.positionList.getListInfo();
	}
})//对象合并，把后面对象拷贝到前面这个对象里
