import TaskCard from './TaskCard'

function TaskList({ tasks, onUpdateStatus, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks found. Add your first task!</p>
      </div>
    )
  }

  return (
    <div className="tasks-container">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList