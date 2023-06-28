import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./style.scss";
import "./iconmoon.scss";
import "./variables.scss";
import { connect } from "react-redux";
import { CounselorRoute } from "../../components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { VerificationPage } from "../VerificationPage";
import { ProfilePage } from "../ProfilePage";
import { TourPage } from "../TourPage";
import { SessionsPage } from "../SessionsPage";
import { SchedulePage } from "../SchedulePage";
import { AccountPage } from "../AccountPage";
import { SignupPage } from "../SignupPage";
import { ForgotPasswordPage } from "../ForgotPasswordPage";
import { SetPasswordPage } from "../SetPasswordPage";
import { CounselorsPage } from "../Admin/CounselorsPage";
import { AdminSchedulePage } from "../Admin/AdminSchedulePage";
import { AdminSchoolsPage } from "../Admin/AdminSchoolsPage";
import "./media.scss";
import { alertActions, userActions } from "../../actions";
import { configureFakeBackend, history } from "../../helpers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConnectedRouter } from "connected-react-router";
import { userConstants } from "../../constants";
import LoadingPage from "../../components/LoadingPage";
import "../styles/index.scss";
import AlertModal from "../../components/Modals/AlertModal";

configureFakeBackend();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: null,
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
        this.props.dispatch(userActions.restoreSession());
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            alert: { message: prevMessage, type: prevType, id: prevId },
        } = prevProps;
        const {
            alert: { message, id, type, options: modalOptions },
        } = this.props;
        const titleName = history.location.pathname.slice(1);
        document.title = titleName
            ? titleName.charAt(0).toUpperCase() +
              titleName.slice(1) +
              " | Counslr"
            : "Home | Counslr";
        if (message && id !== prevId) {
            if (modalOptions?.modal && !this.state.modal) {
                this.setState({
                    modal: message,
                    modalOptions: {
                        buttonText: modalOptions.buttonText || "Got it",
                        title: modalOptions.title,
                        buttonType: modalOptions.buttonType,
                        alertType: modalOptions.alertType,
                    },
                });
            } else {
                toast(message, {
                    type: type,
                    hideProgressBar: true,
                    autoClose: 4000,
                });
            }
        }
    }

    verificationAccessCheck = () => {
        const { registerState } = this.props;
        if (registerState === userConstants.REGISTER_STATE.CHANGE_PASSWORD) {
            return true;
        }
        if (registerState === userConstants.REGISTER_STATE.ONBOARDING) {
            return true;
        }
    };

    routesForCounselor() {
        const { user } = this.props;

        return [
            <CounselorRoute
                requiresOnboarding={false}
                user={user}
                path="/profile"
                component={ProfilePage}
            />,
            <CounselorRoute
                requiresOnboarding={false}
                user={user}
                path="/tour"
                component={TourPage}
            />,
            <CounselorRoute
                user={user}
                path="/sessions"
                component={SessionsPage}
            />,
            <CounselorRoute
                user={user}
                path="/schedule"
                component={SchedulePage}
            />,
            <CounselorRoute
                user={user}
                path="/account"
                component={AccountPage}
            />,
            <CounselorRoute
                user={user}
                path="/home"
                component={HomePage}
                exact={true}
            />,
            <CounselorRoute
                user={user}
                path="/"
                component={HomePage}
                exact={true}
            />,
        ];
    }
    routesForAdmin() {
        return [
            <Route path="/" component={CounselorsPage} exact={true} />,
            <Route path="/schedule" component={AdminSchedulePage} />,
            <Route path="/schools" component={AdminSchoolsPage} />,
            <Route path="/profile" render={() => <Redirect to="/" />} />,
        ];
    }

    onCloseAlertModal = () => {
        this.setState({
            modal: null,
        });
    };
    render() {
        const { user, userType, isLoggedIn, loading } = this.props;
        const { modal, modalOptions } = this.state;

        const classNames = ["App"];

        // Apply class name for custom view styles
        if (!!userType) {
            classNames.push(userType + "-view");
        }

        const className = classNames.join(" ");

        if (loading) {
            return (
                <div className={"App"}>
                    <LoadingPage />
                </div>
            );
        }

        return (
            <div className={className}>
                <ToastContainer autoClose={8000} />
                {modal && (
                    <AlertModal
                        text={modal}
                        className={"modal-text text-left"}
                        wrapClassName={"root-modal"}
                        onClick={this.onCloseAlertModal}
                        {...modalOptions}
                    />
                )}
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route
                            path="/forgot-password"
                            component={ForgotPasswordPage}
                        />
                        <Route
                            path="/set-password"
                            component={SetPasswordPage}
                        />
                        <CounselorRoute
                            checker={this.verificationAccessCheck}
                            user={user}
                            path="/verification"
                            component={VerificationPage}
                        />
                        <CounselorRoute
                            user={user}
                            path="/sign-up"
                            checker={() => true}
                            requiresOnboarding={false}
                            component={SignupPage}
                        />
                        {isLoggedIn &&
                            (user.isAdmin
                                ? this.routesForAdmin()
                                : this.routesForCounselor())}
                    </Switch>
                </ConnectedRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        alert,
        authentication: { user, loading },
        registration: { registerState },
    } = state;

    const isLoggedIn = !!user && !!user.id;

    const userTypeId = !!user && user.userTypeId;

    var userType = null;

    switch (userTypeId) {
        case 1: {
            userType = "student";

            break;
        }

        case 2: {
            userType = "counselor";

            break;
        }

        case 3: {
            userType = "admin";

            break;
        }
    }

    return {
        loading,
        registerState,
        user,
        alert,
        isLoggedIn,
        userType,
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
