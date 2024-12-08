import React from 'react'
import { useParams } from 'react-router-dom'

function TodoDetail() {
  const params = useParams();

  // const todoId = params.todoId;

  return (
    <div>
      <div>todo Title</div>
      <div>todo Content</div>
    </div>
  )
}

export default TodoDetail