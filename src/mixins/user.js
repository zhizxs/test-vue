export default {
	data() {
		return {
			userInfo: {
				name: ''
			}
		}
	},
	methods: {
		getUserInfo() {
			this.userInfo = {
				name: "张三风"
			}
		}
	},
	mounted() {
		this.userInfo = {
			name: '张无忌'
		}
	}

}