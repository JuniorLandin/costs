import Mensagem from "../layout/Mensagem";
import { useLocation } from "react-router-dom";
import styles from './Projects.module.css'
import Container from "../layout/Container";
import LinkButtom from "../layout/LinkButton"
import ProjectCards from "../project/ProjectCards";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";


function Projects(){

    const [projects, setProjects] = useState([])
    const [removeL, setRemoveL] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=> {
        setTimeout(()=> {
            fetch(`http://localhost:5000/projects`, {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                },
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setProjects(data)
                setRemoveL(true)
            })
            .catch((err) => console.log(err))
        }, 300)
    }, [])

    function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
        })
        .then((resp) => resp.json())
        .then(()=>{
            setProjects(projects.filter((project)=> project.id !== id))
            setProjectMessage("Projeto removido com sucesso!")
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButtom to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Mensagem type = "success" msg={message}/>}
            {projectMessage && <Mensagem type = "success" msg={projectMessage}/>}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project)=> (
                    <ProjectCards
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project?.category?.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                    ))}
                    {!removeL && <Loading/>}
                    {removeL && projects.length ===0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}

export default Projects;