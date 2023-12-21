import React, { useState } from 'react'
import InputField from './component/inputField'
import { Todo } from './model'
import TodoList from './component/TodoList'
import Testing from './component/TodoList/Testing'

type Data = 'hello' | 'demo' | 'data'
const App: React.FC = () => {
    const [first, setfirst] = useState<Data>()
    const [todo, setTodo] = useState<string>('')
    const [todoList, setTodoList] = useState<Todo[]>([])
    const handleTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (todo) {
            setTodoList((pre) => {
                return [...pre, { id: Date.now(), isDone: false, todo: todo }]
            })
            setTodo('')
        }
    }

    return (
        <div className="container">
            {first}
            <h1
                onClick={() => {
                    setfirst('data')
                }}
            >
                Taskify
            </h1>
            {/* <InputField todo={todo} setTodo={setTodo} handleTodo={handleTodo} />
            <TodoList todoList={todoList} setTodoList={setTodoList} /> */}
            <hr />
            <Testing todoList={todoList} setTodoList={setTodoList} />
        </div>
    )
}

export default App
