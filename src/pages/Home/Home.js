// import classNames from 'classnames';

// import styles from './Home.module.scss';
// const cx = classNames.bind(styles);
// function Home() {
//     return (
//         <div className={cx('wrapper')}>
//             <div className="grid wide"></div>
//         </div>
//     );
// }

// export default Home;
import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInfoCircle,
    faCogs,
    faUsers,
    faTasks,
    faArrowLeft,
    faListCheck,
    faDiagramProject,
    faTimes,
    faPlusCircle,
    faGripVertical,
    faUserPlus,
    faPlus,
    faCalendarAlt,
    faClock,
    faEdit,
    faTrash,
    faXmark,
    faHandHoldingDollar
} from '@fortawesome/free-solid-svg-icons';
 // adjust import path as needed
import styles from './Home.module.scss';
import { useAuth } from '~/context/AuthContext';
import { Link } from 'react-router-dom';
import { KeyRouteFullPath } from '~/utils';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import Section from '../components/Section';

// bind classNames to styles object
const cx = classNames.bind(styles);

// Mock user data - in real app, this would come from your auth context
const mockUser = {
    firstName: 'Elena',
    lastName: 'Voss',
    initials: 'EV',
    activeProjects: 5,
    pendingTasks: 12,
    monthlyIncome: '€4,280',
    monthlyExpenses: '€2,150',
    completionRate: '78%',
    recentProjects: [
        { name: 'Mobile App', progress: 45 },
        { name: 'Campaign Q2', progress: 20 }
    ],
    nextDeadline: 'Friday (2 days)',
    teamMates: 4
};

function Home() {
    // Use the auth hook - isAuthenticated replaces isLoggedIn
    const { isAuthenticated, loading, user } = useAuth();


    // // Show loading state if needed
    // if (loading) {
    //     return (
    //         <div className={cx('home-expanded', 'loading-state')}>
    //             <div className={cx('loading-spinner')}>
    //                 <FontAwesomeIcon icon={faClock} spin />
    //                 <p>Loading your dashboard...</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className={cx('home-expanded')}>
            {/* WELCOME HEADER - always visible, changes based on authentication */}
            <div className={cx('welcome-header')}>
                {/* <h1>
                    <FontAwesomeIcon icon={faTasks} /> plan management
                </h1> */}
                {!isAuthenticated ? (
                    <div className={cx('user-summary-badge', 'guest-badge')}>
                        <FontAwesomeIcon icon={faUsers} style={{ color: '#1d4ed8' }} />
                        <span>join 8k+ users</span>
                    </div>
                ) : (
                    <div className={cx('user-summary-badge')}>
                        <div className={cx('user-avatar')}>{user.username.split(" ").map((e) => e.charAt(0)).join("").toUpperCase()}</div>
                        <span>
                            {user.username} · <FontAwesomeIcon icon={faCogs} />{' '}
                            {mockUser.activeProjects} active
                        </span>
                    </div>
                )}
            </div>

            {/* HERO SECTION - changes completely based on auth state */}
            {!isAuthenticated ? (
                // LOGGED OUT HERO
                <div className={cx('hero-welcome')}>
                    <div className={cx('hero-welcome-content')}>
                        <div className={cx('hero-text-large')}>
                            <h2>
                                Your projects, tasks & money —<br /> beautifully unified.
                            </h2>
                            <div className={cx('under-hero')}>
                                One workspace to replace scattered tools. Get started in 2 minutes, free.
                            </div>
                            <div className={cx('hero-stats-row')}>
                                <span className={cx('hero-stat-item')}>
                                    <FontAwesomeIcon icon={faUsers} /> 8,200+ creators
                                </span>
                                <span className={cx('hero-stat-item')}>
                                    <FontAwesomeIcon icon={faInfoCircle} /> 4.9 rating
                                </span>
                                <span className={cx('hero-stat-item')}>
                                    <FontAwesomeIcon icon={faClock} /> avg. 30% time saved
                                </span>
                            </div>
                            <div className={cx('hero-cta-group')}>
                                {/* <button
                                    className={cx('btn-primary-round')}
                                    onClick={() => handleDemoClick('signup modal')}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} /> Create free account
                                </button> */}
                                <Link to={KeyRouteFullPath('signup')}>
                                    <Button
                                        primary
                                        rounded
                                        // className={cx('btn-primary-round')}
                                        leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                                    >
                                        Create free account
                                    </Button>
                                </Link>
                                <Button
                                    // className={cx('btn-ghost-round')}
                                    rounded
                                    normalHover
                                    leftIcon={<FontAwesomeIcon icon={faInfoCircle} />}
                                >
                                    Take a tour
                                </Button>
                            </div>
                        </div>
                        <div className={cx('hero-graphic')}>
                            {/* <FontAwesomeIcon icon={faDiagramProject} /> */}
                            <Image src={images.myLogo} alt={'my logo'} />
                            
                        </div>
                    </div>
                </div>
            ) : (
                // LOGGED IN HERO - personalized
                <div className={cx('hero-welcome')}>
                    <div className={cx('hero-welcome-content')}>
                        <div className={cx('hero-text-large')}>
                            <h2>
                                Welcome back, {user.username}! 👋
                            </h2>
                            <div className={cx('under-hero')}>
                                You have <strong>{mockUser.pendingTasks} tasks</strong> across{' '}
                                {mockUser.activeProjects} projects. Next deadline: {mockUser.nextDeadline}.
                            </div>
                            <div className={cx('hero-stats-row')}>
                                <span className={cx('hero-stat-item')}>
                                    <FontAwesomeIcon icon={faHandHoldingDollar} /> in: {mockUser.monthlyIncome}
                                </span>
                                <span className={cx('hero-stat-item')}>
                                    <FontAwesomeIcon icon={faArrowLeft} /> out: {mockUser.monthlyExpenses}
                                </span>
                                <span className={cx('hero-stat-item')}>
                                    <FontAwesomeIcon icon={faListCheck} /> done: {mockUser.completionRate}
                                </span>
                            </div>
                            <div className={cx('hero-cta-group')}>
                                {/* <button
                                    className={cx('btn-primary-round')}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} /> Continue last session
                                </button> */}

                                <Button
                                    primary
                                    rounded
                                    leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                                >
                                    Continue last session
                                </Button>
                                <Button
                                    rounded
                                    normalHover
                                    leftIcon={<FontAwesomeIcon icon={faTasks} />}
                                >
                                     Full dashboard
                                </Button>
                            </div>
                        </div>
                        <div className={cx('hero-graphic')}>
                            <FontAwesomeIcon icon={faDiagramProject} />
                            <span>projects: {mockUser.activeProjects} active</span>
                        </div>
                    </div>
                </div>
            )}

            {/* FEATURE DEEP DIVE - core tools section */}
            <div className={cx('feature-deep-dive')}>
                <div className={cx('section-title')}>Everything you need, inside one hub</div>
                <div className={cx('section-subhead')}>
                    Three powerful modules that talk to each other — no more switching between apps.
                </div>

                <div className={cx('tools-grid-large')}>
                    <Section
                        hover
                        header={
                            <div className={cx("tool-detailed-header")}>
                                <FontAwesomeIcon icon={faListCheck} />
                                <h3>To‑do</h3>
                            </div>
                        }
                    >
                        <div className={cx("tool-detailed-content")}>
                            {!isAuthenticated ? (
                            <div className={cx('tool-desc')}>
                                From daily tasks to complex checklists. Prioritize, schedule, and collaborate.
                            </div>
                                ) : (
                                    <div className={cx('tool-desc')}>
                                        You have {mockUser.pendingTasks} pending tasks. 3 due this week.
                                    </div>
                                )}

                                {!isAuthenticated ? (
                                    <div className={cx('tool-highlight-stats')}>
                                        <div>
                                            <FontAwesomeIcon icon={faTasks} /> 12 task views
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faInfoCircle} /> 92% completion rate among users
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('tool-highlight-stats')}>
                                        <div>
                                            <FontAwesomeIcon icon={faClock} /> next: review design draft (tomorrow)
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faListCheck} /> 5 completed this week
                                        </div>
                                    </div>
                                )}

                                {!isAuthenticated ? (
                                    <ul className={cx('tool-feature-bullets')}>
                                        <li>
                                            <FontAwesomeIcon icon={faListCheck} /> Recurring tasks & reminders
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faListCheck} /> Subtasks & checklists
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faListCheck} /> File attachments & comments
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className={cx('tool-feature-bullets')}>
                                        <li>
                                            <FontAwesomeIcon icon={faListCheck} /> team meeting · 14:00
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faListCheck} /> invoice follow‑up
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faListCheck} /> update project brief
                                        </li>
                                    </ul>
                                )}
                                <div
                                    className={cx('tool-link')}
                                >
                                    {!isAuthenticated ? 'Explore to‑do' : 'Go to to-do'} <FontAwesomeIcon icon={faArrowLeft} />
                                </div>
                        </div>

                    </Section>
                    <Section
                        hover
                        header={
                            <div className={cx("tool-detailed-header")}>
                                <FontAwesomeIcon icon={faHandHoldingDollar} />
                                <h3>Money</h3>
                            </div>
                        }
                    >
                        <div className={cx("tool-detailed-content")}>
                            {!isAuthenticated ? (
                            <div className={cx('tool-desc')}>
                                Track project budgets, personal expenses, invoices — all in one ledger.
                            </div>
                        ) : (
                            <div className={cx('tool-desc')}>
                                Income this month: {mockUser.monthlyIncome} · expenses: {mockUser.monthlyExpenses}
                            </div>
                        )}

                        {!isAuthenticated ? (
                            <div className={cx('tool-highlight-stats')}>
                                <div>
                                    <FontAwesomeIcon icon={faHandHoldingDollar} /> avg. monthly saving: €340
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faInfoCircle} /> 150+ integrations
                                </div>
                            </div>
                        ) : (
                            <div className={cx('tool-highlight-stats')}>
                                <div>
                                    <FontAwesomeIcon icon={faInfoCircle} /> 2 unpaid invoices (€1,240)
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faTasks} /> project budgets left: €890
                                </div>
                            </div>
                        )}

                        {!isAuthenticated ? (
                            <ul className={cx('tool-feature-bullets')}>
                                <li>
                                    <FontAwesomeIcon icon={faListCheck} /> Income/expense per project
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faListCheck} /> Billable hours & invoices
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faListCheck} /> Financial summaries
                                </li>
                            </ul>
                        ) : (
                            <ul className={cx('tool-feature-bullets')}>
                                <li>
                                    <FontAwesomeIcon icon={faListCheck} /> last transaction: Adobe license -€62
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faListCheck} /> Q2 budget forecast ready
                                </li>
                            </ul>
                        )}
                        <div
                            className={cx('tool-link')}
                        >
                            {!isAuthenticated ? 'Manage money' : 'Money details'}{' '}
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                        </div>
                    </Section>

                    <Section
                        hover
                        header={
                            <div className={cx("tool-detailed-header")}>
                                <FontAwesomeIcon icon={faDiagramProject} />
                                <h3>Projects</h3>
                            </div>
                        }
                    >
                        <div className={cx("tool-detailed-content")}>
                            {!isAuthenticated ? (
                            <div className={cx('tool-desc')}>
                                Milestones, timelines, team workload — from kickoff to delivery.
                            </div>
                            ) : (
                                <div className={cx('tool-desc')}>
                                    Mobile app (45%) · Campaign Q2 (20%) · Website (70%)
                                </div>
                            )}

                            {!isAuthenticated ? (
                                <div className={cx('tool-highlight-stats')}>
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarAlt} /> 3 timeline views
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faUsers} /> used by teams of 1–50
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('tool-highlight-stats')}>
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarAlt} /> next milestone: app prototype in 4d
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faUsers} /> {mockUser.teamMates} team members active
                                    </div>
                                </div>
                            )}

                            {!isAuthenticated ? (
                                <ul className={cx('tool-feature-bullets')}>
                                    <li>
                                        <FontAwesomeIcon icon={faListCheck} /> Gantt & board view
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faListCheck} /> Dependencies & milestones
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faListCheck} /> Progress reports
                                    </li>
                                </ul>
                            ) : (
                                <ul className={cx('tool-feature-bullets')}>
                                    <li>
                                        <FontAwesomeIcon icon={faListCheck} /> 3 tasks waiting for review
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faListCheck} /> files updated 2h ago
                                    </li>
                                </ul>
                            )}
                            <div
                                className={cx('tool-link')}
                            >
                                {!isAuthenticated ? 'View projects' : 'All projects'}{' '}
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>
                        </div>
                    </Section>
                </div>
            </div>

            {/* EXTRA CONTENT - two columns */}
            <div className={cx('extra-home-content')}>
                {!isAuthenticated ? (
                    // logged out extra content
                    <>
                        <Section
                            header={
                            <div className={cx("extra-home-content-header")}>
                                <FontAwesomeIcon icon={faUsers} />
                                <h3>From the community</h3>
                            </div>
                        }
                        >
                            <>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>tip</span>
                                <span className={cx('update-text')}>
                                    How to link tasks to project budget
                                </span>
                                <span className={cx('update-time')}>2h ago</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>webinar</span>
                                <span className={cx('update-text')}>
                                    March 28: Advanced money tracking
                                </span>
                                <span className={cx('update-time')}>tomorrow</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>new</span>
                                <span className={cx('update-text')}>
                                    Custom project templates now live
                                </span>
                                <span className={cx('update-time')}>yesterday</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>case study</span>
                                <span className={cx('update-text')}>
                                    Freelancer doubled income using PlanPulse
                                </span>
                                <span className={cx('update-time')}>3d ago</span>
                            </div>
                            </>
                        </Section>
                        <div className={cx('tip-card')}>
                            <h4>
                                <FontAwesomeIcon icon={faInfoCircle} /> start smart
                            </h4>
                            <p>
                                “Combine your to‑do and project budgets to see exactly how much time
                                costs.”
                            </p>
                            <div className={cx('tip-stats')}>
                                <div>✅ 72% of users track money per project</div>
                                <div>✅ 3.5x faster reporting</div>
                            </div>
                            <p>Watch 2‑min demo →</p>
                        </div>
                    </>
                ) : (
                    // logged in extra content (personalized)
                    <>
                        <Section
                            header={
                                <div className={cx("extra-home-content-header")}>
                                    <FontAwesomeIcon icon={faClock} />
                                    <h3>Recent activity</h3>
                                </div>
                            }
                        >
                            <>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>task</span>
                                <span className={cx('update-text')}>
                                    You completed "wireframe review"
                                </span>
                                <span className={cx('update-time')}>45m ago</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>money</span>
                                <span className={cx('update-text')}>Invoice #122 paid – €380</span>
                                <span className={cx('update-time')}>3h ago</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>project</span>
                                <span className={cx('update-text')}>
                                    Alex commented on Mobile App
                                </span>
                                <span className={cx('update-time')}>5h ago</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>deadline</span>
                                <span className={cx('update-text')}>Campaign Q2 due in 2 days</span>
                                <span className={cx('update-time')}>tomorrow</span>
                            </div>
                            <div className={cx('update-item')}>
                                <span className={cx('update-badge')}>file</span>
                                <span className={cx('update-text')}>budget Q3 uploaded</span>
                                <span className={cx('update-time')}>yesterday</span>
                            </div>
                            </>
                        </Section>
                        <div className={cx('tip-card')}>
                            <h4>
                                <FontAwesomeIcon icon={faInfoCircle} /> tip for you
                            </h4>
                            <p>
                                Link your to‑do “invoice follow‑up” directly to the money module — one
                                click.
                            </p>
                            <div className={cx('tip-stats')}>
                                <div>✅ {mockUser.pendingTasks} tasks left</div>
                                <div>✅ 2 deadlines this week</div>
                            </div>
                            <p style={{ marginTop: '1rem' }}>
                                <FontAwesomeIcon icon={faCalendarAlt} /> {mockUser.nextDeadline} –
                                prepare project review
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* BOTTOM COMMUNITY PANEL */}
            {!isAuthenticated ? (
                <div className={cx('community-panel')}>
                    <div className={cx('community-text')}>
                        <h3>Join a growing community</h3>
                        <p>
                            8,200+ freelancers, studios and teams already simplified their workflow.
                        </p>
                    </div>
                    <Button
                        primary
                        rounded
                        leftIcon={<FontAwesomeIcon icon={faUsers} />}
                    >
                        Get started — free
                    </Button>
                </div>
            ) : (
                <div className={cx('community-panel')}>
                    <div className={cx('community-text')}>
                        <h3>You're part of a big community</h3>
                        <p>
                            {mockUser.firstName}, along with 8,200+ users — your completion rate is{' '}
                            {mockUser.completionRate}, above average!
                        </p>
                    </div>
                    <Button
                        primary
                        rounded
                        leftIcon={<FontAwesomeIcon icon={faUsers} />}
                    >
                        team hub →
                    </Button>
                </div>
            )}
                </div>
            </div>
        </div>
        
    );
}

export default Home;
