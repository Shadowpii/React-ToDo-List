import './App.css';
import React,{useState,useEffect} from "react";
//import components
import Form from './components/form';
import TodoList from './components/todolist';

function App() {
 
  // State
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  
 // use ONCE when it start
 useEffect(() => {
  // Local Todos
  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') ===null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
  }
  };
  
  getLocalTodos();
 },[]);
  
  // Use Effect
  useEffect(() =>{
    // Function
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
   // Save to Local
  const saveLocalTodos = () =>{
    localStorage.setItem("todos",JSON.stringify(todos));  
  };

    filterHandler();
    saveLocalTodos();
  }, [todos,status]);

 
 
  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus ={setStatus}
      
      />
      <TodoList 
      filteredTodos={filteredTodos}
      setTodos={setTodos} 
      todos={todos}/>
    </div>
  );
}

export default App;
