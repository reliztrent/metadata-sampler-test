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
        "scrollX": true,
        "scrollY": true,
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
        { 'data': 'max_values_in_sample', 'class':'aboutfield-sm'},
        {% for key in site.data.item_loc_fields[0] offset:6 %}
        { 'data': '{{ key[0] }}', 'class':'aboutfield-sm'}{% if forloop.last == false %},{% endif %}
        {% endfor %}
        ]
    } );
    /* Highlight columns with cursor hover */
    $('#search_table tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = table.cell(this).index().column;
 
            $( table.cells().nodes() ).removeClass( 'highlight' );
            $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
        } );
} );