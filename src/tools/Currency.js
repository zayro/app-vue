export const currency = (value) => {
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
