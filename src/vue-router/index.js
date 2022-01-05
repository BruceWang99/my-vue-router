let _Vue = null
export default class VueRouter {
	constructor(options) {
		this.data = _Vue.observable({
			current: '/'
		})
		if(!options.mode){
			options.mode = 'hash'
		}
		this.options = options
		this.routeMap = {}
		this.triggerHash = false
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
	jumpRoute (opt, type) {
		let to = ''
		if(typeof opt === 'string') {
			to = opt
		} else if (Object.prototype.toString.call(opt) === '[object Object]') {
			if(opt.path) {
				to = opt.path
			} else {
				new Error('path参数必须传')
			}
			
		} else {
			new Error('options 类型错误')
			return
		}
		const { mode } = this.options
		if( mode === 'hash') {
			this.triggerHash = true
			window.location.hash = to
		} else {
		history[type]({}, '', to) // 改浏览器路由
		}
		this.data.current = to // 响应式组件更新
	}
	push(opt) {
		console.log('this', this);
		this.jumpRoute(opt, 'pushState')
	}
	replace(opt) {
		this.jumpRoute(opt, 'replaceState')
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
					  const { mode } = this.$router.options
					  if( mode === 'hash') {
						this.$router.triggerHash = true
						window.location.hash = this.to
					  } else {
						history.pushState({}, '', this.to) // 改浏览器路由
					  }
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
		const { mode } = this.options
		if( mode === 'hash') { 
			window.addEventListener("hashchange", () => {
				console.log('window.location.hash', );
				let hash = window.location.hash
				if(this.triggerHash === false) {
					this.data.current = hash.replace('#', '')
				}
				this.triggerHash = false
			});
		} else {
			// 浏览器前进、后退问题处理
			window.addEventListener('popstate', () => {
				console.log(window.location.pathname, '<window.location.pathname');
				this.data.current = window.location.pathname
			})
		}
		
	}

	init() {
		this.createRouteMap()
		this.initComponents(_Vue)
		this.initEvent()
	}
}