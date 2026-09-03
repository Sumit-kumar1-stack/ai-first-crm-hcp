"""Add user_id ownership column to interactions

Revision ID: 0002_add_user_id
Revises: 0001_initial_schema
Create Date: 2026-09-03 18:56:00.000000

Migration Behavior & Database Strategy:
- Fresh deployments run 0001 -> 0002 sequentially on an empty schema, establishing
  interactions.user_id as NOT NULL with a foreign key to users.id (ON DELETE CASCADE)
  and an index on user_id, exactly matching the SQLAlchemy Interaction model.
- Existing pre-Alembic databases must NOT blindly run `alembic upgrade head` if
  the interactions table already contains unowned rows.
- Legacy databases require either:
  a) Deterministic ownership backfill followed by migration/stamping, OR
  b) Development database reset/recreation if previous local data is disposable.
- Old rows must NOT be assigned to an arbitrary user or given fake ownership.
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '0002_add_user_id'
down_revision: Union[str, None] = '0001_initial_schema'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('interactions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_index('ix_interactions_user_id', ['user_id'], unique=False)
        batch_op.create_foreign_key(
            'fk_interactions_user_id_users',
            'users',
            ['user_id'],
            ['id'],
            ondelete='CASCADE'
        )


def downgrade() -> None:
    with op.batch_alter_table('interactions', schema=None) as batch_op:
        batch_op.drop_constraint('fk_interactions_user_id_users', type_='foreignkey')
        batch_op.drop_index('ix_interactions_user_id')
        batch_op.drop_column('user_id')
