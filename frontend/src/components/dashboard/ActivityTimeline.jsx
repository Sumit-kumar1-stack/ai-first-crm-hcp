import "./ActivityTimeline.css";

import {
    FiClock
} from "react-icons/fi";

export default function ActivityTimeline(){

    const activities=[

        "Met Dr. Sharma regarding CardioX",

        "Generated AI Summary",

        "Follow-up scheduled",

        "Updated Apollo interaction"

    ];

    return(

        <div className="timeline">

            <h3>

                Recent Activity

            </h3>

            {

                activities.map((item,index)=>(

                    <div
                        className="timeline-item"
                        key={index}
                    >

                        <FiClock/>

                        <span>

                            {item}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}