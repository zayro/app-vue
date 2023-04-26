export const formatMonth = (date) => {
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${month}/${year}`
}

export const formatMonth = (date) => {
   const formatJson = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return { month, year }
}

// In case of a range picker, you'll receive [Date, Date]
export const formatMonth = (date) => {
   const format = (date) => {
  console.log('🚧 - format - date:', date)
  const from = formatMonth(date[0])

  infoPay.value.fecha_rango = JSON.stringify([formatJson(date[0])])

  return [from]
}


const diffDate = (diffDay) => {
  console.group('diffDate')
  console.log('🚧 - diffDate - diffDay:', diffDay)
  // To calculate the time difference of two dates

  const from = Date.parse(diffDay[0])
  console.log('🚧 - diffDate - from:', from)
  const to = Date.parse(diffDay[1])
  console.log('🚧 - diffDate - to:', to)

  const DifferenceTime = Date.parse(diffDay[1]) - Date.parse(diffDay[0])

  const oneDay = 1000 * 60 * 60 * 24
  console.log('🚧 - diffDate - oneDay:', oneDay)

  // To calculate the no. of days between two dates
  const DifferenceDays = DifferenceTime / oneDay

  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)

  const diff = now - start

  const day = Math.floor(diff / oneDay)
  console.log('Day of year: ' + day)

  console.groupEnd()

  return `${formmatDate(diffDay[0])} - ${formmatDate(diffDay[1])} Dias Cancelados  ${DifferenceDays + 1}`
}

function daysInYear (year) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  console.log(currentYear) // Output: e.g. 2021

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365
}

function daysInYearCurrent () {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 ? 366 : 365
}
