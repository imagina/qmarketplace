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
      ]
   },
   pages.qmarketplace.myStore, // themes
   pages.qmarketplace.myStoreTheme, // themes
   {
      title: 'qmarketplace.sidebar.products',
      icon: 'fas fa-shopping-basket',
      children: [
         pages.qmarketplace.myStoreProducts, // themes
         pages.qmarketplace.myStoreCategoryProducts, // categoriesStore
      ]
   },
   pages.qmarketplace.orders, // orders
   pages.qmarketplace.myStorePolls, // orders
   pages.qmarketplace.favoriteUsers, // Seguidores
   pages.qmarketplace.coupons, // Coupons
   pages.qmarketplace.myChatMessages,
   pages.qmarketplace.myNotifications,
   pages.qmarketplace.myBannersIndex


]
