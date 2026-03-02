import classNames from 'classnames/bind';
import styles from './LeaderBoard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy  } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '~/utils';

const cx = classNames.bind(styles);

function LeaderBoard({projectData}) {
  const renderLeaderboard = () => {
    const sortedMembers = [...projectData.members].sort((a, b) => b.points - a.points);
    
    return sortedMembers.map((member, index) => (
      <div key={member.id} className={cx('leaderboard-item')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className={cx('rank')}>{index + 1}</div>
          <div className={cx('member-avatar')}>{member.initials}</div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{member.name}</div>
            <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-light)' }}>
              {member.role} • {member.online ? '🟢 Online' : '⚫ Offline'}
            </div>
          </div>
        </div>
        <div className={cx('points')}>{member.points} điểm</div>
      </div>
    ));
  };
  return <div className={cx('leaderboard')}>
            <h2><FontAwesomeIcon icon={faTrophy} /> Bảng xếp hạng thành viên</h2>
            <div id="leaderboardList">
              {renderLeaderboard()}
            </div>
          </div>;
}

export default LeaderBoard;