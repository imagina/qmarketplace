const pages = config('pages') // Get Pages from config

//Marketplace
export default [
  {
    title: 'qmarketplace.sidebar.adminMarketplace',
    icon: 'fas fa-map-marked-alt',
    children: [
      pages.qmarketplace.stores, // my Stores setup
      pages.qmarketplace.categories, // categories
      pages.qmarketplace.themes, // themes
      pages.qmarketplace.myStore, // themes
      pages.qmarketplace.myStoreTheme, // themes
      pages.qmarketplace.myStoreProducts, // themes
    ]
  },
]
