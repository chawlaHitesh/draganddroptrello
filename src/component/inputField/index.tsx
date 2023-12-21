// InputField.js

import React, { useRef } from 'react'
import './inputStyle.css'

type InputType = {
    todo: string
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleTodo: (e: React.FormEvent) => void
}
const InputField = ({ todo, setTodo, handleTodo }: InputType) => {
    const inputField = useRef<HTMLInputElement>(null)
    return (
        <form
            className="form"
            onSubmit={(e) => {
                handleTodo(e)
                inputField.current?.blur()
            }}
        >
            <input
                ref={inputField}
                value={todo}
                onChange={(e) => {
                    setTodo(e.target.value)
                }}
                type="text"
                placeholder="Please enter a task"
                className="input"
            />
            <button className="button">Enter</button>
        </form>
    )
}

export default InputField
