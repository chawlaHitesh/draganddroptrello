/* eslint-disable no-unsafe-optional-chaining */
// TodoList.js

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Todo } from '../../model'
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    NotDraggingStyle
} from 'react-beautiful-dnd'
interface Props {
    todoList: Todo[]
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}
type EditTodo = {
    isEdit: boolean | null
    todo: string
    id: number | null
}

const abc = async (): Promise<number> => {
    return 1
}
const TodoList = ({ todoList, setTodoList }: Props) => {
    const [completedTask, setCompletedTask] = useState<Todo[] | []>([])
    const inputField = useRef<HTMLInputElement>(null)
    const [isEdit, setisEdit] = useState<EditTodo>()
    function handleStatus(id: number) {
        setTodoList((pre) => {
            return pre.map((e) => {
                if (e.id === id) {
                    return {
                        ...e,
                        isDone: !e.isDone
                    }
                }
                return e
            })
        })
    }
    const handleDelete = (id: number) => {
        setTodoList((pre) => pre.filter((e) => e.id !== id))
    }

    const handleEditSubmit = (e: FormEvent) => {
        e.preventDefault()
        setTodoList((pre) => {
            return pre.map((e) =>
                e.id === isEdit?.id ? { ...e, todo: isEdit.todo } : e
            )
        })
        setisEdit({
            id: null,
            isEdit: false,
            todo: ''
        })
    }

    const handleEdit = (todo: Todo) => {
        setisEdit({
            isEdit: true,
            todo: todo.todo,
            id: todo.id
        })
    }
    useEffect(() => {
        inputField.current?.focus()
    }, [isEdit?.id])
    let key: any = {
        pending: 0,
        complete: 1
    }
    function onDragEnd(data: any) {
        let finalData = [[...todoList], [...completedTask]]
        if (
            data?.source?.droppableId === data?.destination?.droppableId &&
            data?.source?.index === data?.destination?.index
        ) {
            return false
        }

        const finaldata: Todo[] | undefined = [
            ...finalData?.[key[data?.source?.droppableId]]
        ]
        console.log(finaldata, 'finaldatafinaldata')
        const [removed] = finaldata.splice(data?.source?.index, 1)
        if (data?.source?.droppableId === data?.destination?.droppableId) {
            finaldata.splice(data?.destination?.index, 0, removed)
            console.log(finaldata, 'finaldata')
            setTodoList(finaldata)
        } else {
            // const finaldatas: Todo[] | undefined = [
            //     ...finalData?.[key[data?.destination?.droppableId]]
            // ]
            // finaldatas.splice(data?.destination?.index, 0, removed)
            // console.log(removed, 'removed')
            setCompletedTask([...completedTask, removed])
            setTodoList((pre) => {
                let a = [...pre]
                a.splice(data?.destination?.index, 1)
                return a
            })
        }
    }
    const getItemStyle = (
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
        isDragging: boolean
    ) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    })
    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: 8,
        width: 250
    })
    return (
        <div>
            <h2>Your Todo List</h2>
            <ul className="todo-list">
                <li className="todo-item header">
                    <span>Task</span>
                    <span>Actions</span>
                </li>
                <DragDropContext onDragEnd={onDragEnd}>
                    <h1>Pending</h1>
                    <Droppable droppableId="pending">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {todoList.map((todo, index) => {
                                    return (
                                        <Draggable
                                            key={todo.id}
                                            draggableId={todo.id.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    // style={getItemStyle(
                                                    //     provided.draggableProps
                                                    //         .style,
                                                    //     snapshot.isDragging
                                                    // )}
                                                    key={todo.id}
                                                    className={`todo-item ${
                                                        todo.isDone
                                                            ? 'done'
                                                            : ''
                                                    }`}
                                                >
                                                    {isEdit?.id === todo.id ? (
                                                        <form
                                                            onSubmit={
                                                                handleEditSubmit
                                                            }
                                                        >
                                                            <input
                                                                ref={inputField}
                                                                value={
                                                                    isEdit?.todo
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setisEdit(
                                                                        (
                                                                            pre
                                                                        ) => {
                                                                            if (
                                                                                pre
                                                                            ) {
                                                                                return {
                                                                                    ...pre,
                                                                                    todo: e
                                                                                        .target
                                                                                        .value
                                                                                }
                                                                            }
                                                                        }
                                                                    )
                                                                }}
                                                                type="text"
                                                                placeholder="Please enter a task"
                                                                className="input"
                                                            />
                                                        </form>
                                                    ) : (
                                                        <span>{todo.todo}</span>
                                                    )}

                                                    <div className="action-buttons">
                                                        <button
                                                            className="button__action edit-button"
                                                            disabled={
                                                                todo.isDone
                                                            }
                                                            onClick={() => {
                                                                handleEdit(todo)
                                                            }}
                                                        >
                                                            ✎ {/* Edit Icon */}
                                                        </button>
                                                        <button
                                                            className="button__action delete-button"
                                                            onClick={() => {
                                                                handleDelete(
                                                                    todo.id
                                                                )
                                                            }}
                                                        >
                                                            🗑{' '}
                                                            {/* Delete Icon */}
                                                        </button>
                                                        <button
                                                            className={`button__action ${
                                                                todo.isDone
                                                                    ? 'undone-button'
                                                                    : 'done-button'
                                                            }`}
                                                            onClick={() => {
                                                                handleStatus(
                                                                    todo.id
                                                                )
                                                            }}
                                                        >
                                                            {todo.isDone
                                                                ? '✘'
                                                                : '✔'}{' '}
                                                            {/* Done/Undone Icons */}
                                                        </button>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <h1>Completed</h1>
                    <Droppable droppableId="completed">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {completedTask?.map((todo, index) => {
                                    return (
                                        <Draggable
                                            key={todo.id}
                                            draggableId={todo.id.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    // style={getItemStyle(
                                                    //     provided.draggableProps
                                                    //         .style,
                                                    //     snapshot.isDragging
                                                    // )}
                                                    key={todo.id}
                                                    className={`todo-item ${
                                                        todo.isDone
                                                            ? 'done'
                                                            : ''
                                                    }`}
                                                >
                                                    {isEdit?.id === todo.id ? (
                                                        <form
                                                            onSubmit={
                                                                handleEditSubmit
                                                            }
                                                        >
                                                            <input
                                                                ref={inputField}
                                                                value={
                                                                    isEdit?.todo
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setisEdit(
                                                                        (
                                                                            pre
                                                                        ) => {
                                                                            if (
                                                                                pre
                                                                            ) {
                                                                                return {
                                                                                    ...pre,
                                                                                    todo: e
                                                                                        .target
                                                                                        .value
                                                                                }
                                                                            }
                                                                        }
                                                                    )
                                                                }}
                                                                type="text"
                                                                placeholder="Please enter a task"
                                                                className="input"
                                                            />
                                                        </form>
                                                    ) : (
                                                        <span>{todo.todo}</span>
                                                    )}

                                                    <div className="action-buttons">
                                                        <button
                                                            className="button__action edit-button"
                                                            disabled={
                                                                todo.isDone
                                                            }
                                                            onClick={() => {
                                                                handleEdit(todo)
                                                            }}
                                                        >
                                                            ✎ {/* Edit Icon */}
                                                        </button>
                                                        <button
                                                            className="button__action delete-button"
                                                            onClick={() => {
                                                                handleDelete(
                                                                    todo.id
                                                                )
                                                            }}
                                                        >
                                                            🗑{' '}
                                                            {/* Delete Icon */}
                                                        </button>
                                                        <button
                                                            className={`button__action ${
                                                                todo.isDone
                                                                    ? 'undone-button'
                                                                    : 'done-button'
                                                            }`}
                                                            onClick={() => {
                                                                handleStatus(
                                                                    todo.id
                                                                )
                                                            }}
                                                        >
                                                            {todo.isDone
                                                                ? '✘'
                                                                : '✔'}{' '}
                                                            {/* Done/Undone Icons */}
                                                        </button>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ul>
        </div>
    )
}

export default TodoList
