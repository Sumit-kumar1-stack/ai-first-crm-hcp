import "./AIInsightsPanel.css";

import { useSelector } from "react-redux";

import {

    FileText,

} from "lucide-react";

export default function AISummaryCard() {

    const {

        summary,

    } = useSelector(

        state => state.interaction

    );

    return (

        <div className="insight-card">

            <div className="card-title">

                <FileText size={18}/>

                AI Summary

            </div>

            <p>

                {

                    summary ||

                    "Conversation summary will appear here."

                }

            </p>

        </div>

    );

}