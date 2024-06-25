import { useModel } from 'src/.maj/model/index';
function ModelPage() {
  const { todos, addTodos } = useModel('todo');
  return (
    <div>
      Hello Model!{' '}
      <ul>
        {todos.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          addTodos(Math.random().toString());
        }}
      >
        {' '}
        add todo
      </button>
    </div>
  );
}

export default ModelPage;
