let _Vue = null
export default class VueRouter {
	constructor(options) {
		this.data = _Vue.observable({
			current: '/'
		})
		this.options = options
		this.routeMap = {}
	}
	static install(Vue) {
		// 1. 插件是否已经安装
		if(VueRouter.install.installed) {
			return
		}
		VueRouter.install.installed = true

		// 2. 构造函数记录到全局变量
		_Vue = Vue
		// 3. router对象注入到vue实例上
		// _Vue.prototype.$router = this.$options.$router
		// 混入
		_Vue.mixin({
			beforeCreate () {
				if(this.$options.router) {
					_Vue.prototype.$router = this.$options.router
					this.$options.router.init()
				}
			}
		})
	}
    // 遍历所有路由规则, 并解析成键值对
	createRouteMap () {
		this.options.routes.forEach(route => {
			this.routeMap[route.path] = route.component
		})
	}

	initComponents (Vue) {
		Vue.component('router-link', {
			render: function (createElement) {
				return createElement(
				  'a',   // 标签名称
				  {
					attrs: {
						href: this.to
					},
					on: {
						click: this.clickHandler
					}
				  },
				  [this.$slots.default] // 子节点数组
				)
			  },
			  props: {
				to: String
			  },
			  methods: {
				  clickHandler(e) {
					  history.pushState({}, '', this.to) // 改浏览器路由
					  this.$router.data.current = this.to // 响应式组件更新
					  e.preventDefault()
				  } 
			  }
			// template: '<a :href="to"><slot></slot></a>'
		})
		const self = this
		Vue.component('router-view', {
			render: function (createElement) {
				const component = self.routeMap[self.data.current]
				return createElement(
					component
				)
			  },
			  props: {
				to: String
			  }
		})
	}
	
	initEvent () {
		// 浏览器前进、后退问题处理
		window.addEventListener('popstate', () => {
			this.data.current = window.location.pathname
		})
	}

	init() {
		this.createRouteMap()
		this.initComponents(_Vue)
		this.initEvent()
	}
}