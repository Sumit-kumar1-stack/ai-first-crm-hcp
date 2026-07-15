from collections import Counter
from datetime import datetime, date
from sqlalchemy.orm import Session

from app.models.interaction import Interaction


class AnalyticsRepository:

    @staticmethod
    def get_dashboard_stats(db: Session):

        interactions = db.query(Interaction).all()

        # ===============================
        # Summary
        # ===============================

        total_interactions = len(interactions)

        total_doctors = len(
            {
                i.doctor_name
                for i in interactions
                if i.doctor_name
            }
        )

        pending_followups = sum(
            1
            for i in interactions
            if i.follow_up
        )

        today_meetings = 0
        for item in interactions:
            try:
                if datetime.strptime(item.meeting_date, "%Y-%m-%d").date() == date.today():
                    today_meetings += 1
            except (TypeError, ValueError):
                continue

        # ===============================
        # Product Distribution
        # ===============================

        product_counter = Counter()

        for item in interactions:

            if item.products:

                product_counter[item.products] += 1

        product_distribution = [

            {
                "product": product,
                "count": count,
            }

            for product, count in product_counter.items()

        ]

        top_product = (

            product_counter.most_common(1)[0][0]

            if product_counter

            else "-"

        )

        # ===============================
        # Hospital Distribution
        # ===============================

        hospital_counter = Counter()

        for item in interactions:

            if item.hospital:

                hospital_counter[item.hospital] += 1

        top_hospital = (

            hospital_counter.most_common(1)[0][0]

            if hospital_counter

            else "-"

        )

        # ===============================
        # Weekly Meetings
        # ===============================

        weekdays = [

            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",

        ]

        weekly_meetings = [

            {
                "day": day,
                "count": 0,
            }

            for day in weekdays

        ]

        for item in interactions:
            try:
                weekday = datetime.strptime(item.meeting_date, "%Y-%m-%d").strftime("%a")
            except (TypeError, ValueError):
                continue
            for meeting in weekly_meetings:
                if meeting["day"] == weekday:
                    meeting["count"] += 1
                    break

        # ===============================
        # Recent Activity
        # ===============================

        recent_activity = []

        latest = (

            db.query(Interaction)

            .order_by(Interaction.id.desc())

            .limit(5)

            .all()

        )

        for item in latest:

            recent_activity.append(

                {

                    "doctor": item.doctor_name,

                    "action": "Interaction Logged",

                    "time": f"ID #{item.id}",

                }

            )

        # ===============================
        # Upcoming Follow-ups
        # ===============================

        followups = []

        for item in interactions:

            if item.follow_up:

                followups.append(

                    {

                        "doctor": item.doctor_name,

                        "hospital": item.hospital,

                        "follow_up": item.follow_up,

                        "meeting_date": item.meeting_date,

                    }

                )

        # ===============================
        # Response
        # ===============================

        return {

            "summary": {

                "total_doctors": total_doctors,

                "total_interactions": total_interactions,

                "pending_followups": pending_followups,

                "top_product": top_product,

                "top_hospital": top_hospital,

                "today_meetings": today_meetings,

            },

            "weekly_meetings": weekly_meetings,

            "product_distribution": product_distribution,

            "recent_activity": recent_activity,

            "followups": followups,

        }
