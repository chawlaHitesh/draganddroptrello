/* eslint-disable no-unsafe-optional-chaining */
// TodoList.js

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Todo } from '../../model'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
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
interface ProcessType {
    id: number
    task_name: string
}
interface ProcesschildType {
    id: number
    children: ProcessType[]
}
const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
})
const Testing = ({ todoList, setTodoList }: Props) => {
    const [isAdd, setisAdd] = useState<number>(0)
    const [processchild, setProcesschild] = useState<ProcesschildType[] | []>(
        []
    )
    const [inputField, setinputField] = useState<string>('')
    const [process, setProcess] = useState<ProcessType[] | []>([])
    const onDragEnd = (e: any) => {
        const { source, destination } = e
        if (!source || !destination) {
            return false
        }
        let finalizeData = [...processchild]
        let removed = finalizeData
            .find((e) => e.id == source?.droppableId)
            ?.children?.splice(source?.index, 1)
        if (removed) {
            let added = finalizeData
                .find((e) => e.id == destination?.droppableId)
                ?.children?.splice(destination?.index, 0, removed[0])
        }
        console.log({ finalizeData }, 'finalizeData')
    }
    const handleEditSubmit = (e: FormEvent) => {
        e.preventDefault()
        let id = Date.now()
        setProcess((pre) => {
            return [...pre, { id: id, task_name: inputField }]
        })
        setProcesschild((pre) => {
            return [...pre, { id: id, children: [] }]
        })
        setinputField('')
    }

    function handleEditSubmitchild(id: number, index: number) {
        let findData = processchild?.find((e) => e.id === id) || {
            children: []
        }
        setProcesschild((pre) => {
            let data = [...pre]
            let final = data?.map((item) => {
                if (item?.id === id) {
                    return {
                        ...item,
                        children: [
                            ...item.children,
                            { id: Date.now(), task_name: inputField }
                        ]
                    }
                }
                return item
            })
            return final
        })
        setisAdd(0)
        setinputField('')
    }
    return (
        <div>
            {isAdd === 1 ? (
                <>
                    <form onSubmit={handleEditSubmit}>
                        <input
                            required
                            value={inputField}
                            onChange={(e) => {
                                setinputField(e.target.value)
                            }}
                            type="text"
                            placeholder="Please enter a task"
                            className="input"
                        />
                        <button>Add</button>
                    </form>
                    <button
                        type="button"
                        onClick={() => {
                            setisAdd(0)
                        }}
                    >
                        '✘'
                    </button>
                </>
            ) : (
                <button
                    onClick={() => {
                        setisAdd(1)
                    }}
                >
                    Add Process
                </button>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="main__container">
                    {process?.map((item, index) => {
                        return (
                            <React.Fragment key={item.id}>
                                <div className="card">
                                    <div className='card-inner'>
                                        <div className="card-title">
                                            {item?.task_name}
                                        </div>
                                        <Droppable
                                            droppableId={item.id?.toString()}
                                        >
                                            {(provided, snapshot) => (
                                                <>
                                                
                                                <div
                                                    className="children"
                                                    ref={provided.innerRef}
                                                    style={getListStyle(
                                                        snapshot.isDraggingOver
                                                    )}
                                                    {...provided.droppableProps}
                                                >
                                                    {processchild
                                                        ?.find(
                                                            (e) => e.id === item?.id
                                                        )
                                                        ?.children.map(
                                                            (process, index) => {
                                                                return (
                                                                    <Draggable
                                                                        key={
                                                                            process.id
                                                                        }
                                                                        draggableId={process.id.toString()}
                                                                        index={
                                                                            index
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided,
                                                                            snapshot
                                                                        ) => (
                                                                            <div
                                                                                className="child"
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.dragHandleProps}
                                                                                {...provided.draggableProps}
                                                                                // style={getItemStyle(
                                                                                //     provided.draggableProps
                                                                                //         .style,
                                                                                //     snapshot.isDragging
                                                                                // )}
                                                                                key={
                                                                                    process.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    process?.task_name
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            }
                                                        )}
                                                    {provided.placeholder}
                                                </div>
                                                </>
                                            )}
                                        </Droppable>
                                    </div>
                                    <div className="child">
                                        {isAdd === item?.id ? (
                                            <>
                                                <input
                                                    required
                                                    value={
                                                        inputField
                                                    }
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        setinputField(
                                                            e.target
                                                                .value
                                                        )
                                                    }}
                                                    type="text"
                                                    placeholder="Please enter a task"
                                                />

                                                <button
                                                    onClick={() =>
                                                        handleEditSubmitchild(
                                                            item?.id,
                                                            index
                                                        )
                                                    }
                                                >
                                                    Add
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setisAdd(0)
                                                    }}
                                                >
                                                    '✘'
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setisAdd(
                                                        item?.id
                                                    )
                                                }}
                                            >
                                                Add Process
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

export default Testing
