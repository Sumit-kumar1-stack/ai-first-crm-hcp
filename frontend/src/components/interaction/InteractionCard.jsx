import "./InteractionCard.css";

import { UserRound, Building2, Pill } from "lucide-react";

export default function InteractionCard({ form }) {

    return (

        <div className="interaction-info-card">

            <div className="interaction-header">

                <h3>Extracted Information</h3>

            </div>

            <div className="interaction-row">

                <UserRound size={18} />

                <div>

                    <small>Doctor</small>

                    <p>{form.doctor || "Not detected"}</p>

                </div>

            </div>

            <div className="interaction-row">

                <Building2 size={18} />

                <div>

                    <small>Hospital</small>

                    <p>{form.hospital || "Not detected"}</p>

                </div>

            </div>

            <div className="interaction-row">

                <Pill size={18} />

                <div>

                    <small>Product</small>

                    <p>{form.product || "Not detected"}</p>

                </div>

            </div>

        </div>

    );

}