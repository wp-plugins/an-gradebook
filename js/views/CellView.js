(function($, AN){
	AN.Views.CellView = AN.Views.Base.extend({
        tagName: 'td',
        events: {
            "click .view": "edit",
            "keypress .edit": "updateOnEnter",
            "blur .edit": "hideInput"
        },
        initialize: function() {
            this.listenTo(this.model, 'change:assign_points_earned', this.render);
            this.listenTo(AN.GlobalVars.assignments, 'change:hover', this.hoverCell);            
            this.listenTo(AN.GlobalVars.assignments, 'change:visibility', this.visibilityCell);
            this.listenTo(AN.GlobalVars.assignments, 'remove', this.cleanUpAssignmentCell); 
            this.listenTo(AN.GlobalVars.students, 'remove', this.cleanUpStudentCell);             
            this.listenTo(this.model, 'remove', this.close);                                    
        },
        render: function() {
        	var self = this;
            this.$el.toggleClass('hidden', !self.model.get('visibility'));           
            this.$el.html('<div class="view">' + this.model.get('assign_points_earned') + '</div> <input class="edit" type="text" value="' + parseFloat(this.model.get('assign_points_earned')) + '"></input>');
            this.input = this.$('.edit');
            return this;
        },
        cleanUpAssignmentCell: function(ev){
        	ev.get('id') === this.model.get('amid') && AN.GlobalVars.cells.remove(this.model);
        },
        cleanUpStudentCell: function(ev){
        	ev.get('amid') === this.model.get('amid') && AN.GlobalVars.cells.remove(this.model);
        },        
        close: function() {
        	this.remove();
        },
        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.hideInput();
        },
        hideInput: function() { //this gets called twice.
            var value = this.input.val();
            var self = this;
            this.model.save({assign_points_earned: value});
            this.$el.removeClass("editing");
        },
        edit: function() {
            var w = this.$el.width();
            this.input.css('width', w);
            this.input.css('margin-right', -w); //I'm not really sure why, but this works??		    
            this.$el.addClass("editing");
            this.input.focus();
        },
        hoverCell: function(ev) {
            if (this.model.get('amid') === ev.get('id')) {
                this.model.set({
                    hover: ev.get('hover')
                });
                this.$el.toggleClass('hover',ev.get('hover'));                
 			} 
        },      
        visibilityCell: function(ev) {
            if (this.model.get('amid') === ev.get('id')) {
                this.model.set({
                    visibility: ev.get('visibility')
                });
                this.render();
 			}
        }       
    });
})(jQuery, AN || {});