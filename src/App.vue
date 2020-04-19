<template>
	<div id="app">
		<!-- header -->
		<header class="header">
			<h1>Todos</h1>
			<input class="new-todo" autofocus placeholder="有神马想做的？" @keyup.enter="addTodo">
		</header>
		<!-- mian section -->
		<section calss="main" v-show="todo.length">
			<input class="toggle-all" id="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll(!allChecked)">
			<label for="toggle-all"></label>
			<ul class="todo-list">
				<TodoItem v-for="(todo,index) in filteredTodos" :key="index" :todo="todo"></TodoItem>
			</ul>
		</section>
		<!-- footer -->
		<footer class="footer" v-show="todos.length">
			<span class="todo-count">
				剩下
				<strong>{{remaining}}</strong>
				件未完成，加油💪
			</span>
			<!-- <ul class="filters">
				<li v-for="(val,key) in filters">
					<a :href="'#/' + key" :class="{selected:visibility===key}" @click="visibility=key">{{key}}</a>
				</li>
			</ul> -->
			<button class="clear-completed" v-show="todo.length > remaining" @click="clearCompleted">
				Clear completed
			</button>
		</footer>
		<h2>just test</h2>
</div>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	import TodoItem from './components/TodoItem.vue'

	const filters = {
		all: todos => todos,
		active: todos => todos.filter(todo => !todo.done),
		completed: todos => todos.filter(todo => todo.done)
	}

	export default {
		name: 'App',
		components: {
			TodoItem
		},
		data() {
			return {
				visibility: 'all',
				filters: filters
			}
		},
		computed: {
			todos() {
				return this.$store.state.todos
			},
			allChecked() {
				return this.todos.every(todo => todo.done)
			},
			filteredTodos() {
				return filters[this.visibility](this.todos)
			},
			remaining() {
				return this.todos.filter(todo => !todo.done).length
			}
		},
		methods: {
			...mapActions([
				'toggleAll',
				'clearCompleted'
			]),
			addTodo(e) {
				const text = e.target.value
				if (text.trim()) {
					this.$store.dispatch('addTodo', text)
				}
				e.target.value = ''
			}
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
