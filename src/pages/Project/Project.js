import { useParams, useSearchParams } from 'react-router-dom';

import TodoListContainer from './TodoList';
import LeftNavbar from '~/layouts/components/LeftNavbar';
import ProjectManagement from './ProjectManagement';

function Project() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    // console.log(useParams())
    // return <TodoListContainer />;
    console.log(type)
    if(type === 'TodoList')
        return <TodoListContainer />;
    else{
        return <ProjectManagement />
    }
    
}

export default Project;
