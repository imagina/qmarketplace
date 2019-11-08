const pages = config('pages') // Get Pages from config

//Suscriptions
export default [
  {
    title: 'qmarketplace.sidebar.adminStores',
    icon: 'fas fa-map-marked-alt',
    children: [
      pages.qmarketplace.stores, // my Stores setup
    ]
  },
]
