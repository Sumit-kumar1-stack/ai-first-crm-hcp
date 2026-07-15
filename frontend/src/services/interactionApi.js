import api from "./api";

export const extractInteraction = (
    conversation
) =>
    api.post(
        "/interaction/extract",
        {
            conversation,
        }
    );
