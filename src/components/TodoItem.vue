
<template>
<li class="todo" :class="{completed:todo.done,editing:editing}">
<div>
<input class="toggle"
    type="checkbox"
	:checked="todo.done"
	@change="toggleTodo(todo)">
	<label v-text="todo.text" @dblclick="editing=true"></label>
	<button class="destroy" @click="removeTodo(todo)"></button>
</div>
<input class="edit" 
	v-show="editing" 
	v-focus="editing"
	:value="todo.text"
	@keyup.enter="doneEdit"
	@keyup.esc="cancelEdit"
	@blur="doneEdit">
</li>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    name: "TodoItem",
    props:['todo'],
    data(){
		return {
			editing:false
		}	
    },
	directives:{
		focus(el,{value},{context}){
			if(value){
				context.$nextTick(()=>{
					el.focus()
				})
			}
		}
	},
    methods:{
		...mapActions([
			'editTodo',
			'toggleTodo',
			'removeTdo'
		]),
        doneEdit(e){
			const value= e.target.value.trim()
			const {todo} =this
			if(!value){
				this.removeTodo(todo);
			}else if(this.editing){
				this.editTodo({
					todo,
					value
				})
				this.editing = false
			}
		},
		cancleEdit(e){
			e.target.value=this.todo.text
			this.editing=false
			
		}
		
    }

}
</script>

