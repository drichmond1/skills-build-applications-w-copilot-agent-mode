from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    name = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='pass', first_name='Tony', last_name='Stark'),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='pass', first_name='Steve', last_name='Rogers'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='pass', first_name='Bruce', last_name='Wayne'),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='pass', first_name='Diana', last_name='Prince'),
        ]

        # Activities
        Activity.objects.create(name='Running', user='ironman', team='Marvel')
        Activity.objects.create(name='Swimming', user='captainamerica', team='Marvel')
        Activity.objects.create(name='Cycling', user='batman', team='DC')
        Activity.objects.create(name='Yoga', user='wonderwoman', team='DC')

        # Leaderboard
        Leaderboard.objects.create(user='ironman', team='Marvel', points=100)
        Leaderboard.objects.create(user='captainamerica', team='Marvel', points=90)
        Leaderboard.objects.create(user='batman', team='DC', points=95)
        Leaderboard.objects.create(user='wonderwoman', team='DC', points=85)

        # Workouts
        Workout.objects.create(name='Chest Day', description='Bench press, push-ups', user='ironman')
        Workout.objects.create(name='Leg Day', description='Squats, lunges', user='captainamerica')
        Workout.objects.create(name='Stealth Training', description='Martial arts, gadgets', user='batman')
        Workout.objects.create(name='Amazon Training', description='Strength, agility', user='wonderwoman')

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
