from collections import Counter
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.interaction import Interaction


class AnalyticsService:

    @staticmethod
    def get_dashboard_stats(db: Session):

        interactions = db.query(Interaction).all()

        # ==========================
        # Summary
        # ==========================

        total_interactions = len(interactions)

        total_doctors = len({
            i.doctor_name
            for i in interactions
            if i.doctor_name
        })

        pending_followups = sum(
            1 for i in interactions
            if i.follow_up
        )

        today_meetings = sum(
            1 for i in interactions
            if i.meeting_date
        )

        # ==========================
        # Top Product
        # ==========================

        product_counter = Counter()

        for interaction in interactions:

            if interaction.products:

                product_counter[interaction.products] += 1

        top_product = (
            product_counter.most_common(1)[0][0]
            if product_counter
            else "-"
        )

        # ==========================
        # Top Hospital
        # ==========================

        hospital_counter = Counter()

        for interaction in interactions:

            if interaction.hospital:

                hospital_counter[interaction.hospital] += 1

        top_hospital = (
            hospital_counter.most_common(1)[0][0]
            if hospital_counter
            else "-"
        )

        # ==========================
        # Product Distribution
        # ==========================

        product_distribution = [

            {
                "product": product,
                "count": count,
            }

            for product, count in product_counter.items()

        ]

        # ==========================
        # Weekly Meetings
        # ==========================

        week = {

            "Mon": 0,
            "Tue": 0,
            "Wed": 0,
            "Thu": 0,
            "Fri": 0,
            "Sat": 0,
            "Sun": 0,

        }

        for interaction in interactions:

            if interaction.meeting_date:

                try:

                    date = datetime.strptime(
                        interaction.meeting_date,
                        "%Y-%m-%d"
                    )

                    day = date.strftime("%a")

                    week[day] += 1

                except Exception:
                    pass

        weekly_meetings = [

            {
                "day": day,
                "count": count,
            }

            for day, count in week.items()

        ]

        # ==========================
        # Recent Activity
        # ==========================

        recent_activity = []

        latest = sorted(
            interactions,
            key=lambda x: x.id,
            reverse=True,
        )[:5]

        for item in latest:

            recent_activity.append({

                "doctor": item.doctor_name,

                "action": "Interaction Logged",

                "hospital": item.hospital,

                "product": item.products,

                "time": f"Interaction #{item.id}"

            })

        # ==========================
        # Final Response
        # ==========================

        return {

            "summary": {

                "total_doctors": total_doctors,

                "total_interactions": total_interactions,

                "pending_followups": pending_followups,

                "today_meetings": today_meetings,

                "top_product": top_product,

                "top_hospital": top_hospital,

            },

            "weekly_meetings": weekly_meetings,

            "product_distribution": product_distribution,

            "recent_activity": recent_activity,

        }