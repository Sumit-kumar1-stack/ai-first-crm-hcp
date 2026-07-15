import "./InteractionHeader.css";

import { Sparkles } from "lucide-react";

export default function InteractionHeader(){

    return(

        <header className="interaction-header">

            <div>

                <h1>

                    Log Interaction

                </h1>

                <p>

                    Capture HCP interactions using AI conversation or structured form.

                </p>

            </div>

            <div className="ai-badge">

                <Sparkles size={18}/>

                AI Assisted

            </div>

        </header>

    );

}