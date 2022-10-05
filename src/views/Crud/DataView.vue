<script setup>
import { onMounted } from "vue";
import $ from "jquery";

import "datatables.net";

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

import DataTable from "datatables.net-vue3";

import "jszip/dist/jszip.min.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(Select);
DataTable.use(buttons);
DataTable.use(Scroll);
DataTable.use(colreorder);
DataTable.use(fixedheader);
DataTable.use(html5);
DataTable.use(print);
DataTable.use(flash);
DataTable.use(colVis);
DataTable.use(staterestore);
DataTable.use(bootstrap5);

let records = [
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
];

const columns = [
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
];

const options = {
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
      extend: "pdfHtml5",
      className: "btn ",
    },
    {
      extend: "print",
      className: "btn ",
    },
    {
      extend: "colvis",
      className: "btn ",
    },
    {
      extend: "createState",
      className: "btn ",
    },
    {
      extend: "savedStates",
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
};

getUsers()
  .then((result) => {
    console.log("🚧 - getUsers.then - result", result);
    records = result.data;
  })
  .catch((err) => {
    console.log("🚧 - getUsers.then - err", err);
  });

onMounted(() => {
  //table.buttons().container().appendTo($(".botonera", table.table().container()));

  $(".dt-buttons").appendTo(".botonera");
  $(".dataTables_filter").appendTo(".filter");
});
</script>

<template>
  <div class="container fluid">
    <div class="card mb-3">
      <!-- <div class="card-header">Config Color</div> -->
      <div class="card-body">
        <div class="card-title">Datatable.net</div>
        <hr />
        <div class="column">
          <div class="col">
            <div class="botonera"></div>
          </div>

          <div class="col">
            <div class="filter"></div>
          </div>
          <div class="col mb-3">
            <DataTable
              :data="records"
              :columns="columns"
              :options="options"
              class="table table-sm"
            >
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "animate.css";

.botonera {
  display: flex;
  justify-content: space-around;
  justify-items: space-around;
  align-items: stretch;
}
</style>
