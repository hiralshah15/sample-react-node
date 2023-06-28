import React from "react";
import { Spin } from "antd";
import ChatListItem from "./ChatListItem";
import PropTypes from "prop-types";

const RecentChatList = ({ loading, sessions, onClick, activeSessionId }) => {
    return (
        <Spin tip="Loading..." spinning={loading}>
            <ul className="session-list">
                {sessions.map((session) => {
                    return (
                        <li
                            id={session.id}
                            key={session.id}
                            onClick={() => onClick(session)}
                            className={
                                session.id === activeSessionId
                                    ? "active list-item"
                                    : "list-item"
                            }
                        >
                            <ChatListItem
                                session={session}
                                channel={session.channel}
                            />
                        </li>
                    );
                })}
                {!sessions.length && (
                    <li className="no-sessions"> No current Sessions</li>
                )}
            </ul>
        </Spin>
    );
};

export default RecentChatList;
RecentChatList.propTypes = {
    onClick: PropTypes.func,
};
