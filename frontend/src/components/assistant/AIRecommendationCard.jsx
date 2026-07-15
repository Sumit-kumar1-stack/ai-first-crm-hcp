import "./AIInsightsPanel.css";

import { useSelector } from "react-redux";

import {

    Lightbulb,

} from "lucide-react";

export default function AIRecommendationCard(){

    const {

        recommendations,

    } = useSelector(

        state=>state.interaction

    );

    if(!recommendations){

        return null;

    }

    return(

        <div className="insight-card">

            <div className="card-title">

                <Lightbulb size={18}/>

                AI Recommendation

            </div>

            <div className="recommendation-row">

                <span>

                    Next Action

                </span>

                <strong>

                    {

                        recommendations.next_action

                    }

                </strong>

            </div>

            <div className="recommendation-row">

                <span>

                    Priority

                </span>

                <strong>

                    {

                        recommendations.priority

                    }

                </strong>

            </div>

            <div className="recommendation-row">

                <span>

                    Date

                </span>

                <strong>

                    {

                        recommendations.recommended_date

                    }

                </strong>

            </div>

            <p>

                {

                    recommendations.reason

                }

            </p>

        </div>

    );

}