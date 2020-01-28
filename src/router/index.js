/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Firebase from '../firebase'
import Landing from '../pages/Landing.vue'
import Tmp from '../pages/Tmp.vue'
import Login from '../pages/Login.vue'
import Admin from '../pages/Admin.vue'
import MembersAdmin from '../pages/Members.vue'
import EventsAdmin from '../pages/EventsAdmin.vue'
import Events from '../pages/Events.vue'
import Error from '../pages/Error.vue'
import NewsAdmin from '../pages/NewsAdmin.vue'
import News from '../pages/News.vue'
import NewsItemPage from '../pages/NewsItemPage.vue'
import Posts from '../pages/PostsAdmin.vue'
import Video from '../pages/Video.vue'
import InspirationalVideos from '../pages/InspirationalVideos.vue'
import Banners from '../pages/Banners.vue'
import Associados from '../pages/Associados.vue'
import Speech from '../pages/Speech.vue'
import Release from '../pages/ReleasePage.vue'
import Associar from '../pages/Associar.vue'
import MembersPublic from '../pages/MembersPublic.vue'
import Instagram from '../pages/Instagram.vue'
import Summit from '../pages/SummitParticipantsAdmin.vue'
import Contribuicao from '../pages/Contribuicao.vue'
import Payments from '../pages/Payments.vue'


Vue.use(VueRouter)

var router = new VueRouter({
    mode: 'history',
    routes: [{
            meta: {
                public: true
            },
            path: '/',
            component: Landing,
            name: 'home'
        },
        {
            meta: {
                public: true
            },
            path: '/eventos',
            component: Events,
            name: 'events'
        },
        {
            meta: {
                public: true
            },
            path: '/payments',
            component: Payments,
            name: 'payments'
        },
        {
            meta: {
                public: true
            },
            path: '/membros',
            component: MembersPublic,
            name: 'membros'
        },
        {
            meta: {
                public: true
            },
            path: '/contribuicao',
            component: Contribuicao,
            name: 'contribuicao'
        },
        {
            meta: {
                public: true
            },
            path: '/404',
            component: Error,
            name: 'err9r'
        },
        {
            meta: {
                public: true
            },
            path: '/tmp',
            component: Tmp,
            name: 'tmp'
        },
        {
            meta: {
                public: false
            },
            path: '/admin',
            component: Admin,
            name: 'admin'
        },
        {
            meta: {
                public: true,
                login: true
            },
            path: '/login',
            component: Login,
            name: 'login'
        },
        {
            meta: {
                public: true
            },
            path: '/lancamento',
            component: Speech,
            name: 'speech'
        },
        {
            meta: {
                public: true
            },
            path: '/associar',
            component: Associar,
            name: 'associar'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/membros',
            component: MembersAdmin,
            name: 'members'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/events',
            component: EventsAdmin,
            name: 'eventsadmin'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/news',
            component: NewsAdmin,
            name: 'newsAdminEnglish'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/noticias',
            component: NewsAdmin,
            name: 'newsAdmin'
        },
        {
            meta: {
                public: true
            },
            path: '/instagram',
            component: Instagram,
            name: 'instagram'
        },
        {
            meta: {
                public: true
            },
            path: '/news',
            component: News,
            name: 'news'
        },
        {
            meta: {
                public: true
            },
            path: '/noticias/:id',
            component: NewsItemPage,
            name: 'noticia'
        },
        {
            meta: {
                public: true
            },
            path: '/release/1lp9FyMODHdb0YOL4zUk',
            component: Release,
            name: 'release'
        },
        {
            meta: {
                public: true
            },
            path: '/noticias',
            component: News,
            name: 'news2'
        },
        {
            meta: {
                public: true
            },
            path: '/streaming',
            component: Video,
            name: 'video'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/publicacoes',
            component: Posts,
            name: 'adminposts'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/videos-inspiracionais',
            component: InspirationalVideos,
            name: 'adminInspVideos'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/banners-iniciais',
            component: Banners,
            name: 'bannersIniciais'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/associates',
            component: Associados,
            name: 'adminAssociates'
        },
        {
            meta: {
                public: false
            },
            path: '/admin/summit-participantes',
            component: Summit,
            name: 'adminSummitParticipants'
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    // var route = null
    // var exists = false
    // for(let r of routes) {
    //     console.log('SHOULD EQUAL', to.path, r.path)
    //     if(r.path === to.path)
    //         route = r
    //         // exists = true
    // }
    // if(exists === false) {
    //     next('/404')
    // } else {
    // if (route && route.meta.public) {
    next()
    // }

    Firebase.app.auth().onAuthStateChanged(user => {
        const route = router.currentRoute
        console.log('Rouute', route)
        if (user) {
            if (route && route.path === '/login') {
                next('/admin')
            } else {
                next()
            }
        } else {
            if ((route && route.meta.public) || typeof route === typeof undefined) {
                next()
            } else {
                next('/login')
            }
        }
    })
    // }
})

export default router