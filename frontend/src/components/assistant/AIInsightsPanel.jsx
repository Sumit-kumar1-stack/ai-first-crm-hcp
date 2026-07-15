import "./AIInsightsPanel.css";

import { useSelector } from "react-redux";

import ConfidenceBadge from "./ConfidenceBadge";

import AISummaryCard from "./AISummaryCard";

import AIRecommendationCard from "./AIRecommendationCard";

export default function AIInsightsPanel(){

    const{

        confidence,

        entities,

    }=useSelector(

        state=>state.interaction

    );

    return(

        <div className="ai-panel">

            <ConfidenceBadge

                confidence={confidence}

            />

            <AISummaryCard/>

            <div className="insight-card">

                <div className="card-title">

                    AI Extracted

                </div>

                <div className="entity">

                    <span>

                        Doctor

                    </span>

                    <strong>

                        {

                            entities.doctor ||

                            "-"

                        }

                    </strong>

                </div>

                <div className="entity">

                    <span>

                        Hospital

                    </span>

                    <strong>

                        {

                            entities.hospital ||

                            "-"

                        }

                    </strong>

                </div>

                <div className="entity">

                    <span>

                        Product

                    </span>

                    <strong>

                        {

                            entities.product ||

                            "-"

                        }

                    </strong>

                </div>

                <div className="entity">

                    <span>

                        Follow-up

                    </span>

                    <strong>

                        {

                            entities.follow_up ||

                            "-"

                        }

                    </strong>

                </div>

            </div>

            <AIRecommendationCard/>

        </div>

    );

}