import { useNavigate } from 'react-router-dom'

import ProjectFrom from '../project/ProjectForm';
import styles from './NewProject.module.css'

function NewProject (){

    const navigate = useNavigate()

    function createPost (project){

        //Intialize cost and services
        project.cost = 0
        project.services= []
        
        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data)=> {
                console.log(data)
                //redirect
                navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}})
            })
            .catch(err => console.log(err))
        }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie o seu projeto para depois adicionar o seu serviço</p>
            <ProjectFrom handleSubmit={createPost} btnText='Criar Projeto'/>
        </div>
    )
}
export default NewProject;