import { createRouter, createWebHistory } from 'vue-router';

import Home from '../Pages/Home.vue';
import Products from '../Pages/Products.vue';
import Category from '../Pages/Category.vue';
import Cart from '../Pages/Cart.vue';
import WishList from '../Pages/WishList.vue';
import ProductDetails from '../Pages/ProductDetails.vue';
import CategoryProduct from '../components/Category/CategoryProduct.vue';
import ProfilePage from '../Pages/ProfilePage.vue';

//Admins Pages
import AdminDashboard from '../Pages/Admin/AdminDashboard.vue';
import AdminProduct from '../Pages/Admin/AdminProduct.vue';
import AdminOrder from '../Pages/Admin/AdminOrders.vue';
import AdminUser from '../Pages/Admin/AdminUser.vue';

import User from '../layout/User.vue';
import Admin from '../layout/Admin.vue';
const routes = [
  {
    path: '/',
    component: User,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'products', name: 'Products', component: Products },
      {
        path: 'product/:id',
        name: 'ProductDetails',
        component: ProductDetails,
      },
      { path: 'category', name: 'Category', component: Category },
      { path: 'cart', name: 'Cart', component: Cart },
      { path: 'wishList', name: 'WishList', component: WishList },
      {
        path: 'category/:category',
        name: 'CategoryProducts',
        component: CategoryProduct,
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: ProfilePage,
      },
    ],
  },

  //admin Pages/Routes:
  {
    path: '/admin',
    component: Admin,
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'products', name: 'AdminProduct', component: AdminProduct },
      { path: 'orders', name: 'AdminOrder', component: AdminOrder },
      { path: 'users', name: 'AdminUser', component: AdminUser },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
