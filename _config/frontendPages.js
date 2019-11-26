
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
  checkout: {
    permission: null,
    activated: true,
    path: 'marketplace/checkout/:storeId',
    name: 'marketplace.checkout',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/checkout/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.checkout',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

}
