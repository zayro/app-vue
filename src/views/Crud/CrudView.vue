<script setup>
import { onMounted } from "vue";
import $ from "jquery";

import DataTable from "datatables.net";
import bootstrap5 from "datatables.net-bs5/js/dataTables.bootstrap5.min.js";
import buttons from "datatables.net-buttons-bs5";

import fixedheader from "datatables.net-fixedheader-bs5";
import colreorder from "datatables.net-colreorder-bs5";
import Scroll from "datatables.net-scroller-bs5";
import Select from "datatables.net-select-bs5";
import html5 from "datatables.net-buttons/js/buttons.html5.min.js";
import print from "datatables.net-buttons/js/buttons.print.min.js";
import colVis from "datatables.net-buttons/js/buttons.colVis.min.js";
import flash from "datatables.net-buttons/js/buttons.flash.min.js";
import staterestore from "datatables.net-staterestore-bs5";
import { getUsers } from "../../api/RequestUsers";

import "jszip/dist/jszip.min.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
window.$ = $;
new DataTable(window, $);

pdfMake.vfs = pdfFonts.pdfMake.vfs;

fixedheader();
colreorder();
Select();
Scroll();
html5();
print();
colVis();
flash();
staterestore();
bootstrap5();
buttons();

getUsers()
  .then((result) => {
    console.log("🚧 - getUsers.then - result", result);
    $("#loadtable").DataTable({
      data: [
        {
          id: 1,
          name: "Tiger Nixon",
          position: "System Architect",
          salary: "$3,120",
          start_date: "2011/04/25",
          office: "Edinburgh",
          extn: 5421,
        },
        {
          id: 2,
          name: "Garrett Winters",
          position: "Director",
          salary: "5300",
          start_date: "2011/07/25",
          office: "Edinburgh",
          extn: "8422",
        },
      ],
      columns: [
        {
          visible: true,
          searchable: false,
          className: "dt-center",
          // width: '80px',
          render: function (data, type, full) {
            return `
        <div class="text-center">
        <button class="btn btn-outline-primary btn-sm edit">
        <span class="material-icons material-icons-outlined">edit</span>
        </button>
        <button class="btn btn-outline-danger btn-sm delete">
        <span class="material-icons material-icons-outlined">delete</span>
        </button>
        </div>
        `;
          },
        },
        { title: "id", data: "id" },
        { title: "name", data: "name" },
      ],
      destroy: true,
      responsive: true,
      stateSave: true,
      order: [[1, "desc"]],
      pagingType: "full_numbers",
      paging: true,
      info: true,
      ordering: true,
      processing: false,
      searching: true,
      colReorder: true,
      fixedHeader: true,
      scrollY: 500,
      dom:
        "<'row'<'col-sm-6'B><'col-sm-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-4'i><'col-sm-4 text-center'l><'col-sm-4'p>>",
      // dom: 'Bfrtilp',
      buttons: [
        {
          extend: "copy",
          titleAttr: "Copiar",
          className: "btn ",
        },
        {
          extend: "excel",
          className: "btn ",
        },

        {
          extend: "csv",
          className: "btn ",
        },
        {
          extend: "pdf",
          className: "btn ",
        },

        {
          text: '<a><i  class="fa fa-print"></i><a/> Documento',
          className: "btn ",
          action: function (dt) {
            console.log("* ~ file: table.js ~ line 684 ~ dt", dt);
          },
        },
      ],
      rowCallback: (row, data, index) => {
        // console.log('* ~ file: table.js ~ line 210 ~ data', data)
        // console.log('* ~ file: table.js ~ line 721 ~ row', row)
        // Unbind first in order to avoid any duplicate handler
        // $('td', row).unbind('click');

        return row;
      },
    });
  })
  .catch((err) => {
    console.log("🚧 - getUsers.then - err", err);
  });

onMounted(() => {});
</script>

<template>
  <div class="container-fluid fluid">
    <table id="loadtable" class="table table-striped table-bordered"></table>
  </div>
</template>

<style scoped>
@import "animate.css";

.fluid {
  margin-top: 250px;
}
</style>
