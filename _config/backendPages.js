
export default {
  stores: {
    // permission: 'qmarketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/stores/index',
    name: 'qmarketplace.admin.stores.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminStores',
    icon: 'fas fa-store',
    authenticated: true
  },
  storesCreate:{
    activated: true,
    path: '/qmarketplace/stores/create',
    name: 'qmarketplace.admin.stores.create',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/form'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminStores',
    icon: 'far fa-store',
    authenticated: true,
  },
  storesEdit:{
    activated: true,
    path: '/qmarketplace/stores/edit/:id',
    name: 'qmarketplace.admin.stores.edit',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/form'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminStores',
    icon: 'far fa-store',
    authenticated: true,
  },

}
