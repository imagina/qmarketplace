
export default {
  store: {
    permission: null,
    activated: true,
    path: 'store/:slug',
    name: 'stores.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

}
