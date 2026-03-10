function TaskCard({ task, onUpdateStatus, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get priority badge color
  const getPriorityColor = () => {
    switch(task.priority) {
      case 'High': return '#ff4444'  // Bright Red
      case 'Medium': return '#ffbb33' // Bright Yellow
      case 'Low': return '#00C851'    // Bright Green
      default: return '#33b5e5'       // Blue
    }
  }

  // Get status color
  const getStatusColor = () => {
    switch(task.status) {
      case 'Pending': return '#ffbb33'  // Bright Yellow
      case 'Completed': return '#00C851' // Bright Green
      default: return '#aaaaaa'
    }
  }

  const priorityColor = getPriorityColor()
  const statusColor = getStatusColor()

  return (
    <div className="task-card" style={{
      background: '#1a1a1a',  // Dark black background
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      border: '1px solid #333333',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Colored accent line based on priority */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: priorityColor
      }} />

      <div className="task-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px'
      }}>
        <span className="task-title" style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#ffffff',  // White text
          flex: 1,
          marginRight: '10px',
          wordBreak: 'break-word'
        }}>
          {task.title}
        </span>
        
        {/* Priority Badge */}
        <span className="priority-badge" style={{
          background: priorityColor,
          color: '#000000',  // Black text on colored background
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap'
        }}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="task-description" style={{
        color: '#cccccc',  // Light gray text
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '20px',
        wordBreak: 'break-word'
      }}>
        {task.description}
      </p>

      {/* Footer */}
      <div className="task-footer" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        paddingTop: '15px',
        borderTop: '1px solid #333333'
      }}>
        {/* Status Badge */}
        <span className="status-badge" style={{
          background: statusColor,
          color: '#000000',  // Black text
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {task.status}
        </span>
        
        {/* Action Buttons */}
        <div className="task-actions" style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            className="complete-btn"
            onClick={() => onUpdateStatus(task._id, task.status)}
            style={{
              background: task.status === 'Pending' ? '#ffbb33' : '#00C851',
              color: '#000000',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              minWidth: '80px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 2px 8px rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = 'none'
            }}
          >
            {task.status === 'Pending' ? '✓ Complete' : '↩ Pending'}
          </button>
          
          <button
            className="delete-btn"
            onClick={() => onDelete(task._id)}
            style={{
              background: '#ff4444',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              minWidth: '70px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 2px 8px rgba(255,68,68,0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = 'none'
            }}
          >
            ✕ Delete
          </button>
        </div>
      </div>

      {/* Created Date */}
      <div className="created-date" style={{
        fontSize: '11px',
        color: '#888888',  // Gray text
        marginTop: '15px',
        textAlign: 'right',
        borderTop: '1px dashed #333333',
        paddingTop: '10px'
      }}>
        📅 Created: {formatDate(task.createdDate)}
      </div>
    </div>
  )
}

export default TaskCard