---
layout: none
---

$(document).ready( function () {
    // Add boostrap class to search input
    var data_source = $('#search_table').attr('data_source');
    $('.search_table_filter input').addClass('form-control');

    var table = $('#search_table').DataTable({
        // Load data
        "ajax": {
            url: data_source,
            dataSrc: ''
        },
        // Other configurations
        "processing": true,
        "deferRender": true,
        "paging": false,
        "order": [[ 2, "desc" ]],
        // Columns
        columns: [
        { 'data': 'field', 'class':'aboutfield-md'},
        { 'data': 'used_in', 'class':'aboutfield-sm'},
        { 
            'data': 'used_in_percent',
            render: function(data, type, row, meta) {
                    return type === 'display' ?
                        '<progress value="' + data + '" max="100"></progress>' :
                        data;
                }
        },
        { 'data': 'types', 'class':'aboutfield-sm'},
        { 'data': 'list', 'class':'aboutfield-sm'},
        { 'data': 'max_values_in_sample', 'class':'aboutfield-sm'}
        ]
    } );
    /* Highlight columns with cursor hover */
    $('#search_table tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = table.cell(this).index().column;
 
            $( table.cells().nodes() ).removeClass( 'highlight' );
            $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
        } );
    /* Toggle collection columns on and off */
    /*  Prep the original state of the header and footer rows */
    var header = $('#search_table thead tr');
    var header_content = header.html();
    var footer = $('#search_table tfoot tr');
    var footer_content = footer.html();
    /*  On click, reload table with selected column */
    $( '#select-collection' ).change(function () {
        var selection = $('.form-control option:selected')[0];
        var collection = $(selection).text();
        console.log(collection);
        if (collection == 'Select a collection') {
            table.destroy();
            header.empty();
            footer.empty();
            $('#search_table tbody').empty();
            header.append($(header_content));
            footer.append($(footer_content));            
            table = $('#search_table').DataTable({
                // Load data
                "ajax": {
                    url: 'data/loc_fields.json',
                    dataSrc: ''
                },
                // Other configurations
                "paging": false,
                "order": [[ 2, "desc" ]],
                // Columns
                columns: [
                    { 'data': 'field', 'class':'aboutfield-md'},
                    { 'data': 'used_in', 'class':'aboutfield-sm'},
                    { 
                        'data': 'used_in_percent',
                        render: function(data, type, row, meta) {
                                return type === 'display' ?
                                    '<progress value="' + data + '" max="100"></progress>' :
                                    data;
                            }
                    },
                    { 'data': 'types', 'class':'aboutfield-sm'},
                    { 'data': 'list', 'class':'aboutfield-sm'},
                    { 'data': 'max_values_in_sample', 'class':'aboutfield-sm'}
                ]
            } );
        } else {
            console.log('destorying table. . .')
            table.destroy();
            header.empty();
            footer.empty();
            $('#search_table tbody').empty();
            console.log('rebuilding table. . .');
            header.append($(header_content));
            footer.append($(footer_content));
            $(header).append(`<th>${collection}</th>`);
            $(footer).append(`<th>${collection}</th>`);
            $('#search_table').width('100%');
            table = $('#search_table').DataTable({
                // Load data
                "ajax": {
                    url: 'data/loc_fields.json',
                    dataSrc: ''
                },
                // Other configurations
                "paging": false,
                "order": [[ 2, "desc" ]],
                scrollX: true,
                fixedColumns: true,
                "autoWidth": false,
                // Columns
                columns: [
                    { 'data': 'field', 'class':'aboutfield-md', "width": "40px"},
                    { 'data': 'used_in', 'class':'aboutfield-sm', "width": "15%"},
                    { 
                        'data': 'used_in_percent',
                        render: function(data, type, row, meta) {
                                return type === 'display' ?
                                    '<progress value="' + data + '" max="100"></progress>' :
                                    data;
                            },
                        "width": "15%"
                    },
                    { 'data': 'types', 'class':'aboutfield-sm',"width": "10%"},
                    { 'data': 'list', 'class':'aboutfield-sm',"width": "10%"},
                    { 'data': 'max_values_in_sample', 'class':'aboutfield-sm', "width": "10%"},
                    { 'data': collection, 'class':'aboutfield-sm',"width": "25%"}
                ]
            });
        };
        table.columns.adjust().draw();
    } );
} );