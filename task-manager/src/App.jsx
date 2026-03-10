import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Badge, Button, Form, Alert, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'  // Import custom CSS with media queries

const API_URL = 'http://localhost:5000/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  })
  const [errors, setErrors] = useState({})

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL)
      setTasks(response.data.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 5) {
      newErrors.description = 'Description must be at least 5 characters'
    }
    return newErrors
  }

  // Add new task
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await axios.post(API_URL, formData)
      setTasks([response.data.data, ...tasks])
      setFormData({ title: '', description: '', priority: 'Medium' })
      setShowForm(false)
      setErrors({})
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Update task status
  const updateTaskStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending'
      const response = await axios.put(`${API_URL}/${id}`, { status: newStatus })
      setTasks(tasks.map(task => task._id === id ? response.data.data : task))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        setTasks(tasks.filter(task => task._id !== id))
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status.toLowerCase() === filter
  })

  // Calculate stats
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length

  // Get priority badge color
  const getPriorityVariant = (priority) => {
    switch(priority) {
      case 'High': return 'danger'
      case 'Medium': return 'warning'
      case 'Low': return 'success'
      default: return 'secondary'
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Container className="app-container py-4">
      {/* Header with responsive text */}
      <Card className="header-card text-center mb-4 shadow-sm">
        <Card.Body>
          <h1 className="responsive-title">📋 Task Manager</h1>
          <p className="responsive-subtitle text-muted">Organize your daily tasks efficiently</p>
        </Card.Body>
      </Card>

      {/* Stats Cards with responsive layout */}
      <Row className="stats-row mb-4">
        <Col xs={12} sm={4} className="stat-col mb-3 mb-sm-0">
          <Card className="stat-card text-center shadow-sm h-100">
            <Card.Body className="stat-body">
              <Card.Title className="stat-label">Total Tasks</Card.Title>
              <h2 className="stat-value">{totalTasks}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} className="stat-col mb-3 mb-sm-0">
          <Card className="stat-card text-center shadow-sm h-100">
            <Card.Body className="stat-body">
              <Card.Title className="stat-label">Completed</Card.Title>
              <h2 className="stat-value text-success">{completedTasks}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} className="stat-col">
          <Card className="stat-card text-center shadow-sm h-100">
            <Card.Body className="stat-body">
              <Card.Title className="stat-label">Pending</Card.Title>
              <h2 className="stat-value text-warning">{pendingTasks}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Task Button - responsive */}
      <div className="action-section text-center mb-4">
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => setShowForm(!showForm)}
          className="action-button px-4"
        >
          {showForm ? '− Close Form' : '+ Add New Task'}
        </Button>
      </div>

      {/* Add Task Form - responsive */}
      {showForm && (
        <Card className="form-card mb-4 shadow-sm">
          <Card.Body>
            <h5 className="form-title mb-3">Add New Task</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-group mb-3">
                <Form.Label className="form-label">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  isInvalid={!!errors.title}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group mb-3">
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  isInvalid={!!errors.description}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group mb-3">
                <Form.Label className="form-label">Priority</Form.Label>
                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="submit-button w-100">
                Add Task
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Filter Buttons - responsive */}
      <Row className="filter-section mb-4">
        <Col className="filter-container">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline-primary'}
            onClick={() => setFilter('all')}
            className="filter-button"
          >
            All
          </Button>
          <Button 
            variant={filter === 'pending' ? 'warning' : 'outline-warning'}
            onClick={() => setFilter('pending')}
            className="filter-button"
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'completed' ? 'success' : 'outline-success'}
            onClick={() => setFilter('completed')}
            className="filter-button"
          >
            Completed
          </Button>
        </Col>
      </Row>

      {/* Tasks List - responsive grid */}
      {loading ? (
        <div className="loading-section text-center py-5">
          <Spinner animation="border" variant="primary" className="loading-spinner" />
          <p className="loading-text mt-2">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <Alert variant="info" className="empty-alert text-center">
          No tasks found. Add your first task!
        </Alert>
      ) : (
        <Row className="tasks-grid g-4">
          {filteredTasks.map(task => (
            <Col key={task._id} className="task-col">
              <Card className="task-card h-100 shadow-sm">
                <Card.Body className="task-body">
                  <div className="task-header">
                    <Card.Title className="task-title">{task.title}</Card.Title>
                    <Badge 
                      bg={getPriorityVariant(task.priority)} 
                      className="priority-badge"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <Card.Text className="task-description">
                    {task.description}
                  </Card.Text>

                  <div className="task-footer">
                    <Badge 
                      bg={task.status === 'Completed' ? 'success' : 'warning'}
                      className="status-badge"
                    >
                      {task.status}
                    </Badge>
                    
                    <div className="task-actions">
                      <Button
                        size="sm"
                        variant={task.status === 'Completed' ? 'outline-warning' : 'outline-success'}
                        onClick={() => updateTaskStatus(task._id, task.status)}
                        className="action-btn complete-btn"
                      >
                        {task.status === 'Completed' ? '↩' : '✓'}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteTask(task._id)}
                        className="action-btn delete-btn"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>

                  <small className="task-date">
                    {formatDate(task.createdDate)}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default App