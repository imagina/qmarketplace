
export default {
  themes: {
    // permission: 'qmarketplace.stores.manage',
    activated: true,//
    path: '/qmarketplace/themes/index',
    name: 'qmarketplace.admin.themes.index',//
    page: () => import('@imagina/qmarketplace/_layouts/admin/themes/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminThemes',
    icon: 'fas fa-store',
    authenticated: true
  },
  categories: {
    // permission: 'qmarketplace.stores.manage',
    activated: true,//
    path: '/qmarketplace/categories/index',
    name: 'qmarketplace.admin.categories.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/categories/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminCategories',
    icon: 'fas fa-store',
    authenticated: true
  },
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
  storesTheme: {
    // permission: 'qmarketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/theme/store/:id',
    name: 'qmarketplace.admin.theme.store.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/theme/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminTheme',
    icon: 'fas fa-store',
    authenticated: true
  },
  storeProducts: {
    // permission: 'qmarketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/products/store/:id',
    name: 'qmarketplace.admin.products.store.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/products/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminProduct',
    icon: 'fas fa-store',
    authenticated: true
  },
  storeProductsCreate: {
    // permission: 'qmarketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/products/create/:storeId',
    name: 'qmarketplace.admin.products.store.create',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/products/form'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminProduct',
    icon: 'fas fa-store',
    authenticated: true
  },

}
