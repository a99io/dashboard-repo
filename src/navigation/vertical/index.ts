import type { HorizontalNavItems } from '@layouts/types'

export default [
    {heading: 'جميع الاقسام'},
  {
    title: 'الاحصائيات',
    to: { name: 'index' },
    icon: { icon: 'tabler:smart-home' },
  },
  {
    title: 'الخدمات',
    to: { name: 'service' },
    icon: { icon: 'tabler:users' },
  },
  {
    title: 'الرعاة',
    to: { name: 'Shepherds' },
    icon: { icon: 'tabler:building' },
  },
  {
    title: 'شريط التمرير',
    to: { name: 'Scroll bar' },
    icon: { icon: 'tabler:photo' },
  },
  {
    title: 'المشاريع',
    to: { name: 'project' },
    icon: { icon: 'tabler:radio' },
  },
  {
    title: 'المقالات',
    to: { name: 'Articles' },
    icon: { icon: 'tabler:location' },
  },
  {
    title: 'login',
    to: { name: 'mewo2' },
    icon: { icon: 'tabler:user' },
  },
  {
    title: 'selected',
    to: { name: 'myselected' },
    icon: { icon: 'tabler:user' },
  },
  {
    title: 'joke',
    to: { name: 'meow3' },
    icon: { icon: 'tabler:joke' },
  },



] as HorizontalNavItems