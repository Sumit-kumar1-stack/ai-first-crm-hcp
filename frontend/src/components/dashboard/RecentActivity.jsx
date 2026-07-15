import "./RecentActivity.css";

import { useSelector } from "react-redux";

import {
    FiClock,
    FiCheckCircle,
    FiEdit3,
    FiUser,
} from "react-icons/fi";

export default function RecentActivity() {

    const {

        recentActivity,

        loading,

    } = useSelector(

        state => state.dashboard

    );

    if (loading) {

        return (

            <div className="activity-card">

                <h2>

                    Recent Activity

                </h2>

                {

                    [1,2,3,4].map(item=>(

                        <div
                            className="activity-skeleton"
                            key={item}
                        />

                    ))

                }

            </div>

        );

    }

    return (

        <div className="activity-card">

            <div className="activity-header">

                <h2>

                    Recent Activity

                </h2>

                <FiClock/>

            </div>

            {

                recentActivity.length===0 && (

                    <div className="empty-activity">

                        No recent activity found.

                    </div>

                )

            }

            {

                recentActivity.map(

                    (activity,index)=>(

                        <div

                            className="activity-item"

                            key={index}

                        >

                            <div className="timeline">

                                <div className="timeline-dot">

                                    <FiCheckCircle/>

                                </div>

                                {

                                    index!==recentActivity.length-1 &&

                                    <div className="timeline-line"/>

                                }

                            </div>

                            <div className="activity-content">

                                <div className="activity-top">

                                    <div className="avatar">

                                        <FiUser/>

                                    </div>

                                    <div>

                                        <h4>

                                            {activity.doctor}

                                        </h4>

                                        <span>

                                            {activity.action}

                                        </span>

                                    </div>

                                </div>

                                <div className="activity-footer">

                                    <small>

                                        {activity.time}

                                    </small>

                                    <button>

                                        <FiEdit3/>

                                        View

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                )

            }

        </div>

    );

}