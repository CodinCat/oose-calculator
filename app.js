/* global Vue */

var bus = new Vue()

Vue.component('column', {
	template: '#column-template',

	props: ['id', 'percentage', 'default'],

	methods: {
		update: function () {
			bus.$emit('update', {
				key: this.id,
				value: this.value
			})
		}
	},

	data: function () {
		return {
			value: this.default
		}
	}
})

new Vue({
	el: '#app',

	data: {
		s: {
			participation: 50,
			teamwork: 75,
			quiz1: 60,
			quiz2: 60,
			quiz3: 75
		}
	},

	computed: {
		current: function () {
			return (
				this.s.participation * 0.2 +
				this.s.teamwork * 0.2 +
				this.s.quiz1 * 0.1 +
				this.s.quiz2 * 0.1 +
				this.s.quiz3 * 0.2
			).toFixed(1)
		},

		quiz4: function () {
			return Math.ceil((60 - this.current) / 0.2)
		},

		shouldSorry: function () {
			return this.quiz4 > 110
		},

		shouldCongrats: function () {
			return this.quiz4 <= 0
		}
	},

	mounted: function () {
		var app = this
		
		bus.$on('update', function (obj) {
			app.s[obj.key] = obj.value
		})

		this.$watch('s', function () {
			var mask = document.getElementById('mask')

			if (app.shouldSorry) {
				mask.className = 'mask-sorry'
			} else if (app.shouldCongrats) {
				mask.className = 'mask-congrats'
			} else {
				mask.className = 'mask-default'
			}

		}, {deep: true})
	}
})
