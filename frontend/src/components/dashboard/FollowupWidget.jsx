import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";

import "./FollowupWidget.css";

export default function FollowupWidget() {

    const { followups } = useSelector(
        state => state.dashboard
    );

    return (

        <div className="followup-widget">

            <div className="widget-header">

                <h3>Upcoming Follow-ups</h3>

                <FiCalendar />

            </div>

            {

                followups.length === 0 ?

                (

                    <div className="empty-widget">

                        <h4>No Follow-ups</h4>

                        <p>

                            New follow-ups will appear here.

                        </p>

                    </div>

                )

                :

                followups.slice(0,3).map((item,index)=>(

                    <div
                        key={index}
                        className="followup-item"
                    >

                        <div>

                            <h4>

                                {item.doctor}

                            </h4>

                            <span>

                                {item.follow_up}

                            </span>

                        </div>

                        <FiArrowRight/>

                    </div>

                ))

            }

        </div>

    );

}
