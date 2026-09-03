import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEntities } from "../../redux/interactionFormSlice";

export default function FormStatusBridge() {
  const dispatch = useDispatch();

  const messages = useSelector(
    (state) => state.interaction.messages
  );

  const lastProcessedRef = useRef(null);

  useEffect(() => {
    const latest = messages
      .filter((m) => m.type === "assistant" && m.data)
      .at(-1);

    if (!latest || !latest.data) return;
    if (lastProcessedRef.current === latest) return;
    lastProcessedRef.current = latest;

    dispatch(
      setEntities({
        doctor:
          latest.data.doctor_name || "",

        hospital:
          latest.data.hospital || "",

        specialty:
          latest.data.specialization || "",

        product:
          Array.isArray(latest.data.products)
            ? latest.data.products.join(", ")
            : latest.data.products ||
              latest.data.product ||
              "",

        notes:
          latest.data.discussion ||
          latest.data.summary ||
          "",

        follow_up:
          latest.data.follow_up || "",
      })
    );
  }, [messages, dispatch]);

  return null;
}