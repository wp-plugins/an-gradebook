<script id="assignment-view-template" type="text/template">
	<div class="column-frame">
		<div class="column-title"> <%= assignment.get('assign_name') %> </div>
		<div class="column-sort an-sorting-indicator dashicons dashicons-menu"></div>	
		<div id="column-assign-id-<%= assignment.get('id')%>">
		  	<ul>
				<li class='assign-submenu-sort'>Sort</li>
				<li class='assign-submenu-stats'>Statistics</li>				
				<li class='assign-submenu-edit'>Edit</li>
				<li class='assign-submenu-delete'>Delete</li>
		  	</ul>
		</div>			
	</div>
</script>      
    
    