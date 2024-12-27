import { Fragment, useState } from 'react';
import styles from './App.module.css'

function App() {
  const [task, getTask] = useState("");
  const [list, setList] = useState([]);
  const [selectedIndex,setSelectedIndex]=useState(-1);
  const onSave = () => {
    if(selectedIndex===-1){
      const obj={
        id: list.length + 1,
        description: task,
        checked: false
      }
      setList([...list,...[obj]]);
      getTask("");
    }else{
      list[selectedIndex].description=task;
      setList([...list]);
      getTask("");
      setSelectedIndex(-1);
    }
  }


  const deleteTask=(index)=>{
    console.log("clicked",index);
    list.splice(index,1);
    setList([...list]);
  }
  
  const editTask=(value,index)=>{
    setSelectedIndex(index);
    console.log("clicked");
    getTask(value.description);
  }

  const onSelected=(event,index)=>{
    list[index].checked=event.target.checked;
    setList([...list]);
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["box"]}>
        <input type='text' placeholder='Enter Task' onChange={(event) => getTask(event.target.value)} 
        className={styles["mb-10"]} value={task}/>
        <button onClick={() => onSave()}>Save</button>
        {
          list?.map((value,index) => {
            return (
              <div key={value.id} className={styles["mb-10"]}>
               
                <input type="checkbox" disabled={selectedIndex!==-1} checked={value.checked} className={styles["mr-5"]} onChange={(event)=>onSelected(event,index)}/>
                
                <span className={value.checked?styles["strikeoff"]:""}>{value.description}</span>
                {
                  selectedIndex === -1 && <Fragment>
                  {
                    !value.checked&&<button className={styles["ml-5"]} onClick={()=>editTask(value,index)} >Edit</button>
                  }
                  
                  <button className={styles["ml-5"]} onClick={()=>deleteTask(index)}>Delete</button>
                  </Fragment>
                }
                
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
