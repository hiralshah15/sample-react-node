import React from "react";
import Logoimage from "../../images/admin-logo.png";

import { NavLink } from "react-router-dom";
import ProfileImage from "../Counselor/ProfileImage";
import find from "lodash/find";

import { connect } from "react-redux";

export class AsideUnconnected extends React.Component {
    render() {
        const { sessions } = this.props;
        const { student } = sessions;
        let dotClassName = "";

        if (sessions.channel?.lastMessage) {
            const readStatus = sessions.channel.getReadStatus(true);
            const selfReadStatus = find(
                readStatus,
                (_, id) => id !== student.id
            );
            if (
                selfReadStatus.last_seen_at <
                sessions.channel.lastMessage.createdAt
            ) {
                dotClassName = "new-message";
            }
        }
        return (
            <section className="left-sidebar">
                <div className="user-panel">
                    <div className="admin-logo">
                        <img src={Logoimage} alt="admin-logo" />
                    </div>
                </div>
                <ul className="sidebar-menu" data-widget="tree">
                    <li>
                        <NavLink to="/" exact={true} activeClassName="active">
                            <i className="icon-Dashboard" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sessions" activeClassName="active">
                            <i className="icon-notification fs-14">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span
                                    className={`path4 ${dotClassName}`}
                                ></span>
                            </i>
                            <span className="schedule">Sessions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/schedule" activeClassName="active">
                            <i className="icon-Schedule" />
                            <span className="schedule">Schedule</span>
                        </NavLink>
                    </li>
                </ul>
                <div className="user-pro-left">
                    <NavLink to="/account" activeClassName="active">
                        <ProfileImage />
                        <span> Account</span>
                    </NavLink>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        authentication: { user },
    } = state;
    const { sessions } = state.session;
    return { user, sessions };
};
export default connect(mapStateToProps)(AsideUnconnected);
