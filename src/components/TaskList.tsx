import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return      //Verificação para caso o o título seja vazio

    const newTask = {             // Criando um nova Tasks
      id: Math.random(),          // Gerando um ID aleatório
      title: newTaskTitle,        // Pegando o valor do input e atribuindo a Props title
      isComplete: false           // Iniciando com o valor False
    }

    setTasks(oldState => [...oldState, newTask])  // Atualizando o antigo State das Tasks, add a nova Task
    setNewTaskTitle('')                           // Deixa o input vazio
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(tasks => tasks.id == id ? {    // Percorre as Tasks que tem um ID igual do input
      ...tasks,
      isComplete: !tasks.isComplete   // Inverte o valor da isComplete             
    } : tasks)                        // Retorna as Tasks já cadastradas caso o ID não foi encontrado

    setTasks(newTasks)                // Cria uma nova instância com as atualizações
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(tasks => tasks.id !== id)  // Cria um novo Array com as Tasks, exceto a Tasks com ID do input

    setTasks(filteredTasks)           // Cria uma nova instância com as atualizações
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}