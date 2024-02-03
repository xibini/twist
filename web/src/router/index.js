import {createRouter, createWebHistory} from 'vue-router'
import NotFoundView from "@/views/error/NotFoundView.vue";
import PkIndexView from "@/views/pk/PkIndexView.vue";
import RanklistIndexView from "@/views/ranklist/RanklistIndexView.vue";
import RecordIndexView from "@/views/record/RecordIndexView.vue";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
  },
  {
    path: "/404/",
    name: "404",
    component: NotFoundView,
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
