import { createRouter, createWebHistory } from 'vue-router';

import Home from '../Pages/Home.vue';
import Products from '../Pages/Products.vue';
import Category from '../Pages/Category.vue';
import Cart from '../Pages/Cart.vue';
import WishList from '../Pages/WishList.vue';
import ProductDetails from '../Pages/ProductDetails.vue';
import CategoryProduct from '../components/Category/CategoryProduct.vue';

import AddProduct from '../Pages/admin/AddProduct.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  { path: '/category', name: 'Category', component: Category },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/wishList', name: 'WishList', component: WishList },
  {
    path: '/category/:category',
    name: 'CategoryProducts',
    component: CategoryProduct,
  },

  //admin Routes
  { path: '/admin/addProduct', name: 'addProduct', component: AddProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
