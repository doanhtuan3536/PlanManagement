import { useParams } from 'react-router-dom';

import TodoListContainer from './TodoList';
import LeftNavbar from '~/layouts/components/LeftNavbar';
import ProjectManagement from './ProjectManagement';

function Project() {
    const { id } = useParams();
    // console.log(useParams())
    // return <TodoListContainer />;
    return <ProjectManagement />
}

export default Project;
