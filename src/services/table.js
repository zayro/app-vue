import { ref } from 'vue'
import moment from 'moment'

const records = ref([])
const recordsFiltered = ref([])
const recordsShowTable = ref([])
const columnFilter = ref('')

const sortField = ref({
  name: '',
  asc: true
})
const paginationLimit = ref(10)
const paginationPage = ref([])
const paginationPageTotal = ref(0)
const paginationPagePosition = ref({})

// ANCHOR - Methods
const displayPageNavNext = () => {
  const data = paginationPagePosition.value

  let n = 0
  const acum = []

  while (n < paginationPageTotal.value) {
    n++
    acum.push(n)
  }
  console.log('🚧 - displayPageNavNext - acum', acum)
  const from = parseInt(data.index)
  const to = from + 6
  console.log('🚧 - displayPageNavNext - to', to)
  paginationPage.value = acum.slice(from, to)
  console.log('🚧 - displayPageNavNext - paginationPage.value', paginationPage.value)

  displayItems(data.index + 1)
}

const displayPageNavPrev = () => {
  const data = paginationPagePosition.value

  let n = 0
  const acum = []

  while (n < paginationPageTotal.value) {
    n++
    acum.push(n)
  }

  const from = parseInt(data.index) < 6 ? 6 : parseInt(data.index)
  const to = from - 6

  paginationPage.value = acum.slice(to < 0 ? 0 : to, from)
  displayItems(data.index - 1)
}

const displayPageNav = (totalItems, perPage) => {
  perPage = perPage || 1
  const totalItemsPage = Math.ceil(totalItems / perPage)
  paginationPageTotal.value = totalItemsPage
  paginationPage.value = paginationPageTotal.value > 6 ? 6 : totalItemsPage
}

const displayItems = (perPage = 0, type = 'default') => {
  const offSet = paginationLimit.value * perPage
  const index = offSet - paginationLimit.value

  paginationPagePosition.value = {
    index: perPage === 0 ? 1 : perPage,
    from: index,
    to: offSet
  }

  if (perPage === 0 && type === 'default') {
    recordsShowTable.value = records.value.slice(0, paginationLimit.value)
  }

  if (perPage === 0 && type !== 'default') {
    recordsShowTable.value = recordsFiltered.value.slice(0, paginationLimit.value)
  }

  if (perPage !== 0) {
    recordsShowTable.value = recordsFiltered.value.slice(index, offSet)
  }
}

const SortArrayObject = () => {
  const prop = sortField.value.name
  const asc = sortField.value.asc
  recordsShowTable.value = records.value.sort(function (a, b) {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
    }
  })

  displayItems()
}

const searchTable = (e) => {
  try {
    const filterColumn = records.value.map((x, index) => {
      return Object.keys(x)
        .filter((key) => columnFilter.value.includes(key))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: records.value[index][key] })
        }, [])
    })

    recordsFiltered.value = filterColumn.filter((value) => {
      return Object.values(value).filter((item) => item.toString().includes(e.target.value)).length > 0
    })

    displayPageNav(recordsFiltered.value.length, paginationLimit.value)
    displayItems(0, 'filtered')
  } catch (error) {
    console.log(error)
  }
}

const currency = (value) => {
  if (typeof value !== 'number') {
    console.log('🚧 - currency - value:', typeof value)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  const money = parseFloat(value)

  return formatter.format(money)
}

const dateFormat = (value) => {
  return moment(value).format('YYYY-MM-DD')
}

export {
  records,
  recordsFiltered,
  paginationLimit,
  paginationPageTotal,
  recordsShowTable,
  columnFilter,
  searchTable,
  displayPageNavNext,
  displayPageNavPrev,
  displayPageNav,
  displayItems,
  SortArrayObject,
  currency,
  dateFormat
}
