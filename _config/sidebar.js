const pages = config('pages') // Get Pages from config

//Marketplace
export default [
  {
    title: 'qmarketplace.sidebar.adminStores',
    icon: 'fas fa-map-marked-alt',
    children: [
      pages.qmarketplace.stores, // my Stores setup
      pages.qmarketplace.categories, // categories
      pages.qmarketplace.themes, // themes
    ]
  },
]
