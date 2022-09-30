const MainLayout = () => import('layouts/MainLayout.vue')
const MainPage = () => import('pages/MainPage.vue')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'main',
        component: MainPage
      }
    ]
  }
]

export default routes
