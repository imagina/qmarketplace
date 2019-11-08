
export default {
  userStores: {
		activated: true,
		path: '/userStores',
		name: 'qmarketplace.user.stores',
    page: () => import('@imagina/qmarketplace/_layouts/admin/userStores/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.adminStores',
		icon: 'far fa-store',
    authenticated: true,
	},
}
