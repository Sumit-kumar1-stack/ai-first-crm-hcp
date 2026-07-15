import "./InteractionForm.css";

import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    updateField,

} from "../../redux/interactionFormSlice";

import ConfidenceBadge from "../assistant/ConfidenceBadge";

import ApproveRejectButtons from "../assistant/ApproveRejectButtons";

import SaveInteractionButton from "../assistant/SaveInteractionButton";

export default function InteractionForm() {

    const dispatch = useDispatch();

    const form = useSelector(

        (state) => state.interactionForm

    );

    const confidence = useSelector(

        (state) => state.interaction.confidence

    );

    const changeField = (

        field,

        value

    ) => {

        dispatch(

            updateField({

                field,

                value,

            })

        );

    };

    return (

        <div className="interaction-card">

            <div className="card-header">

                <h3>

                    Interaction Details

                </h3>

                <div className="ai-status">

                    <span>

                        ✓ AI Extracted

                    </span>

                    <ConfidenceBadge

                        confidence={confidence}

                    />

                </div>

            </div>

            <div className="form-grid">

                <div className="field">

                    <label>

                        Doctor

                    </label>

                    <input

                        value={form.doctor}

                        placeholder="Doctor"

                        onChange={(e)=>

                            changeField(

                                "doctor",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="field">

                    <label>

                        Hospital

                    </label>

                    <input

                        value={form.hospital}

                        placeholder="Hospital"

                        onChange={(e)=>

                            changeField(

                                "hospital",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="field">

                    <label>

                        Product

                    </label>

                    <input

                        value={form.product}

                        placeholder="Product"

                        onChange={(e)=>

                            changeField(

                                "product",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="field">

                    <label>

                        Interaction Type

                    </label>

                    <input

                        value={form.interaction_type}

                        placeholder="Visit"

                        onChange={(e)=>

                            changeField(

                                "interaction_type",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="field">

                    <label>

                        Follow-up

                    </label>

                    <input

                        value={form.follow_up}

                        placeholder="Next Tuesday"

                        onChange={(e)=>

                            changeField(

                                "follow_up",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="field">

                    <label>

                        Sentiment

                    </label>

                    <input

                        value={form.sentiment}

                        placeholder="Positive"

                        onChange={(e)=>

                            changeField(

                                "sentiment",

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

            <div className="field notes-field">

                <label>

                    Notes

                </label>

                <textarea

                    rows={6}

                    value={form.notes}

                    placeholder="AI extracted notes..."

                    onChange={(e)=>

                        changeField(

                            "notes",

                            e.target.value

                        )

                    }

                />

            </div>

            <div className="review-section">

                <ApproveRejectButtons />

            </div>

            <SaveInteractionButton />

        </div>

    );

}