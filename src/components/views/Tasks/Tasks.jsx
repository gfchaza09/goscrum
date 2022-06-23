import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import debounce from "lodash.debounce";
import Skeleton from 'react-loading-skeleton';

import { useResize } from "../../../hooks/useResize";

import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";

import { getTasks, deleteTask, editTaskStatus } from '../../../store/actions/tasksActions';

import 'react-loading-skeleton/dist/skeleton.css';
import './Tasks.styles.css';

export const Tasks = () => {
    
    const [list, setList] = useState(null);
    const [renderList, setRenderList] = useState(null);
    const [taskFromWho, setTaskFromWho] = useState("ALL");
    const [search, setSearch] = useState("");
    const { isPhone } = useResize();

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTasks(taskFromWho === "ME" ? "me" : ""))
    }, [taskFromWho])

    const { loading, error, tasks } = useSelector(state => {
        return state.tasksReducer;
    })

    useEffect(() => {
      if (tasks?.length) {
          setList(tasks);
          setRenderList(tasks);
      }
    }, [tasks])

    useEffect(() => {
        if(search) {
            setRenderList(
                list.filter(data => data.title.startsWith(search))
            )
        } else {
            setRenderList(list);
        }
    }, [search])

    const renderColumnCards = text => {
        return renderList?.filter(data => data.status === text).map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}/>);
    }

    const handleChangeImportance = (event) => {
        if(event.currentTarget.value === "ALL") {
            setRenderList(list);
        } else {
            setRenderList(list.filter(data => data.importance === event.currentTarget.value));
        }
    }

    const handleSearch = debounce(event => {
        setSearch(event?.target?.value);
    }, 1000);

    const handleDelete = id => {
        dispatch(deleteTask(id));
    }

    const handleEditCardStatus = data => dispatch(editTaskStatus(data))

    if (error) return <div>Hay un error</div>

    return (
        <>
            <Header /> 
            <main id="tasks">
                <TaskForm />
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis tareas</h2>
                    </div>
                    <div className="filters">
                        <FormControl>
                            <RadioGroup defaultValue="ALL" row aria-labelledby="demo-row-radio-buttons-group-label" onChange={(event) => setTaskFromWho(event.currentTarget.value)}>
                                <FormControlLabel value="ALL" control={<Radio className={`radio_button ${taskFromWho === 'ALL' ? "active" : ""}`} />} label="Todas"/>
                                <FormControlLabel value="ME" control={<Radio className={`radio_button ${taskFromWho === 'ME' ? "active" : ""}`} />} label="Mis tareas"/>
                            </RadioGroup>
                        </FormControl>
                        <div className="search">
                            <input type="text" placeholder="Seleccionar por título..." onChange={handleSearch}/>
                        </div>
                        <select name="importance" onChange={handleChangeImportance}>
                            <option value="">Seleccionar una prioridad</option>
                            <option value="ALL">Todas</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                    </div>
                    {isPhone ? (<div className="list phone">
                        {!renderList?.length ? <div>No hay tareas creadas</div> : loading ? <Skeleton height={90}/> : (
                            <>
                                <div className="list">
                                    <h4>Nuevas</h4>
                                    { renderColumnCards("NEW") }
                                </div>
                                <div className="list">
                                    <h4>En proceso</h4>
                                    { renderColumnCards("IN PROGRESS") }
                                </div>
                                <div className="list">
                                    <h4>Finalizadas</h4>
                                    { renderColumnCards("FINISHED") }
                                </div>
                            </>
                        )}
                    </div>) : (<div className="list_group">
                        {!renderList?.length ? <div>No hay tareas creadas</div> : loading ? <Skeleton height={90}/> : (
                            <>
                                <div className="list">
                                    <h4>Nuevas</h4>
                                    { renderColumnCards("NEW") }
                                </div>
                                <div className="list">
                                    <h4>En proceso</h4>
                                    { renderColumnCards("IN PROGRESS") }
                                </div>
                                <div className="list">
                                    <h4>Finalizadas</h4>
                                    { renderColumnCards("FINISHED") }
                                </div>                  
                            </>
                        )}
                    </div>)}                   
                </section>
            </main>
        </>
    )

}