
export default {
  categoriesStore: {
    permission: 'qmarketplace.categories.manage',
    activated: true,
    path: '/qmarketplace/categories/store',
    name: 'qmarketplace.admin.categories.store.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/productCategories/index'),
    layout: () => import('src/layouts/master'),
    title: 'qcommerce.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
    authenticated: true,
  },
  // Super admin Stores
  themes: {
    permission: 'qmarketplace.stores.manage',
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
     permission: 'marketplace.stores.manage',
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
    permission: 'marketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/stores/index',
    name: 'qmarketplace.admin.stores.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminMarketplace',
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
    icon: 'fas fa-store',
    authenticated: true,
  },
  storesEdit:{
    activated: true,
    path: '/qmarketplace/stores/edit/:id',
    name: 'qmarketplace.admin.stores.edit',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/form'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminStores',
    icon: 'fas fa-store',
    authenticated: true,
  },
  storesTheme: {
    permission: 'marketplace.themes.manage',
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
     permission: 'marketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/products/store/:id',
    name: 'qmarketplace.admin.products.store.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/products/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminProducts',
    icon: 'fas fa-store',
    authenticated: true
  },
  storeProductsCreate: {
     permission: 'marketplace.stores.manage',
    activated: true,
    path: '/qmarketplace/products/create/:storeId',
    name: 'qmarketplace.admin.products.store.create',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/products/form'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminProducts',
    icon: 'fas fa-store',
    authenticated: true
  },
  //end Super admin Sores

  myStore:{
    //permission: 'qmarketplace.store.mystore',
    activated: true,
    path: '/admin/stores/my-store',
    name: 'qmarketplace.admin.stores.my.store',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/formMyStore'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminMyStore',
    icon: 'fas fa-store',
    authenticated: true,
  },

  myStoreTheme: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/stores/my-store/theme',
    name: 'qmarketplace.admin.stores.my.store.theme',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/theme/formStoreTheme'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminTheme',
    icon: 'fas fa-palette',
    authenticated: true
  },

  myStoreProducts: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/stores/myStore/products',
    name: 'qmarketplace.admin.stores.my.store.products',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/products/indexStoreProducts'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminProducts',
    icon: 'fas fa-store',
    authenticated: true
  },
  myStoreProductCreate: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/products/create',
    name: 'qmarketplace.admin.stores.my.store.products.create',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/products/formMyStore'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.my.products',
    icon: 'fas fa-store',
    authenticated: true
  },

  myStoreCategoryProducts: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/stores/myStore/product/category',
    name: 'qmarketplace.admin.stores.myStore.productsCategory',
    page: () => import('@imagina/qmarketplace/_layouts/admin/productCategories/index'),
    layout: () => import('src/layouts/admin'),
    title: 'qmarketplace.sidebar.my.categories',
    icon: 'fas fa-store',
    authenticated: true
  },
  orders: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/orders',
    name: 'qmarketplace.admin.shipping.orders.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/order/index'),
    layout: () => import('src/layouts/master'),
    title: 'qcommerce.sidebar.my.orders',
    icon: 'fas fa-box-open',
    authenticated: true,
  },
  order: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/order/:id',
    name: 'qmarketplace.admin.shipping.orders.show',
    page: () => import('@imagina/qmarketplace/_layouts/admin/order/show'),
    layout: () => import('src/layouts/master'),
    title: 'qcommerce.sidebar.adminOrders',
    icon: 'fas fa-box-open',
    authenticated: true,
  },

  favoriteUsers: {
    permission: 'marketplace.stores.mystore',
    activated: true,
    path: '/admin/favoriteStore/index',
    name: 'qmarketplace.admin.favoritestores.index',
    page: () => import('@imagina/qmarketplace/_layouts/admin/stores/favoritestores/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminFavoritestores',
    icon: 'fas fa-users',
    authenticated: true
  },

}
