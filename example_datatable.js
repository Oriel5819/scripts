// SETTING DATATABLE
var history_setting = $('#history__setting__' + codeSite)
.DataTable({
	"processing": true,
	"select": "single",
	"bSortClasses": false,
	"deferRender": true,
	"processing": true,
	"searchDelay": 500,
	"scroller": false,
	"paging": true,
	"pageLength": 25,
	"lengthMenu": [[10, 25, 50, 100, 250, -1], [10, 25, 50, 100, 250, "All"]],
	"fixedHeader": true,
	"search": {
		"regex": true
	},
	"language": {
		"loadingRecords": ""
	},
	"columns": [
		{ "title": "SPECIFIC PROBLEM", "data": "SpecificProblem" },
		{ "title": "MO PARENT", "data": "MoParent" },
		{ "title": "MO AFFECTED", "data": "MoAffected" },
		{ "title": "CLASSIFICATION", "data": "Classification" }
	],
	"data": uniqueArr,
	"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
		$(nRow).attr("id", iDisplayIndex);
	},
	"initComplete": function(setting, data_site){
		$.contextMenu({
			selector: '#history__setting__'+ codeSite +' tbody tr',
				items: {
				classification: {
					name: `Classify`,
					icon: "fa-list",
					callback: function (key, opt) {

						const id = $(opt.$trigger).attr("id");
						const { SpecificProblem, MoParent, MoAffected, Classification } = history_setting.rows(`[id='${id}']`).data()['0'];

						$.confirm({
							title: 'Classification',
							closeIcon: true,
							boxWidth: '40%',
							useBootstrap: false,
							content: `	<section class="">
											<div class="">
												<label for="alarm_historic_specific_problem">Specific problem</label>
												<input style="padding-left:25px" class="form-control" id="alarm_historic_specific_problem" name="specific_problem" disabled placeholder="Specific Problem...">
													<input style="position:relative;left:5px;bottom:20px;cursor:pointer" type="checkbox" id="alarm_historic_specific_problem_checkbox" name="alarm_historic_specific_problem_checkbox" checked/>
												</input><br />
											</div>
											<div class="">
												<label for="alarm_historic_mo_parent">Mo Parent</label>
												<input style="padding-left:25px" class="form-control" rows="1" id="alarm_historic_mo_parent" name="mo_parent" disabled placeholder="Mo Parent...">
													<input style="position:relative;left:5px;bottom:20px;cursor:pointer" type="checkbox" id="alarm_historic_mo_parent_checkbox" name="alarm_historic_mo_parent_checkbox" checked/>
												</input><br />
											</div>
											<div class="">
												<label for="alarm_historic_mo_affected">Mo Affected</label>
												<input style="padding-left:25px" class="form-control" rows="2" id="alarm_historic_mo_affected" name="mo_affected" disabled placeholder="Mo Affected...">
													<input style="position:relative;left:5px;bottom:20px;cursor:pointer" type="checkbox" id="alarm_historic_mo_affected_checkbox" name="alarm_historic_mo_affected_checkbox" checked/>
												</input><br />
											</div>
											<div class="">
												<label for="alarm_historic_classification">Classification</label>
												<input class="form-control" rows="2" id="alarm_historic_classification" name="classification" placeholder="Classification..." required></input><br />
											</div>
										</section>`,
							onContentReady: function(){
								$('#alarm_historic_specific_problem').val(SpecificProblem);
								$('#alarm_historic_mo_parent').val(MoParent);
								$('#alarm_historic_mo_affected').val(MoAffected);
								$('#alarm_historic_classification').val(Classification);
							},
							buttons: {
								formSubmit: {
									text: 'confirmer',
									btnClass: "btn-blue",
									action: function(){
										var specific_problem = $('#alarm_historic_specific_problem').val();
										var specific_problem_checked = $('#alarm_historic_specific_problem_checkbox').is(":checked");
										var mo_parent = $('#alarm_historic_mo_parent').val();
										var mo_parent_checked = $('#alarm_historic_mo_parent_checkbox').is(":checked");
										var mo_affected = $('#alarm_historic_mo_affected').val();
										var mo_affected_checked = $('#alarm_historic_mo_affected_checkbox').is(":checked");
										var classification = $('#alarm_historic_classification').val().trim();

										var filter = {};

										if(specific_problem_checked) filter['SpecificProblem'] = specific_problem;
										if(mo_parent_checked) filter['MoParent'] = mo_parent;
										if(mo_affected_checked) filter['MoAffected'] = mo_affected;
										if(classification) filter['Classification'] = classification;

										
										if(!filter.Classification){
											$.alert('Donnez une classification.');
											return false;
										}else if(!filter.SpecificProblem && !filter.MoParent && !filter.MoAffected){
											$.alert('Donnez au moin une condition.');
											return false;
										}else if(filter.Classification && (filter.SpecificProblem || filter.MoParent || filter.MoAffected)) {

											$.ajax({
												url:'/sites/site_details/updateHistoryAlarm',
												type:'POST',
												data: { filter },
												success: function(response){ 		
												
													// UPDATE BY FORCE SETTING DATATABLE
													history_setting.rows(`[id='${id}']`).data()[0].Classification = classification;
													history_setting.rows(`[id='${id}']`).invalidate();

													$.alert('Updated');

													$('#Historique__' + codeSite + ' tbody').empty();
													setTimeout(() => {
														datatableHistoryAlarm.ajax.reload();
													}, 1000);

													// $.alert(ids.length === 0 ? 'No data has been updated.' : ids.length === 1 ? '1 element has been updated.' : ids.length + ' elements have been updated.');
												},
												error: function(errorRes){ console.log({errorRes}); }
											})
										}
									}
								},
								cancel: {
									text: 'Fermer'
								}
							}
						})
					}
				}
			}
		})
	}
}).on( 'draw.dt', function () {
	// $('#loading').removeClass('hidden');
	// $('#history__setting__' + codeSite).addClass('hidden');
} )
.on( 'init.dt', function () {
	// $('#loading').addClass('hidden');
	// $('#history__setting__' + codeSite).removeClass('hidden');
} )
.on( 'error.dt', function ( e, settings, techNote, message ) {
	console.log( 'An error has been reported by DataTables: ', message );
});
