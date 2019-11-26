
export default {
  index: {
    permission: null,
    activated: true,
    path: 'tiendas/categoria/:slug',
    name: 'stores.index',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  store: {
    permission: null,
    activated: true,
    path: 'tiendas/:slug',
    name: 'stores.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

}
