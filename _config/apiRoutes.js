const moduleName = 'marketplace';
const moduleVersion = 'v1';
const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const urlBase = `${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  category: `${urlBase}/category`,
  comment: `${urlBase}/comment`,
  store: `${urlBase}/store`,
  setting: `${urlBase}/setting`,
  storeHistory: `${urlBase}/store-history`,
  theme: `${urlBase}/theme`,
  favoriteStore: `${urlBase}/favorite-store`,
}
