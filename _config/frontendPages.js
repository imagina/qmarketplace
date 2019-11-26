
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
  product: {
    permission: null,
    activated: true,
    path: 'tiendas/:slug/:product',
    name: 'stores.product.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  category: {
    permission: null,
    activated: true,
    path: 'tiendas/:slug/categoria/:category',
    name: 'stores.product.index',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/index'),
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
