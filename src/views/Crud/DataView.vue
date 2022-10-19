<script setup>
import { onMounted, ref, computed, watch } from "vue";

import { getUsers } from "../../api/RequestUsers";

//SECTION - Logic

//ANCHOR -  Data Handler State of View
let records = ref([]);
let recordsFiltered = ref([]);
let recordsShowTable = ref([]);
let search = ref("");
let paginationLimit = ref(20);
let paginationPage = ref([]);
let paginationPageTotal = ref(0);
let paginationPagePosition = ref({});

const pageLimit = computed({
  // getter
  get() {
    return paginationLimit.value;
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    paginationLimit.value = newValue.split(" ");
  },
});

const column = ["uid", "name", "phone", "address"];

//ANCHOR - Observable to input Search

watch(search, async (newValue, oldValue) => {
  console.log("🚧 - watch - newValue", newValue);
  console.log("🚧 - watch - oldValue", oldValue);
  if (newValue !== "") {
    try {
      const filterColumn = records.value.map((x, index) => {
        return Object.keys(x)
          .filter((key) => column.includes(key))
          .reduce((cur, key) => {
            return Object.assign(cur, { [key]: records.value[index][key] });
          }, []);
      });

      recordsFiltered.value = filterColumn.filter((value) => {
        return (
          Object.values(value).filter((item) => item.toString().includes(search.value))
            .length > 0
        );
      });
      console.log(
        "🚧 - recordsFiltered.value=filterColumn.filter - recordsFiltered.value ",
        recordsFiltered.value
      );

      displayPageNav(recordsFiltered.value.length, paginationLimit.value);
      displayItems(0, "filtered");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("not rows");
    recordsFiltered.value = records.value;
    displayPageNav(records.value.length, paginationLimit.value);
    displayItems();
  }
});

//ANCHOR - API CONECTION
getUsers()
  .then((result) => {
    console.log("🚧 - getUsers.then - result", result);
    records.value = result.data;
    recordsFiltered.value = result.data;
    displayPageNav(records.value.length, paginationLimit.value);
    displayItems();
  })
  .catch((err) => {
    console.log("🚧 - getUsers.then - err", err);
  });

//ANCHOR - Methods
const displayPageNavNext = () => {
  const data = paginationPagePosition.value;
  console.log("🚧 - displayPageNavNext - data", data);
  let n = 0;
  let acum = [];

  while (n < paginationPageTotal.value) {
    n++;
    acum.push(n);
  }
  console.log("🚧 - displayPageNavNext - acum", acum);
  const from = parseInt(data.index);
  const to = from + 6;
  console.log("🚧 - displayPageNavNext - to", to);
  paginationPage.value = acum.slice(from, to);
  console.log("🚧 - displayPageNavNext - paginationPage.value", paginationPage.value);

  displayItems(data.index + 1);
};

const displayPageNavPrev = () => {
  const data = paginationPagePosition.value;
  console.log("🚧 - displayPageNavNext - data", data);
  let n = 0;
  let acum = [];

  while (n < paginationPageTotal.value) {
    n++;
    acum.push(n);
  }

  const from = parseInt(data.index) < 6 ? 6 : parseInt(data.index);
  const to = from - 6;

  paginationPage.value = acum.slice(to < 0 ? 0 : to, from);
  displayItems(data.index - 1);
};

const displayPageNav = (totalItems, perPage) => {
  perPage = perPage ? perPage : 1;
  const totalItemsPage = Math.ceil(totalItems / perPage);
  paginationPageTotal.value = totalItemsPage;
  paginationPage.value = paginationPageTotal.value > 6 ? 6 : totalItemsPage;
};

const displayItems = (perPage = 0, type = "default") => {
  let index, offSet;

  offSet = paginationLimit.value * perPage;
  index = offSet - paginationLimit.value;

  paginationPagePosition.value = {
    index: perPage === 0 ? 1 : perPage,
    from: index,
    to: offSet,
  };

  if (perPage === 0 && type == "default") {
    recordsShowTable.value = records.value.slice(0, paginationLimit.value);
  }

  if (perPage === 0 && type !== "default") {
    recordsShowTable.value = recordsFiltered.value.slice(0, paginationLimit.value);
  }

  if (perPage !== 0) {
    recordsShowTable.value = recordsFiltered.value.slice(index, offSet);
  }
};

/*
const filteredItemsAll = () => {
  if (search.value === "") {
    return records.value.length;
  } else {
    const filterColumn = records.value.map((x, index) => {
      return Object.keys(x)
        .filter((key) => column.includes(key))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: records.value[index][key] });
        }, []);
    });

    return filterColumn.filter((value) => {
      return (
        Object.values(value).filter((item) => item.toString().includes(search.value))
          .length > 0
      );
    });
  }
};

*/
/*
const filteredItems = (key, value) => {
  return records.value.filter((item) => {
    return item[key] === value;
  });
};
*/

onMounted(() => {});
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

          <div class="col mb-5">
            <button
              class="btn btn-outline-dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Search All Fields
            </button>
            <div class="collapse" id="collapseExample">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center align-middle" style="width: 10%">Search:</th>
                    <th style="width: 90%">
                      <input type="text" class="form-control" v-model="search" />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div class="col mb-3">
            <table class="table table-sm table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th v-for="item in column" :key="item">{{ item }}</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="(item, index) in recordsShowTable" :key="item.id">
                  <td>
                    <div>
                      <v-icon name="fa-edit" fill="#686868" title="Edit" scale="1" />
                      <v-icon name="md-delete" fill="#686868" title="Edit" scale="1" />
                    </div>
                  </td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.uid }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.address }}</td>
                </tr>
              </tbody>
            </table>

            <div id="pagination">
              <button type="button" class="btn" @click="displayPageNavPrev()">
                atras
              </button>
              <div v-for="item in paginationPage" :key="item">
                <button
                  type="button"
                  class="btn"
                  :class="
                    paginationPagePosition.index == item ? 'btn-primary' : 'btn-light'
                  "
                  @click="displayItems(item)"
                >
                  {{ item }}
                </button>
              </div>
              <button type="button" class="btn" @click="displayPageNavNext()">
                adelante
              </button>

              total rows {{ recordsFiltered.length }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "animate.css";

table th {
  text-transform: uppercase;
}

.botonera {
  display: flex;
  justify-content: space-around;
  justify-items: space-around;
  align-items: stretch;
}

#pagination {
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: row;
}

#pagination div button {
  margin: 5px;
}

#pagination > div button:last-child {
  border: 1px solid rgba(0, 0, 0, 0.2);
}

#pagination > div button:hover {
  background: rgba(0, 0, 0, 0.03);
  color: #1a7beb;
}
</style>
