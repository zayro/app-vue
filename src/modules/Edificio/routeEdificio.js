// Edificio
import Payment from '@/modules/Edificio/Payment/PaymentView.vue'
import Expenditure from '@/modules/Edificio/Expenditure/ExpenditureView.vue'
import reportPayment from '@/modules/Edificio/Report/reportPayment.vue'
import reportExpenditure from '@/modules/Edificio/Report/reportExpenditure.vue'
import reportApt from '@/modules/Edificio/Report/reportApt.vue'
import reportBalance from '@/modules/Edificio/Report/reportBalance.vue'
import reportGeneral from '@/modules/Edificio/Report/reportGeneral.vue'
import report from '@/modules/Edificio/Report/reportView.vue'

export const ROUTES_EDIFICIO = {
  path: 'edificio',
  name: 'edificio',
  children: [
    {
      path: 'addPayment',
      name: 'addPayment',
      component: Payment,
      meta: { transition: 'slide-right' }
    },
    {
      path: 'addExpenditure',
      name: 'addExpenditure',
      component: Expenditure,
      meta: { transition: 'slide-right' }
    },
    {
      path: 'reportPayment',
      name: 'reportPayment',
      component: reportPayment
    },
    {
      path: 'reportExpenditure',
      name: 'reportExpenditure',
      component: reportExpenditure
    },
    {
      path: 'reportGeneral',
      name: 'reportGeneral',
      component: reportGeneral
    },
    {
      path: 'reportApt',
      name: 'reportApt',
      component: reportApt
    },
    {
      path: 'reportBalance',
      name: 'reportBalance',
      component: reportBalance
    },

    {
      path: 'report',
      name: 'report',
      component: report,
      meta: { transition: 'slide-right' }
    }
  ]
}
