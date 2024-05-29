/**
 * Components
 */
import IndexComponent from '@/components/IndexComponent.vue'
import MainComponent from '@/components/MainComponent.vue'
import AvatarComponent from '@/components/AvatarComponent.vue'
import BackDropComponent from '@/components/BackDropComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import UploadComponent from '@/components/UploadComponent.vue'
import PanelComponent from '@/components/PanelComponent.vue'
import DataTableFilter from '@/components/DataTable/DataTableFilter.vue'
import TableComponent from '@/components/DataTable/example/TableComponent.vue'

export const ROUTES_COMPONENTS = {
  path: '/components',
  name: 'components',
  component: IndexComponent,
  children: [
    {
      path: '',
      name: 'MainComponent',
      component: MainComponent,
      meta: { authRequired: true }
    },
    {
      path: 'avatar',
      name: 'avatar',
      component: AvatarComponent,
      meta: { transition: 'slide-right' }
    },
    {
      path: 'backDrop',
      name: 'backDrop',
      component: BackDropComponent,
      meta: { transition: 'slide-right' }
    },
    {
      path: 'spinner',
      name: 'spinner',
      component: SpinnerComponent,
      meta: { transition: 'slide-right' }
    },

    {
      path: 'upload',
      name: 'upload',
      component: UploadComponent,
      meta: { transition: 'slide-right' }
    },
    {
      path: 'table',
      name: 'TableComponents',
      component: TableComponent,
      meta: { authRequired: true }
    },
    {
      path: 'card',
      name: 'CardComponent',
      component: CardComponent,
      meta: { authRequired: true }
    },
    {
      path: 'panel',
      name: 'PanelComponent',
      component: PanelComponent,
      meta: { authRequired: true }
    },
    {
      path: 'DataTableFilter',
      name: 'DataTableFilterComponent',
      component: DataTableFilter,
      meta: { authRequired: true }
    }
  ]
}
