from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        self.assertEqual(user.email, 'test@example.com')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        team = Team.objects.create(name='Test Team')
        activity = Activity.objects.create(name='Running', user=user, team=team)
        self.assertEqual(activity.name, 'Running')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        team = Team.objects.create(name='Test Team')
        leaderboard = Leaderboard.objects.create(user=user, team=team, points=10)
        self.assertEqual(leaderboard.points, 10)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        workout = Workout.objects.create(name='Chest Day', description='Bench press', user=user)
        self.assertEqual(workout.name, 'Chest Day')
