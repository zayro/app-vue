import moment from 'moment'

export const dateFormat = (value) => {
  return moment(value).format('YYYY-MM-DD')
}

export const getDayMonthYear = (date) => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return { day, month, year }
}

export const diffDate = (diffDay) => {
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

  return ` ${DifferenceDays + 1}`
}

export function daysInYear (year) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  console.log(currentYear) // Output: e.g. 2021

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365
}

export function daysInYearCurrent () {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 ? 366 : 365
}
