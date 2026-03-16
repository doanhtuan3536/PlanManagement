import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTasks,
    faListCheck,
    faDiagramProject,
    faCoins,
    faUser,
    faCircleCheck,
    faAt,
    faEnvelope,
    faPhone,
    faCakeCandles,
    faVenusMars,
    faCalendar,
    faClock,
    faMagnifyingGlass,
    faXmark,
    faEye,
    faBriefcase,
    faHouse,
    faBook,
    faCartShopping,
    faDumbbell,
    faPlane,
    faBookOpen,
    faBroom,
    faHeartPulse,
    faUtensils,
    faGift,
    faGraduationCap,
    faMobile,
    faChartLine,
    faWindowMaximize,
    faFlask,
    faGamepad,
    faPaintbrush,
    faGear,
    faWallet,
    faPiggyBank,
    faFileInvoice,
    faBuilding,
    faShield,
    faChevronLeft,
    faChevronRight,
    faFaceFrown,
    faNoteSticky,
    faScaleBalanced,
    faX
} from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { useAuth } from '~/context/AuthContext';
import Pagination from '../components/Pagination';
import Button from '~/components/Button';
import Loading from '../Loading';
import authService from '~/services/AuthService';
import { useNotificatonContext } from '~/context/NotificationContext';

const cx = classNames.bind(styles);

// Mock data
const todoLists = [
    { name: 'Work tasks', items: 8, due: 'today', icon: faBriefcase },
    { name: 'Personal', items: 5, due: 'tomorrow', icon: faHouse },
    { name: 'Study plan', items: 4, due: 'next week', icon: faBook },
    { name: 'Shopping', items: 6, due: 'weekend', icon: faCartShopping },
    { name: 'Fitness', items: 3, due: 'daily', icon: faDumbbell },
    { name: 'Weekend trip', items: 7, due: 'Friday', icon: faPlane },
    { name: 'Reading list', items: 4, due: 'monthly', icon: faBookOpen },
    { name: 'Home chores', items: 9, due: 'today', icon: faBroom },
    { name: 'Workout', items: 5, due: 'evening', icon: faHeartPulse },
    { name: 'Meal prep', items: 3, due: 'Sunday', icon: faUtensils },
    { name: 'Gifts', items: 4, due: 'next month', icon: faGift },
    { name: 'Learning', items: 6, due: 'ongoing', icon: faGraduationCap }
];

const projects = [
    { name: 'Mobile app', progress: 65, tasks: '12/19', due: '2025-05-12', icon: faMobile },
    { name: 'Q2 campaign', progress: 30, budget: '€4.2k/€6k', due: '23d left', icon: faChartLine },
    { name: 'Website redesign', progress: 90, tasks: '8/9', due: 'review', icon: faWindowMaximize },
    { name: 'Research', progress: 45, phase: 'phase 2', due: 'June', icon: faFlask },
    { name: 'Mobile game', progress: 15, tasks: '3/20', due: 'December', icon: faGamepad },
    { name: 'Brand guide', progress: 70, tasks: '7/10', due: '2025-04-30', icon: faPaintbrush },
    { name: 'Internal tool', progress: 40, tasks: '8/15', due: 'Q3', icon: faGear }
];

const moneyAccounts = [
    { name: 'Main wallet', balance: '€1,280', income: '+€250', expense: '-€120', icon: faWallet },
    { name: 'Project budget', balance: '€4,200', note: '3 projects', icon: faBriefcase },
    { name: 'Savings', balance: '€3,050', change: '+8%', icon: faPiggyBank },
    { name: 'Invoices', balance: '€940', note: '2 pending', icon: faFileInvoice },
    { name: 'Business', balance: '€5,600', note: 'company account', icon: faBuilding },
    { name: 'Emergency', balance: '€2,100', note: 'reserve fund', icon: faShield }
];

const ITEMS_PER_PAGE = 4;

function Profile() {
    // Filter states
    const [todoFilter, setTodoFilter] = useState('');
    const [projectFilter, setProjectFilter] = useState('');
    const [moneyFilter, setMoneyFilter] = useState('');
    const [globalFilter, setGlobalFilter] = useState('');
    const {getUserInfo} = useAuth()
    const {showNotification} = useNotificatonContext();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    // Page states
    const [todoPage, setTodoPage] = useState(1);
    const [projectPage, setProjectPage] = useState(1);
    const [moneyPage, setMoneyPage] = useState(1);

    // Refs for search inputs
    const todoSearchRef = useRef(null);
    const projectSearchRef = useRef(null);
    const moneySearchRef = useRef(null);
    const globalSearchRef = useRef(null);



    // Filter functions
    const filterTodos = () => {
        let filtered = todoLists.filter(item =>
            item.name.toLowerCase().includes(todoFilter.toLowerCase()) ||
            item.due.toLowerCase().includes(todoFilter.toLowerCase())
        );

        if (globalFilter) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                item.due.toLowerCase().includes(globalFilter.toLowerCase())
            );
        }
        return filtered;
    };

    const filterProjects = () => {
        let filtered = projects.filter(item =>
            item.name.toLowerCase().includes(projectFilter.toLowerCase()) ||
            (item.tasks && item.tasks.toLowerCase().includes(projectFilter.toLowerCase())) ||
            (item.phase && item.phase.toLowerCase().includes(projectFilter.toLowerCase()))
        );

        if (globalFilter) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                (item.tasks && item.tasks.toLowerCase().includes(globalFilter.toLowerCase())) ||
                (item.phase && item.phase.toLowerCase().includes(globalFilter.toLowerCase()))
            );
        }
        return filtered;
    };

    const filterMoney = () => {
        let filtered = moneyAccounts.filter(item =>
            item.name.toLowerCase().includes(moneyFilter.toLowerCase()) ||
            (item.note && item.note.toLowerCase().includes(moneyFilter.toLowerCase()))
        );

        if (globalFilter) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                (item.note && item.note.toLowerCase().includes(globalFilter.toLowerCase()))
            );
        }
        return filtered;
    };

    // View handler
    const handleViewClick = (type, name) => {
        alert(`🔍 View ${type}: ${name} (demo - would navigate to detail page)`);
    };

    // Clear global search
    const handleClearGlobal = () => {
        setGlobalFilter('');
        if (globalSearchRef.current) {
            globalSearchRef.current.value = '';
        }
    };

    // Handle input changes
    const handleTodoSearchChange = (e) => {
        setTodoFilter(e.target.value);
    };

    const handleProjectSearchChange = (e) => {
        setProjectFilter(e.target.value);
    };

    const handleMoneySearchChange = (e) => {
        setMoneyFilter(e.target.value);
    };

    const handleGlobalSearchChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    // Get paginated items
    const getPaginatedItems = (items, page) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return items.slice(start, end);
    };

    // Filtered data
    const filteredTodos = filterTodos();
    const filteredProjects = filterProjects();
    const filteredMoney = filterMoney();

    // Total pages
    const todoTotalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
    const projectTotalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const moneyTotalPages = Math.ceil(filteredMoney.length / ITEMS_PER_PAGE);

    // Reset page when filter changes
    useEffect(() => {
        const fetchUserInfo = async () =>{
            try {
                setLoading(true);
                const result = await getUserInfo();  // Changed from email to username
                if (result.success) {
                    setUserInfo(result.user)
                } else {
                    showNotification("Something went wrong. Try reloading the page")
                    // setError(result.error + ". Try again" || 'Đăng nhập thất bại');
                }
            } catch (error) {
                showNotification("Something went wrong. Try reloading the page");
            } finally {
                setLoading(false);
            }
        }
        fetchUserInfo();
    },[])
    useEffect(() => {
        setTodoPage(1);
    }, [todoFilter, globalFilter]);

    useEffect(() => {
        setProjectPage(1);
    }, [projectFilter, globalFilter]);

    useEffect(() => {
        setMoneyPage(1);
    }, [moneyFilter, globalFilter]);
    if(loading){
        return <Loading />    
    }

    return (
        <div className={cx('profile-dashboard')}>
            <div className='grid wide'>
                {/* User Profile Card */}
                <div className={cx('user-profile-card')}>
                    <div className={cx('user-row')}>
                        <div className={cx('user-name-section')}>
                            <h2>{userInfo?.fullName}</h2>
                            <Image className={cx("user-logo")} src={userInfo?.avatar} alt={"user-logo"} />
                            <div className={cx('user-badges')}>
                                <span className={cx('badge')}>
                                    <FontAwesomeIcon icon={faUser} /> {userInfo?.type}
                                </span>
                                <span className={cx('badge')}>
                                    <FontAwesomeIcon icon={faCircleCheck} /> {userInfo?.status}
                                </span>
                                <span className={cx('badge')}>
                                    <FontAwesomeIcon icon={faAt} /> {userInfo?.username}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('user-details-grid')}>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className={cx('label')}>Email</span>
                            <span className={cx('value')}>{userInfo?.email}</span>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span className={cx('label')}>Phone</span>
                            <span className={cx('value')}>{userInfo?.phoneNumber}</span>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faCakeCandles} />
                            <span className={cx('label')}>D.O.B.</span>
                            <span className={cx('value')}>{userInfo?.dateOfBirth}</span>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faVenusMars} />
                            <span className={cx('label')}>Gender</span>
                            <span className={cx('value')}>{userInfo?.gender}</span>
                        </div>
                        <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <span className={cx('label')}>Joined</span>
                            <span className={cx('value')}>{new Date(userInfo?.createdAt.split("T")[0]).toLocaleDateString()}</span>
                        </div>
                        {/* <div className={cx('detail-item')}>
                            <FontAwesomeIcon icon={faClock} />
                            <span className={cx('label')}>Last update</span>
                            <span className={cx('value')}>2025-01-10</span>
                        </div> */}
                    </div>

                    <div className={cx('stats-mini')}>
                        <div className={cx('mini-stat')}>
                            <div className={cx('number')}>{todoLists.length}</div>
                            <div className={cx('label')}>to‑do lists</div>
                        </div>
                        <div className={cx('mini-stat')}>
                            <div className={cx('number')}>{projects.length}</div>
                            <div className={cx('label')}>projects</div>
                        </div>
                        <div className={cx('mini-stat')}>
                            <div className={cx('number')}>{moneyAccounts.length}</div>
                            <div className={cx('label')}>money</div>
                        </div>
                    </div>
                </div>

                {/* Global Search */}
                <div className={cx('global-search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        ref={globalSearchRef}
                        type="text"
                        placeholder="Search to-do lists, projects, or accounts..."
                        onChange={handleGlobalSearchChange}
                    />
                    <Button 
                        rounded
                        primaryHover
                        // className={cx('search-clear')} 
                        onClick={handleClearGlobal}
                        leftIcon={<FontAwesomeIcon icon={faXmark} />}
                        small
                    >
                        clear
                    </Button>
                </div>

                {/* Todo Lists Section */}
                <div className={cx('category-section')}>
                    <div className={cx('category-header')}>
                        <FontAwesomeIcon icon={faListCheck} />
                        <h2>To-do lists</h2>
                        <span>{filteredTodos.length} total</span>
                    </div>
                    <div className={cx('category-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            ref={todoSearchRef}
                            type="text"
                            placeholder="Filter to-do lists..."
                            onChange={handleTodoSearchChange}
                        />
                    </div>

                    <div className={cx('cards-grid')}>
                        {filteredTodos.length === 0 ? (
                            <div className={cx('no-results')}>
                                <FontAwesomeIcon icon={faFaceFrown} /> No to-do lists match your search
                            </div>
                        ) : (
                            getPaginatedItems(filteredTodos, todoPage).map((item, index) => (
                                <div key={index} className={cx('simple-card')}>
                                    <div className={cx('card-title')}>
                                        {item.name}
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <div className={cx('card-info')}>
                                        <FontAwesomeIcon icon={faTasks} /> {item.items} items
                                    </div>
                                    <div className={cx('card-info')}>
                                        <FontAwesomeIcon icon={faCalendar} /> {item.due}
                                    </div>
                                    <div
                                        className={cx('view-link')}
                                        onClick={() => handleViewClick('to-do list', item.name)}
                                    >
                                        <FontAwesomeIcon icon={faEye} /> view list
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Pagination totalPages={todoTotalPages} currentPage={todoPage} setPage={setTodoPage} />
                </div>

                {/* Projects Section */}
                <div className={cx('category-section')}>
                    <div className={cx('category-header')}>
                        <FontAwesomeIcon icon={faDiagramProject} />
                        <h2>Projects</h2>
                        <span>{filteredProjects.length} total</span>
                    </div>
                    <div className={cx('category-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            ref={projectSearchRef}
                            type="text"
                            placeholder="Filter projects..."
                            onChange={handleProjectSearchChange}
                        />
                    </div>

                    <div className={cx('cards-grid')}>
                        {filteredProjects.length === 0 ? (
                            <div className={cx('no-results')}>
                                <FontAwesomeIcon icon={faFaceFrown} /> No projects match your search
                            </div>
                        ) : (
                            getPaginatedItems(filteredProjects, projectPage).map((item, index) => (
                                <div key={index} className={cx('simple-card')}>
                                    <div className={cx('card-title')}>
                                        {item.name}
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <div className={cx('card-info')}>
                                        <FontAwesomeIcon icon={faChartLine} /> {item.progress}%
                                    </div>
                                    <div className={cx('card-info')}>
                                        <FontAwesomeIcon icon={faCalendar} /> {item.due}
                                    </div>
                                    <div className={cx('card-info')}>
                                        <FontAwesomeIcon icon={faTasks} /> {item.tasks || item.budget || item.phase || ''}
                                    </div>
                                    <div
                                        className={cx('view-link')}
                                        onClick={() => handleViewClick('project', item.name)}
                                    >
                                        <FontAwesomeIcon icon={faEye} /> view project
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* {renderPagination('project', projectTotalPages, projectPage, setProjectPage)} */}
                    <Pagination totalPages={projectTotalPages} currentPage={projectPage} setPage={setProjectPage} />
                </div>

                {/* Money Section */}
                <div className={cx('category-section')}>
                    <div className={cx('category-header')}>
                        <FontAwesomeIcon icon={faCoins} />
                        <h2>Money</h2>
                        <span>{filteredMoney.length} accounts</span>
                    </div>
                    <div className={cx('category-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            ref={moneySearchRef}
                            type="text"
                            placeholder="Filter accounts..."
                            onChange={handleMoneySearchChange}
                        />
                    </div>

                    <div className={cx('cards-grid')}>
                        {filteredMoney.length === 0 ? (
                            <div className={cx('no-results')}>
                                <FontAwesomeIcon icon={faFaceFrown} /> No accounts match your search
                            </div>
                        ) : (
                            getPaginatedItems(filteredMoney, moneyPage).map((item, index) => (
                                <div key={index} className={cx('simple-card')}>
                                    <div className={cx('card-title')}>
                                        {item.name}
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <div className={cx('card-info')}>
                                        <FontAwesomeIcon icon={faScaleBalanced} /> {item.balance}
                                    </div>
                                    {item.income && (
                                        <div className={cx('card-info')}>
                                            <span className={cx('money-positive')}>↑ {item.income}</span>
                                            <span className={cx('money-negative')}>↓ {item.expense}</span>
                                        </div>
                                    )}
                                    {item.note && (
                                        <div className={cx('card-info')}>
                                            <FontAwesomeIcon icon={faNoteSticky} /> {item.note}
                                        </div>
                                    )}
                                    {item.change && (
                                        <div className={cx('card-info')}>
                                            <FontAwesomeIcon icon={faChartLine} /> {item.change}
                                        </div>
                                    )}
                                    <div
                                        className={cx('view-link')}
                                        onClick={() => handleViewClick('account', item.name)}
                                    >
                                        <FontAwesomeIcon icon={faEye} /> view account
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Pagination totalPages={moneyTotalPages} currentPage={moneyPage} setPage={setMoneyPage} />
                </div>
            </div>
        </div>
    );
}

export default Profile;