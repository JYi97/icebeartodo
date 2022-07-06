from flask.cli import AppGroup
from .users import seed_users, undo_users
from .folders import seed_folders, undo_folders
from .activities import seed_activities, undo_activities

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_folders()
    seed_activities()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_folders()
    undo_activities()
    # Add other undo functions here
