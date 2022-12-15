import { createRouter,createWebHistory } from "vue-router";

// function beforeEnter(to, from, next) {
//   let token = window.localStorage.getItem("token");

//   if(token == null) {
//     if(to.path !== "/LoginPage") {
//       next("/LoginPage");
//       return;
//     }
//     next();
//     return;
//   }
// };



const routes = [
  {
    path: "/",
    name: "homepage",
    //beforeEnter: beforeEnter,
    component: () => import("../views/HomePage.vue")
  },
  {
    path: "/loginpage",
    name: "loginpage",
    //beforeEnter: beforeEnter,
    component: () => import("../views/LoginPage.vue")
  },
  {
    path: "/logintest",
    name: "logintest",
    //beforeEnter: beforeEnter,
    component: () => import("../views/LoginTest.vue")
  },
  {
    path: "/registerpage",
    name: "registerpage",
    //beforeEnter: beforeEnter,
    component: () => import("../views/RegisterPage.vue")
  },
  {
    logoutfunction(){
      localStorage.removeItem("token");
    },
    path: "/logout",
    name: "logout",
  
    component: () => import("../views/LoginPage.vue")
    
  },
  {
    path: "/profilepage",
    name: "profilepage",
    //beforeEnter: beforeEnter,
    component: () => import("../views/ProfilePage.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    let token = window.localStorage.getItem("token");
    if(token==null ){
      if(to.path === '/RegisterPage')
      {return}
      if(to.path !== '/LoginPage'){
      router.push('/LoginPage')
      }
    }
    if(to.path==='/logout'){
      localStorage.removeItem("token");
      return
    }
})







export default router
