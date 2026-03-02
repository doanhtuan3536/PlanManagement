import classNames from 'classnames/bind';
import styles from './SidebarNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns,
faListCheck,
faTrophy,
faComments } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SidebarNav({activeView ,setActiveView}) {
    return <div className={cx('sidebar-nav')}>
                <div 
                  className={cx('nav-item', { active: activeView === 'sprint-board' })}
                  onClick={() => setActiveView('sprint-board')}
                >
                  <FontAwesomeIcon icon={faColumns} />
                  <span>Sprint Board</span>
                </div>
                <div 
                  className={cx('nav-item', { active: activeView === 'sprint-backlog' })}
                  onClick={() => setActiveView('sprint-backlog')}
                >
                  <FontAwesomeIcon icon={faListCheck} />
                  <span>Backlog</span>
                </div>
                <div 
                  className={cx('nav-item', { active: activeView === 'leaderboard' })}
                  onClick={() => setActiveView('leaderboard')}
                >
                  <FontAwesomeIcon icon={faTrophy} />
                  <span>Leaderboard</span>
                </div>
                <div 
                  className={cx('nav-item', { active: activeView === 'group-chat' })}
                  onClick={() => setActiveView('group-chat')}
                >
                  <FontAwesomeIcon icon={faComments} />
                  <span>Group Chat</span>
                </div>
              </div>;
}

export default SidebarNav;