$(document).ready(function(){
	var teacherData = $('#teacherList').DataTable({
		"lengthChange": false,
		"processing":true,
		"serverSide":true,
		"order":[],
		"ajax":{
			url:"action.php",
			type:"POST",
			data:{action:'listTeacher'},
			dataType:"json"
		},
		"columnDefs":[
			{
				"targets":[0, 5, 6],
				"orderable":false,
			},
		],
		"pageLength": 10
	});	

	$('#addTeacher').click(function(){
		$('#teacherModal').modal('show');
		$('#teacherForm')[0].reset();		
		$('.modal-title').html("<i class='fa fa-plus'></i> Shtimi i Pedagogeve");
		$('#action').val('addTeacher');
		$('#save').val('Save');
	});	
	
	$(document).on('submit','#teacherForm', function(event){
		event.preventDefault();
		$('#save').attr('disabled','disabled');
		var formData = $(this).serialize();
		$.ajax({
			url:"action.php",
			method:"POST",
			data:formData,
			success:function(data){				
				$('#teacherForm')[0].reset();
				$('#teacherModal').modal('hide');				
				$('#save').attr('disabled', false);
				teacherData.ajax.reload();
			}
		})
	});	
	
	$(document).on('click', '.update', function(){
		var teacherid = $(this).attr("id");
		var action = 'getTeacher';
		$.ajax({
			url:'action.php',
			method:"POST",
			data:{teacherid:teacherid, action:action},
			dataType:"json",
			success:function(data){
				$('#teacherModal').modal('show');
				$('#teacherid').val(data.teacher_id);
				$('#teacher_name').val(data.teacher);
				$('#mbiemri').val(data.mbiemri);
				$('#titulli').val(data.titulli);
				$('#email').val(data.email);	
				console.log("==teacher=="+data.teacher);
				$('.modal-title').html("<i class='fa fa-plus'></i> Modifikimi i Pedagogeve");
				$('#action').val('updateTeacher');
				$('#save').val('Save');
			}
		})
	});	
	
	$(document).on('click', '.delete', function(){
		var teacherid = $(this).attr("id");		
		var action = "deleteTeacher";
		if(confirm("Jeni te sigurt qe deshironi ta fshihni kete Pedagog?")) {
			$.ajax({
				url:"action.php",
				method:"POST",
				data:{teacherid:teacherid, action:action},
				success:function(data) {					
					teacherData.ajax.reload();
				}
			})
		} else {
			return false;
		}
	});	
	
	
	
});