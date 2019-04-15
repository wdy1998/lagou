function UpdatePosition(container) {
	this.container = container;
	this.id = '';
	this.init();
}


UpdatePosition.ModelTemp = `
	<div class="modal fade js-updatepos-modal"  tabindex="-1" role="dialog" aria-labelledby="UpdatePositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="UpdatePositionLabel">修改职位</h4>
	      </div>
	      <div class="modal-body">
	      	
			  <div class="form-group">
			    <label for="updatepos-company">公司名称</label>
			    <input type="text" class="form-control js-company" id="updatepos-company" placeholder="请输入公司名称">
			  </div>
			  <div class="form-group">
			    <label for="updatepos-position">职位名称</label>
			    <input type="text" class="form-control js-position" id="updatepos-position" placeholder="请输入职位名称">
			  </div>
			  <div class="form-group">
			    <label for="updatepos-salary">薪资范围</label>
			    <select class="form-control js-salary" id="updatepos-salary">
			   		<option>5k-10k</option>
			   		<option>10k-20k</option>
			   		<option>20k-25k</option>
			   		<option>25k-35k</option>
			   		<option>35k+</option>
			   	</select>
			  </div>
			  <div class="form-group">
			    <label for="updatepos-address">办公地点</label>
			    <input type="text" class="form-control js-address" id="updatepos-address" placeholder="请输入办公地点">
			  </div>
			
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	     <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
	     	修改成功
	     </div>
	      <div class="alert alert-success hide js-err-notice" role="alert" style="margin:20px;">
	     	修改失败
	     </div>
	    </div>
	  </div>
	</div>
	`;
$.extend(UpdatePosition.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.element = $(UpdatePosition.ModelTemp);
		this.companyElem = this.element.find(".js-company");
		this.positionElem = this.element.find(".js-position");
		this.salaryElem = this.element.find(".js-salary");
		this.addressElem = this.element.find(".js-address");
		this.succNoticeElem = this.element.find(".js-succ-notice");
		this.errNoticeElem = this.element.find(".js-err-notice");
		this.container.append(this.element);
	},
	showItem: function(id) {
		this.element.modal("show");
		this.getPositionInfo(id);
	},
	getPositionInfo: function(id) {
		$.ajax({
			url: "/api/getPosition",
			data: {
				id: id
			},
			success: $.proxy(this.handleGetPositionInfoSucc, this)
		})
	},
	handleGetPositionInfoSucc: function(res) {
		if( res && res.data && res.data.info ){
			var info = res.data.info;
			this.companyElem.val(info.company);
			this.positionElem.val(info.position);
			this.salaryElem.val(info.salary);
			this.addressElem.val(info.address);
			this.id = info._id;
		}
	}
	,
	bindEvents: function() {
		var submitBtn = this.element.find(".js-submit");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		var company = this.companyElem.val();
		var position = this.positionElem.val();
		var salary = this.salaryElem.val();
		var address = this.addressElem.val();
		
		$.ajax({
			type:"POST",
			url:"/api/updatePosition",
			data: {
				company: company,
				position: position,
				salary: salary,
				address: address,
				id: this.id
			},
			success: $.proxy(this.handleUpdatePositionSucc, this)
		});
		
	},
	handleUpdatePositionSucc: function(res) {
		if(res && res.data && res.data.update) {
			console.log(1)
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay, this), 2000);
			$(this).trigger("change");
		}else{
			this.errNoticeElem.removeClass("hide");
		}
	},
	handleDelay: function() {
		this.succNoticeElem.addClass("hide");
		this.element.modal("hide");
	}
})
