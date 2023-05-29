import { useEffect, useState } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function App() {
  const [input, setInput] = useState();
  const [listOfItems, setListOfItems] = useState(getLocalData());
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState();

  function onSubmit(e) {
    e.preventDefault();
  }

  function addItem(input) {
    if (editMode) {
      setListOfItems(
        listOfItems.map((item) => {
          if (item.id === editId) {
            return { ...item, name: input };
          }
          return item;
        })
      );
    } else {
      const newList = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setListOfItems([...listOfItems, newList]);
    }

    setInput("");
  }

  function editItem(inputId) {
    const editItem = listOfItems.find((item) => {
      return item.id === inputId;
    });

    setInput(editItem.name);
    setEditId(inputId);
    setEditMode(true);
  }

  function deleteItem(inputId) {
    const updatedList = listOfItems.filter((item) => {
      return item.id !== inputId;
    });
    setListOfItems(updatedList);
  }

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(listOfItems));
  }, [listOfItems]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        ></input>
        <button onClick={() => addItem(input)} type="submit">
          Add
        </button>
      </form>
      {listOfItems.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <button onClick={() => editItem(item.id)} type="submit">
              Edit
            </button>
            <button onClick={() => deleteItem(item.id)} type="submit">
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
