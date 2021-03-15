import { useEffect, useState } from 'react';

const App = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [singleTodo, setSingleTodo] = useState('');

  useEffect(() => {
    console.log('DID__MOUNT');
    return () => console.log('UNMOUNT');
  }, []);

  useEffect(() => {
    if (allTodos.length) {
      console.log('DID_UPDATE');
    }
  }, [allTodos, singleTodo]);

  const createTodo = () => {
    setAllTodos([
      ...allTodos,
      {
        id: new Date().getTime(),
        name: singleTodo,
        isDone: false,
      },
    ]);
    setSingleTodo('');
  };

  const changeStatusTodo = (id, isDone) => {
    const copyTodos = allTodos.map((todo) => {
      if (todo.id === id) {
        console.log('Yes', isDone);
        return { ...todo, isDone };
      } else {
        console.log('todo', todo);
        return { ...todo };
      }
    });
    
    setAllTodos(copyTodos);
  };
  console.log('allTodos', allTodos);

  return (
    <div className="App">
      <input
        type="text"
        // value={singleTodo}
        onChange={(e) => setSingleTodo(e.target.value)}
      />
      <button onClick={createTodo}>Create Todo</button>
      {allTodos.length ? (
        <ul>
          {allTodos.map((todo) => (
            <li
              key={todo.id}
              style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
            >
              <label>
                <input
                  type="checkbox"
                  // checked={todo.isDone}
                  onChange={(e) => changeStatusTodo(todo.id, e.target.checked)}
                />
              </label>
              {todo.name}
            </li>
          ))}
        </ul>
      ) : (
        <h3>You don't have any todos</h3>
      )}
      ;
    </div>
  );
};

export default App;
