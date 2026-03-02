import classNames from 'classnames/bind';
import styles from './GroupChat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments,
faPaperPlane  } from '@fortawesome/free-solid-svg-icons';
import { formatDateTime } from '~/utils';

const cx = classNames.bind(styles);

function GroupChat({chatInput, setChatInput, projectData, sendMessage, currentUser, chatMessages}) {
    const renderChatMessages = () => {
      return chatMessages.map(message => {
        const user = projectData.members.find(m => m.id === message.userId);
        if (!user) return null;
        
        const isOwn = message.userId === currentUser.id;
        
        return (
          <div key={message.id} className={cx('message', { own: isOwn })}>
            <div className={cx('message-header')}>
              <div className={cx('message-sender')}>{user.name}</div>
              <div className={cx('message-time')}>{formatDateTime(message.time)}</div>
            </div>
            <div className={cx('message-content')}>{message.text}</div>
          </div>
        );
      });
    };
    return <div className={cx('chat-container')}>
                <div className={cx('chat-header')}>
                  <h2><FontAwesomeIcon icon={faComments} /> Group Chat</h2>
                  <div className={cx('chat-info')}>
                    <span id="onlineCount">{projectData.members.filter(m => m.online).length}</span> thành viên online
                  </div>
                </div>
                <div className={cx('chat-messages')} id="chatMessages">
                  {renderChatMessages()}
                </div>
                <div className={cx('chat-input')}>
                  <textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Nhập tin nhắn..." 
                    rows="1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button className={cx('action-btn', 'btn-primary')} onClick={sendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </div>;
}

export default GroupChat;