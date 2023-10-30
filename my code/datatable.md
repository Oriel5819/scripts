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
$('#tableListView').DataTable().clear().draw();
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

