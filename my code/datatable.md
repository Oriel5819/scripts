# DATATABLE

## CODE

### Initialization
```javascript
<table id="table__id" class="table table-striped table-borderless"></table>
```

### Update 
```javascript
$("#tableListView").DataTable().rows("#ANM276_1800").data()[0]["Latence"] = "aaaauuuuuuuuuuuuuuuuuuuuua"

$("#tableListView").DataTable().rows("#ANM276_1800").invalidate()

$("#tableListView").DataTable().rows().invalidate()

```

### Update a full row */
```javascript
if (typeof rowData != 'undefined' && isShow_only == false) {
	row.remove();
	table.row.add(rowData).draw();
}
```

### RawCallback
```
/* ----- fnRowCallBack ------------*/

// to put a data in a cell,
table.cell(nRow, rowId).data(value);

// to get cell data value
table.cell().data(value)

// we need to redraw after cell update
table.cell().data(value).draw()


/* ----- fnRowCallBack ------------*/
```

### Reloading ajax
```
// after every modification
table.ajax.reload();
```

### Getting all the values from a row
```javascript
// 1- set the id

"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
	$(nRow).attr("id", aData.id);
	// $(nRow).off('click').on('click', function(){
	// 	if ($(nRow).hasClass('selected')) {
	// 		$(nRow).removeClass('selected');
	// 	} else {
	// 		// table.$('tr.selected').removeClass('selected');
	// 		$(nRow).addClass('selected');
	// 	}
	// });
	
	ALL THIS COMMENTED SECTION CAN BE REPLACED BY `"select": "single"`
},

"initComplete": function(){
	const id = $(opt.$trigger).attr("id");
	table.rows("[id='" + id + "']").data().toArray()[0]; // return all the values
}
```

### Setting Alfred Slick
```javascript
$('#historySettings').off('click').on('click', function(){
    const codesite = $(this).data("codesite");

    $.slickAlfred('body', {
        title: codesite + " Settings",
        content: `<div>This is settings</div>`,
        overlay: true,
        stick: true,
        centered: true,
        width: "700px",
        height: "400px",
        onInit: function(){
            $.post({
                url: "http://Alfred-Sites:3007/site_details/historyAlarm",
                data: { MO: codesite },
                success: function(response){
                    console.log(response);
                },
                error: function(error){
                    console.log(error);
                }
            })

            // $.post({
            //     url: "/sites/datatable_config/add/0",
            //     data: { container_keys_values, token },
            //     success: function (html) {
            //         container_datatable_.html(html);
            //     },
            //     error: function () {
            //         container_datatable_.html('Une erreur a été rencontrée');
            //     },
            // });
        }
    });
})
```

### Destroy a datatable
```javascript
table.DataTable().clear().destroy()
```

### Empty a database body
```javascript
$('#tableid tbody').empty()
```

### Update by force
```
$('#tableid').DataTable().rows(`[id='${id}']`).data()[0].value = newValue;
$('#tableid').DataTable().rows(`[id='${id}']`).invalidate();
```

```
// example of alfred datatable
example_datatable.js
```

### Show and hide loading slick
```javascript
var myslick = $.slickAlf....
myslick.showLoading()
myslick.hideLoading()
```

### Setting Alfred column head to input
```javascript
initComplete: function(settings, json) {
	replace_header_to_input("#table_appro_carburant thead th");
	datatable_column_search($("#table_appro_carburant").DataTable());
}
function replace_header_to_input(id) {
	$(id).each(function () {
		var title = $(this).text();
		$(this).html('<input type="text" class="search_column" placeholder="' + title + '" style="width:100%"/>');
	});
}
function datatable_column_search(datatable) {
			datatable.columns().every(function () {
				var column = this;
				var timout;
				$('input', this.header()).on('keyup', function (e) {
					var searchInput = this;
					if (typeof (timeout) != 'undefined') clearTimeout(timeout);
					timeout = setTimeout(function () {
						var searchTab = searchInput.value.split(' ');
						var regexSearch = '';
						_.forEach(searchTab, function (keyWord) {
							switch (keyWord.charAt(0)) {
								case '!':
									regexSearch += '(?!.*' + keyWord.substr(1) + ')';
									if (searchTab.indexOf(keyWord) == 0) regexSearch = '^' + regexSearch;
									break;
								default:
									regexSearch += '(?=.*' + keyWord + ')';
							}
						})
						regexSearch += '.*';
						column.search(regexSearch, true, false, true).draw();
						searchInput.focus();
					}, 500);
				})
				$('input', this.header()).on('click', function (e) {
					if (typeof (timeout) != 'undefined') clearTimeout(timeout);
					console.log('tonga ato');
					e.stopPropagation();
				})
			});
		}
```

### CLEAR DATATABLE
```
$('#tableListView').DataTable().clear().draw(false); // false if we do not want to go back to the first page when there are many pages
```

### ADDING ROWS

```
// Single object
$('#tableListView').DataTable().row.add({OBJECT}).draw();

// Array of object
$('#tableListView').DataTable().rows.add([ARRAY]).draw();

```

### DELETING ROWS
```
.rows( '.selected' )
    .remove()
    .draw();
```

### SEARCH
```
$('#tableListView').DataTable()
	.columns('#categorie_technique_').search(searchElement, true, false, true)
	.columns('#Etat_').search(searchElement, true, false, true)
	.columns('#Techno_').search(searchElement, true, false, true)
	.draw();
```


## EXAMPLES

```Javascript

// AVS

function formatDate(input) {
    const date = new Date(input);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

$(document).ready(async function () {

    // LOAD ALL EMAIL

    function columnSettingDetails(siteId, summaryId, tableHeader) {
        var dataColumns = [];
        for (var i = 0; i < tableHeader.length; i++) {
            var datatemp = {};

            if (tableHeader[i] == "checkStatus") {
                datatemp.render = function (data, type, full) {
                    if (data == 'true') {
                        return `<i class="fa-solid fa-check" style="color:green" ></i>`;
                    }
                    else {
                        return `<i class="fa-solid fa-xmark" style="color:red"></i>`;
                    }
                };
            }

            if (tableHeader[i] == "isPost") {
                datatemp.render = function (data, type, full) {
                    return data;
                };
            }

            if (tableHeader[i] == "results") {
                datatemp.filterData = { "type": "string" };
                var editableOptionsResults = {
                    pk: 1,
                    column: "weight",
                    type: 'text',
                    step: 1,
                    emptytext: '',
                    toggle: 'dblclick',
                    url: '/avs/details/update/results',
                    ajaxOptions: {
                        dataType: 'json'
                    },
                    validate: function (newValue) {
                        if (!newValue || newValue.trim() === '') {
                            return 'Veuillez donner une valeur.';
                        }

                        if (!['OK', 'NOK', 'NA'].includes(newValue)) {
                            return 'Utilise "OK" ou "NOK" ou "NA".';
                        }
                    },
                    success: function () {
                        $('#table_summary').DataTable().ajax.reload();

                        console.log($('#table_summary').DataTable());
                        $.alert({
                            title: 'Succès',
                            content: 'Résultat a été mise à jour'
                        });
                    },
                    error: function (error) {
                        $.alert({
                            title: 'Erreur',
                            content: 'Erreur on modifiant le resultat.'
                        });
                    }
                };

                datatemp.fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
                    var tdID = oData.id;
                    $(nTd).attr("id", tdID);
                    $(nTd).editable(editableOptionsResults);
                    $.fn.editable.defaults.mode = 'inline';
                };
            }
            if (tableHeader[i] == "comments") {
                datatemp.filterData = { "type": "string" };
                var editableOptionsComments = {
                    pk: 1,
                    column: "weight",
                    type: 'text',
                    step: 1,
                    emptytext: '',
                    toggle: 'dblclick',
                    url: '/avs/details/update/comments',
                    ajaxOptions: {
                        dataType: 'json'
                    },
                    success: function () {
                        $('#table_summary').DataTable().ajax.reload();

                        $.alert({
                            title: 'Succès',
                            content: 'Comments a été mise à jour'
                        });

                    }, error: function (error) {
                        $.alert({
                            title: 'Erreur',
                            content: 'Erreur on modifiant le commentaire.'
                        });
                    }
                };

                datatemp.fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
                    var tdID = oData.id;
                    $(nTd).attr("id", tdID);
                    $(nTd).editable(editableOptionsComments);
                    $.fn.editable.defaults.mode = 'inline';
                };
            }

            datatemp.data = tableHeader[i];
            dataColumns.push(datatemp);
        }

        return dataColumns;
    }

    function columnSettingSummary(tableHeader) {
        var dataColumns = [];
        for (var i = 0; i < tableHeader.length; i++) {
            var datatemp = {};
            datatemp.data = tableHeader[i];
            dataColumns.push(datatemp);
        }
        return dataColumns;
    }

    function drawDataTableDetails(siteId, launchedAt, TableName, TableHeader, data_routes) {

        var tableAttachedAlarm = null;

        tableAttachedAlarm = TableName.DataTable({
            "dom": '<"bottom-left"l>Bfrtip',
            "buttons": [
                {
                    extend: 'excel',
                    text: '<i class="fa-regular fa-file-excel"></i>',
                    title: siteId + ' DETAILS',
                    filename: 'AVS_DETAILS_FOR_' + siteId,
                    header: TableHeader.map(item => item.data.toUpperCase())
                },
                {
                    text: '<i class="fa-regular fa-envelope"></i>',
                    className: 'custom-button',
                    action: function (e, dt, button, config) {
                        var summaryId = $(TableName).attr("summaryid");
                        var siteId = $(TableName).attr("siteid");
                        var launchedAt = $(TableName).attr("launchedat");
                        mail_slick(siteId, summaryId, launchedAt);
                    }
                },
            ],
            "data": data_routes,
            "order": [
                [4, 'asc'],
                [1, 'asc']
            ],
            "destroy": true,
            "deferRender": false,
            "bSortClasses": false,
            "columns": TableHeader,
            "search": {
                "regex": true
            },
            "select": { style: 'single' },
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                $(nRow).attr('data-siteCode', aData.siteCode);
                $(nRow).attr('data-techno', aData.techno);
                $(nRow).attr('data-day', aData.day);
                $(nRow).attr('data-isPost', aData.isPost);
                $(nRow).attr('data-item', aData.item);
                $(nRow).attr('data-launchedAt', aData.launchedAt);
            },
            "initComplete": function () {

                // REORGANIZE DATATABLE
                // Select the elements and rearrange their order
                var container = $('#' + $(TableName).attr('id') + '_wrapper');
                var bottomLeft = container.find(".bottom-left");
                var dtButtons = container.find(".dt-buttons");
                var dataTablesFilter = container.find(".dataTables_filter");
                var dataTable = container.find(".table");
                var dataTablesPaginate = container.find(".dataTables_paginate");

                // Remove the elements from their current positions
                dtButtons.detach();
                dataTablesFilter.detach();
                dataTable.detach();
                bottomLeft.detach();
                dataTablesPaginate.detach();

                // Append the elements in the desired order
                container.append(dtButtons);
                container.append(dataTablesFilter);
                container.append(dataTable);
                container.append(bottomLeft);
                container.append(dataTablesPaginate);

                var subContainer1 = $('<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center">').addClass("sub-container sub-container-1");
                var subContainer2 = $('<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center">').addClass("sub-container sub-container-2");
                var divsToWrap1 = $("#" + $(TableName).attr('id') + '_wrapper' + " > .dt-buttons, #" + $(TableName).attr('id') + '_wrapper' + " > .dataTables_filter");
                var divsToWrap2 = $("#" + $(TableName).attr('id') + '_wrapper' + " > .bottom-left, #" + $(TableName).attr('id') + '_wrapper' + " > .dataTables_paginate");
                divsToWrap1.wrapAll(subContainer1);
                divsToWrap2.wrapAll(subContainer2);

                // REORGANIZE DATATABLE

                $('#table_details').contextMenu({
                    selector: "tbody tr",
                    items: {
                        log: {
                            name: 'Log',
                            icon: "fa-terminal",
                            callback: function (key, opt) {

                                var siteCode = opt.$trigger.attr('data-siteCode');
                                var techno = opt.$trigger.attr('data-techno');
                                var day = opt.$trigger.attr('data-day');
                                var isPost = opt.$trigger.attr('data-isPost');
                                var item = opt.$trigger.attr('data-item');
                                var dateTime = opt.$trigger.attr('data-launchedAt');

                                var attachAlarm_slick = $.slickAlfred('body', {
                                    title: `Log [${siteId}] [${launchedAt}] [${item}]`,
                                    // content: `
                                    // <style>
                                    //     .log_wrapper{
                                    //     }
                                    // </style> 
                                    // <div class='log_wrapper'>
                                    //     <div id="logs_launched_at"></div>
                                    //     </br>
                                    //     <div id="logs_content"></div>
                                    // </div>`,
                                    content: `
                                        <style>
                                            .d2h-file-list, .d2h-file-list-header {
                                                display: none !important;
                                            }
                                            .d2h-file-name, .d2h-code-line-prefix {
                                                display: none !important;
                                            }
                                            .d2h-file-stats{
                                            display: none !important;
                                            }
                                            .d2h-file-stats{
                                            display: none !important;
                                            }
                                            .d2h-changed{
                                            display: none !important;
                                            }
                                            .d2h-code-line-ctn{
                                                width: auto !important;
                                            }
                                            #logs_launched_at, #logs_content{
                                                background-color: white;
                                                width: 100%;
                                                border: 1px solid #dddddd;
                                                display: flex;
                                                justify-content: center;
                                                align-item: center;

                                                white-space:pre;
                                            }
                                        </style>
                                        <div id="logs_launched_at"></div>
                                        <div id="logs_content"></div>`,
                                    width: "100%",
                                    onInit: async function () {

                                        var { launchedAt, data } = await getDetailsLogs(siteCode, techno, item, dateTime);

                                        // document.getElementById("logs_launched_at").innerHTML = launchedAt;

                                        $('#logs_launched_at').append(`<div>Date: ${launchedAt}</div>`);
                                        $('#logs_content').append(data);

                                    },
                                    height: "auto",
                                    centered: true,
                                    buttons: [
                                        {
                                            text: "FERMER",
                                            class: "btn btn-default",
                                        }
                                    ]
                                });
                            }
                        },
                        // comparison: {
                        //     name: `Line-by-line Comparison`,
                        //     icon: "fa-code-compare",
                        //     callback: function (key, opt) {


                        //         var techno = opt.$trigger.attr('data-techno');
                        //         var day = opt.$trigger.attr('data-day');
                        //         var isPost = opt.$trigger.attr('data-isPost');
                        //         var item = opt.$trigger.attr('data-item');

                        //         var attachAlarm_slick = $.slickAlfred('body', {
                        //             title: 'Comparison',
                        //             content: `
                        //             <style>
                        //             .d2h-file-list-header {
                        //                 display: none !important;
                        //             }
                        //             .d2h-file-name {
                        //                         display: none !important;
                        //             }
                        //             .d2h-file-stats{
                        //             display: none !important;
                        //             }
                        //             .d2h-file-stats{
                        //             display: none !important;
                        //             }
                        //             .d2h-changed{
                        //             display: none !important;
                        //             }    
                        //             </style>

                        //             <div id="comparison_content">
                        //                       </div>`,
                        //             width: "100%",
                        //             onInit: async function () {

                        //                 var data = await getDetailsComparison(techno, day, isPost, item);

                        //                 var targetElement = document.getElementById('comparison_content');
                        //                 var configuration = {
                        //                     drawFileList: true,
                        //                     fileListToggle: false,
                        //                     fileListStartVisible: false,
                        //                     fileContentToggle: false,
                        //                     matching: 'lines',
                        //                     outputFormat: 'line-by-line',
                        //                     synchronisedScroll: true,
                        //                     highlight: true,
                        //                     renderNothingWhenEmpty: false,
                        //                     showFiles: true,
                        //                 };
                        //                 var diff2htmlUi = new Diff2HtmlUI(targetElement, data.data, configuration);
                        //                 diff2htmlUi.draw();
                        //                 diff2htmlUi.highlightCode();


                        //             },
                        //             height: "auto",
                        //             centered: true,
                        //             buttons: [
                        //                 {
                        //                     text: "FERMER",
                        //                     class: "btn btn-default",
                        //                 }
                        //             ]
                        //         });
                        //     }
                        // },
                        comparison2: {
                            name: `Comparison`,
                            icon: "fa-code-compare",
                            callback: function (key, opt) {
                                var siteCode = opt.$trigger.attr('data-siteCode');
                                var techno = opt.$trigger.attr('data-techno');
                                var day = opt.$trigger.attr('data-day');
                                var isPost = opt.$trigger.attr('data-isPost');
                                var item = opt.$trigger.attr('data-item');
                                var dateTime = opt.$trigger.attr('data-launchedAt');

                                var attachAlarm_slick = $.slickAlfred('body', {
                                    title: 'Comparison',
                                    content: `
                                    <style>
                                        .d2h-file-list, .d2h-file-list-header {
                                            display: none !important;
                                        }
                                        .d2h-file-name, .d2h-code-line-prefix {
                                            display: none !important;
                                        }
                                        .d2h-file-stats{
                                        display: none !important;
                                        }
                                        .d2h-file-stats{
                                        display: none !important;
                                        }
                                        .d2h-changed{
                                        display: none !important;
                                        }
                                        .d2h-code-line-ctn{
                                            width: auto !important;
                                        }
                                         .d2h-files-diff{
                                            display: flex;
                                            gap: 5px;
                                        }
                                        .d2h-file-diff{
                                            background-color: red;
                                        }
                                        #logs_launched_at{
                                            background-color: white;
                                            width: 100%;
                                            border: 1px solid #dddddd;
                                            display: flex;
                                            justify-content: space-around;
                                            align-item: center;
                                        }
                                        #comparison_contenaire{
                                            display: flex;
                                            flex-direction: row;
                                            justify-content: space-between;
                                            align-item: center;
                                        }
                                        .each-comparison-content{
                                            display: inline-block; 
                                            background-color: white; 
                                            padding: 10px; 
                                            border: 1px solid #dddddd;
                                            width:50%;
                                            overflow: scroll;

                                            white-space:pre;
                                        }
                                    </style>

                                    <div id="logs_launched_at"></div>
                                    <div id="comparison_contenaire">
                                              </div>`,
                                    width: "100%",
                                    onInit: async function () {

                                        var { previousLog, currentLog, previousLogHtml, currentLogHtml } = await getDetailsComparison(siteCode, techno, item, dateTime);

                                        $('#logs_launched_at').append(`<div>Date: ${previousLog.launchedAt}</div>`);
                                        $('#logs_launched_at').append(`<div>Date: ${currentLog.launchedAt}</div>`);


                                        $('#comparison_contenaire').append(previousLogHtml);
                                        $('#comparison_contenaire').append(currentLogHtml);
                                    },
                                    height: "auto",
                                    centered: true,
                                    buttons: [
                                        {
                                            text: "FERMER",
                                            class: "btn btn-default",
                                        }
                                    ]
                                });
                            }
                        }
                    }
                });

            },
        });
        return tableAttachedAlarm;
    }

    function detailsSlick(siteId, summaryId, launchedAt) {
        var attachAlarm_slick = $.slickAlfred('body', {
            title: `Détailes [${siteId}] [${launchedAt}]`,
            content: `
                    <div class="">
                        <div class="row">
                            <div class="mt">
                                <table class="table table-stripped" cellspacing='0' width='100%' id="table_details" siteid="${siteId}" summaryid="${summaryId}" launchedat="${launchedAt}">
                                    <thead>
                                        <tr>
                                            <th>item Number</th>
                                            <th>item</th>
                                            <th>day</th>
                                            <th>check</th>
                                            <th>techno</th>
                                            <th>results</th>
                                            <th>comments</th>
                                            <th>log comparison</th>
                                            <th>launched At</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    `,
            width: "90%",
            onInit: async function () {

                var list_viewID_details = $('#table_details');
                var dataTableHeader_Details = columnSettingDetails(siteId, summaryId, dataTableHeaderDetails);
                var DetailsData = await getDetailsBySiteId(siteId, launchedAt);
                window.DataTable_table_settings_details = null;
                window.DataTable_table_settings_details = drawDataTableDetails(siteId, launchedAt, list_viewID_details, dataTableHeader_Details, DetailsData);

                $('#table_details thead th').each(function () {
                    var title = $(this).text().trim();
                    $(this).html('<input type="text" class="search_column" placeholder="' + title.toUpperCase() + '" />');
                });

                datatable_column_search($(`#table_details`).DataTable());

            },
            height: "auto",
            centered: true,
            buttons: [
                {
                    text: "FERMER",
                    class: "btn btn-default",
                }
            ]
        });
    }

    function drawDataTableSummary(siteId, TableName, TableHeader, summaryUrl) {

        var tableAttachedAlarm = null;

        tableAttachedAlarm = TableName.DataTable({
            "ajax": {
                "url": summaryUrl,
                "dataSrc": function (data) {
                    return data;
                }
            },
            "order": [4, 'desc'],
            // "data": data_routes,
            "dom": '<"bottom-left"l>Bfrtip',
            "buttons": [
                {
                    extend: 'excel',
                    filename: 'AVS_SUMMARY_FOR_' + siteId,
                    text: '<i class="fa-regular fa-file-excel"></i>',
                    title: siteId + ' SUMMARY',
                    header: TableHeader.map(item => item.data.toUpperCase())
                }
            ],
            "destroy": true,
            "deferRender": true,
            "bSortClasses": false,
            "columns": TableHeader,
            "search": {
                "regex": true
            },
            "select": { style: 'single' },
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                $(nRow).attr('id', aData.launchedAt.match(/[0-9]/g).join(""));
                $(nRow).attr('site', siteId);
                $(nRow).attr('launchedAt', aData.launchedAt);
            },
            "initComplete": function () {

                // REORGANIZE DATATABLE
                // Select the elements and rearrange their order
                var container = $('#' + $(TableName).attr('id') + '_wrapper');
                var bottomLeft = container.find(".bottom-left");
                var dtButtons = container.find(".dt-buttons");
                var dataTablesFilter = container.find(".dataTables_filter");
                var dataTable = container.find(".table");
                var dataTablesPaginate = container.find(".dataTables_paginate");

                // Remove the elements from their current positions
                dtButtons.detach();
                dataTablesFilter.detach();
                dataTable.detach();
                bottomLeft.detach();
                dataTablesPaginate.detach();

                // Append the elements in the desired order
                container.append(dtButtons);
                container.append(dataTablesFilter);
                container.append(dataTable);
                container.append(bottomLeft);
                container.append(dataTablesPaginate);

                var subContainer1 = $('<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center">').addClass("sub-container sub-container-1");
                var subContainer2 = $('<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center">').addClass("sub-container sub-container-2");
                var divsToWrap1 = $("#" + $(TableName).attr('id') + '_wrapper' + " > .dt-buttons, #" + $(TableName).attr('id') + '_wrapper' + " > .dataTables_filter");
                var divsToWrap2 = $("#" + $(TableName).attr('id') + '_wrapper' + " > .bottom-left, #" + $(TableName).attr('id') + '_wrapper' + " > .dataTables_paginate");
                divsToWrap1.wrapAll(subContainer1);
                divsToWrap2.wrapAll(subContainer2);

                // REORGANIZE DATATABLE

                $('#table_summary tbody tr').on('dblclick', function () {
                    var summaryId = $(this).attr('id');
                    var siteId = $(this).attr('site');
                    var launchedAt = $(this).attr('launchedAt');
                    detailsSlick(siteId, summaryId, launchedAt);
                });

                $('#table_summary').contextMenu({
                    selector: "tbody tr",
                    items: {
                        details: {
                            name: `Détailes`,
                            icon: "fa-regular fa-list fa-lg",
                            callback: function (key, opt) {
                                var summaryId = opt.$trigger.attr('id');
                                var siteId = opt.$trigger.attr('site');
                                var launchedAt = opt.$trigger.attr('launchedAt');
                                detailsSlick(siteId, summaryId, launchedAt);
                            }
                        },
                        mail: {
                            name: `Mail`,
                            icon: "fa-regular fa-envelope fa-lg",
                            callback: function (key, opt) {
                                var summaryId = opt.$trigger.attr('id');
                                var siteId = opt.$trigger.attr('site');
                                var launchedAt = opt.$trigger.attr('launchedAt');
                                mail_slick(siteId, summaryId, launchedAt);
                            }
                        }
                    },
                });
            },
        });
        return tableAttachedAlarm;
    }

    function columnSettingClassification(tableHeader) {
        var dataColumns = [];
        for (var i = 0; i < tableHeader.length; i++) {
            var datatemp = {};

            if (tableHeader[i] == "siteId") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "siteName") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "activity") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }


            if (tableHeader[i] == "radioScope") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "currentConfig") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "finalConfig") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "scenario") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "integrationPlanDate") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return formatDate(data);
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "baseband1") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "baseband2") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "baseband3") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return data;
                    }
                    else {
                        return "";
                    }

                };
            }

            if (tableHeader[i] == "gsmOamIpAddress") {
                datatemp.filterData = { "type": "string" };
                var editableOptionsGsmIpAddress = {
                    pk: "gsmOamIpAddress",
                    column: "weight",
                    type: 'text',
                    step: 1,
                    emptytext: '',
                    toggle: 'dblclick',
                    url: '/avs/inputs/update/ipAddress',
                    ajaxOptions: {
                        dataType: 'json'
                    },
                    validate: function (newValue) {
                        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

                        if (!newValue || newValue.trim() === '') {
                            return 'Veuillez donner une valeur.';
                        }

                        if (!ipv4Regex.test(newValue)) {
                            return 'Veuillez entrer un Ip.';
                        }
                    },
                    success: function () {
                        $('#table_settings_avs').DataTable().ajax.reload();

                        $.alert({
                            title: 'Succès',
                            content: 'Adresse IP de GSM (2G) a été mise à jour'
                        });

                    }, error: function (error) {
                        $.alert({
                            title: 'Erreur',
                            content: 'Erreur on modifiant l\'adresse IP de GSM (2G).'
                        });
                    }
                };

                datatemp.fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
                    var tdID = oData.siteId;
                    $(nTd).attr("id", tdID);
                    $(nTd).editable(editableOptionsGsmIpAddress);
                    $.fn.editable.defaults.mode = 'inline';
                };
            }

            if (tableHeader[i] == "wcdmaOamIpAddress") {
                datatemp.filterData = { "type": "string" };
                var editableOptionsWcdmaIpAddress = {
                    pk: "wcdmaOamIpAddress",
                    column: "weight",
                    type: 'text',
                    step: 1,
                    emptytext: '',
                    toggle: 'dblclick',
                    url: '/avs/inputs/update/ipAddress',
                    ajaxOptions: {
                        dataType: 'json'
                    },
                    validate: function (newValue) {
                        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

                        if (!newValue || newValue.trim() === '') {
                            return 'Veuillez donner une valeur.';
                        }

                        if (!ipv4Regex.test(newValue)) {
                            return 'Veuillez entrer un Ip.';
                        }
                    },
                    success: function () {
                        $('#table_settings_avs').DataTable().ajax.reload();

                        $.alert({
                            title: 'Succès',
                            content: 'Adresse IP de WCDMA (3G) a été mise à jour'
                        });

                    }, error: function (error) {
                        $.alert({
                            title: 'Erreur',
                            content: 'Erreur on modifiant l\'adresse IP de WCDMA (3G).'
                        });
                    }
                };

                datatemp.fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
                    var tdID = oData.siteId;
                    $(nTd).attr("id", tdID);
                    $(nTd).editable(editableOptionsWcdmaIpAddress);
                    $.fn.editable.defaults.mode = 'inline';
                };
            };

            if (tableHeader[i] == "lteOamIpAddress") {
                datatemp.filterData = { "type": "string" };
                var editableOptionsLteIpAddress = {
                    pk: "lteOamIpAddress",
                    column: "weight",
                    type: 'text',
                    step: 1,
                    emptytext: '',
                    toggle: 'dblclick',
                    url: '/avs/inputs/update/ipAddress',
                    ajaxOptions: {
                        dataType: 'json'
                    },
                    validate: function (newValue) {
                        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

                        if (!newValue || newValue.trim() === '') {
                            return 'Veuillez donner une valeur.';
                        }

                        if (!ipv4Regex.test(newValue)) {
                            return 'Veuillez entrer un Ip.';
                        }
                    },
                    success: function () {
                        $('#table_settings_avs').DataTable().ajax.reload();

                        $.alert({
                            title: 'Succès',
                            content: 'Adresse IP de LTE (4G) a été mise à jour'
                        });

                    }, error: function (error) {
                        $.alert({
                            title: 'Erreur',
                            content: 'Erreur on modifiant l\'adresse IP de LTE (4G).'
                        });
                    }
                };

                datatemp.fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
                    var tdID = oData.siteId;
                    $(nTd).attr("id", tdID);
                    $(nTd).editable(editableOptionsLteIpAddress);
                    $.fn.editable.defaults.mode = 'inline';
                };
            }

            if (tableHeader[i] == "createdAt") {
                datatemp.render = function (data, type, full) {
                    if (data != "null" || typeof data != "undefined") {
                        return formatDate(data);
                    }
                    else {
                        return "";
                    }

                };
            }
            datatemp.data = tableHeader[i];
            dataColumns.push(datatemp);
        }
        return dataColumns;
    }

    function drawDataTableInput(TableName, TableHeader,) {

        var tableAttachedAlarm = null;

        tableAttachedAlarm = TableName.DataTable({
            "ajax": {
                "url": "/avs/inputs/all",
                "dataSrc": function (data) {
                    return data;
                }
            },
            "destroy": true,
            "deferRender": true,
            "bSortClasses": false,
            "columns": TableHeader,
            "search": {
                "regex": true
            },
            "select": { style: 'single' },
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                $(nRow).attr('id', aData.siteId);
                var siteId = aData.siteId;
            },
            "initComplete": function () {
                $('#table_settings_avs').contextMenu({
                    selector: "tbody tr",
                    items: {
                        summary: {
                            name: "Résumé",
                            icon: "fa-regular fa-eye fa-lg",
                            callback: function (key, opt) {
                                var siteId = opt.$trigger.attr('id');
                                var summarySlick = $.slickAlfred('body', {
                                    title: 'Résumé [' + siteId + ']',
                                    content: `                                  
                                    <div class="">
                                        <div class="row">
                                            <div class="mt">
                                                <table class="table table-stripped" cellspacing='0' width='100%' id="table_summary">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>results</th>
                                                            <th>comments</th>
                                                            <th>checkType</th>
                                                            <th>launchedAt</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    `,
                                    height: "95%",
                                    width: "95%",
                                    onInit: async function () {

                                        var list_viewID_summary = $('#table_summary');
                                        var summaryUrl = `avs/summary/${siteId}`;
                                        var dataTableHeader_Summary = columnSettingSummary(dataTableHeaderSummary);

                                        // var summaryData = await getSummaryBySiteId(siteId);

                                        window.DataTable_table_settings_summary = null;

                                        // DIRECTLY USING DATA
                                        // window.DataTable_table_settings_summary = drawDataTableSummary(siteId, list_viewID_summary, dataTableHeader_Summary, summaryData);

                                        // LOADING DATA THROUGH AJAX
                                        window.DataTable_table_settings_summary = drawDataTableSummary(siteId, list_viewID_summary, dataTableHeader_Summary, summaryUrl);


                                        $('#table_summary thead th').each(function () {
                                            var title = $(this).text().trim();
                                            $(this).html('<input type="text" class="search_column" placeholder="' + title.toUpperCase() + '" />');
                                        });

                                        datatable_column_search($(`#table_summary`).DataTable());


                                    },
                                    height: "auto",
                                    centered: true,
                                    buttons: [
                                        {
                                            text: "FERMER",
                                            class: "btn btn-default",
                                        }
                                    ]
                                });
                            }
                        },
                        check: {
                            name: "Check",
                            icon: "fa-regular fa-gears fa-lg",
                            callback: function (key, opt) {
                                var siteId = opt.$trigger.attr('id');
                                $.confirm({
                                    title: 'Confirmation!',
                                    content: 'Voulez-vous vraiment lancer un nouveau check?',
                                    boxWidth: '80%',
                                    buttons: {
                                        confirm: {
                                            text: 'Lancer',
                                            action: function () {
                                                $.ajax({
                                                    url: '/avs/check/' + siteId,
                                                    type: 'GET',
                                                    processData: false,
                                                    contentType: false,
                                                    success: async function (response) {
                                                        $.alert({
                                                            title: 'Succès',
                                                            content: `Un check pour "${siteId}" a été lancé.`
                                                        });
                                                    },
                                                    error: function (error) {
                                                        $.alert({
                                                            title: 'Erreur',
                                                            content: 'Échec de lancement de check.'
                                                        });
                                                    }
                                                });
                                            },
                                        },
                                        cancel: {
                                            text: 'FERMER',
                                            action: function () {
                                                $.alert({
                                                    title: 'Succès',
                                                    content: 'Check annulé!'
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        },
                        shyncroIp: {
                            name: "Synchro Ip",
                            icon: "fa-regular fa-refresh fa-lg",
                            callback: function (key, opt) {
                                var siteId = opt.$trigger.attr('id');
                                $.confirm({
                                    title: 'Confirmation!',
                                    content: 'Voulez-vous syncroniser l\' IP de ce site?',
                                    boxWidth: '80%',
                                    buttons: {
                                        confirm: {
                                            text: 'Synchroniser',
                                            action: function () {
                                                $.ajax({
                                                    url: '/avs/inputs/synchroIpAddress/' + siteId,
                                                    type: 'GET',
                                                    processData: false,
                                                    contentType: false,
                                                    success: async function (response) {

                                                        // REMOVE FROM THE DATATABLE
                                                        $('#table_settings_avs').DataTable().draw(false);

                                                        $.alert({
                                                            title: 'Succès',
                                                            content: `L\'IP du site "${siteId}" a été mis à jour\n
                                                            ${response['2G'] ? 'GSM: ' + response['2G'] : ''}\n
                                                            ${response['3G'] ? 'WCDMA: ' + response['3G'] : ''}\n
                                                            ${response['4G'] ? 'LTE: ' + response['4G'] : ''}.`
                                                        });
                                                    },
                                                    error: function (error) {
                                                        $.alert({
                                                            title: 'Erreur',
                                                            content: `Échec de synchronisation de l\'IP du site "${siteId}".`
                                                        });
                                                    }
                                                });
                                            },
                                        },
                                        cancel: {
                                            text: 'FERMER',
                                            action: function () {
                                                $.alert({
                                                    title: 'Succès',
                                                    content: 'Annulé!'
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        },
                        delete: {
                            name: "Supprimer",
                            icon: "fa-regular fa-trash fa-lg",
                            callback: function (key, opt) {
                                var siteId = opt.$trigger.attr('id');

                                $.confirm({
                                    title: 'Confirmation!',
                                    content: 'Voulez-vous vraiment supprimer ce site?',
                                    boxWidth: '80%',
                                    buttons: {
                                        confirm: {
                                            text: 'Supprimer',
                                            action: function () {
                                                $.ajax({
                                                    url: '/avs/inputs/remove/' + siteId,
                                                    type: 'DELETE',
                                                    processData: false,
                                                    contentType: false,
                                                    success: async function (response) {

                                                        // REMOVE FROM THE DATATABLE
                                                        $('#table_settings_avs').DataTable().rows('.selected').remove().draw(false);

                                                        $.alert({
                                                            title: 'Succès',
                                                            content: `"${siteId}" a été supprimé.`
                                                        });
                                                    },
                                                    error: function (error) {
                                                        $.alert({
                                                            title: 'Erreur',
                                                            content: `Échec de suppression du site "${siteId}".`
                                                        });
                                                    }
                                                });
                                            },
                                        },
                                        cancel: {
                                            text: 'FERMER',
                                            action: function () {
                                                $.alert({
                                                    title: 'Succès',
                                                    content: 'Annulé!'
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        },
                    }
                });
            },

        });
        return tableAttachedAlarm;
    }

    var list_viewID_avs = $('#table_settings_avs');
    var dataTableHeade_Inputs = columnSettingClassification(dataTableHeadeInputs);
    window.DataTable_table_settings_avs = null;
    window.DataTable_table_settings_avs = drawDataTableInput(list_viewID_avs, dataTableHeade_Inputs);

    $('#table_settings_avs thead th').each(function () {
        var title = $(this).text().trim();
        $(this).html('<input type="text" class="search_column" placeholder="' + title.toUpperCase() + '" />');
    });

    datatable_column_search($(`#table_settings_avs`).DataTable());

});


// CLIENT MONITOR LIST VIEW 
// ip -> client monitor

$(document).ready(function () {

        $('#resumeDatatable').DataTable({
            "ajax": {
                "url": `client_monitor_list_view/getResume/${groupId}`,
                "dataSrc": function (data) {
                    return data;
                } 
            },
            "columns": [
                { "data": "description", "title": "" },
                { "data": "target", "title": "Target" },
                { "data": "m-2", "title": "M-2" },
                { "data": "m-1", "title": "M-1" },
                { "data": "m-0", "title": "M" }
            ],
            "columnDefs": [
                {
                    "targets": 0,
                    "orderable": false,
                    "type": "custom-sort",
                },
                {
                    "targets": "_all",
                    "createdCell": function(td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center'); 
                        $(td).css('vertical-align', 'middle'); 
                    }
                }
            ],
            "order": []
        });

        $.fn.dataTable.ext.type.order['custom-sort'] = function(data) {
            var order = ["Average availability", "Percentage of fulfilled availability class subscribe", "Percentage of customers non compliant to target"];
            return order.indexOf(data);
        };        
    });


```

