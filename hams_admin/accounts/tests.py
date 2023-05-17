from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
User = get_user_model()

class ChangePasswordViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com'
        )
        self.client.force_authenticate(user=self.user)

    def test_change_password_success(self):
        url = reverse('accounts:change_password', args=[self.user.id])  # Replace 'change-password' with your actual URL name
        data = {
            'old_password': 'testpassword',
            'new_password': 'newtestpassword',
        }

        response = self.client.put(url, data)
        status_code = response.data.get("status", None)
        self.assertEqual(status_code, status.HTTP_204_NO_CONTENT)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newtestpassword'))

    def test_change_password_incorrect_old_password(self):
        url = reverse('accounts:change_password', args=[self.user.id]) 
        data = {
            'old_password': 'incorrectpassword',
            'new_password': 'newtestpassword',
        }

        response = self.client.put(url, data)
        status_code = response.data.get("status", None)
        self.assertEqual(status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'Old Password is incorrect')

    def test_change_password_user_not_found(self):
        url = reverse('accounts:change_password', args=[2000])  
        data = {
            'old_password': 'testpassword',
            'new_password': 'newtestpassword',
        }

        # Log out the current user to simulate a user not being authenticated
        self.client.logout()

        response = self.client.put(url, data)
        status_code = response.data.get("status", None)
        self.assertEqual(status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'User does not exist')


class VerifyAccountTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_verify_account_success(self):
        user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com',
            uuid='some-uuid',
        )

        url = reverse('accounts:verify')  # Replace 'verify-account' with your actual URL name
        data = {
            'uuid': 'some-uuid',
        }

        response = self.client.post(url, data)
        status_code = response.data["status"]
        self.assertEqual(status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Verified successfully')

        user.refresh_from_db()
        self.assertTrue(user.is_active)
        self.assertTrue(user.email_verified)

    def test_verify_account_invalid_uuid(self):
        url = reverse('accounts:verify')  # Replace 'verify-account' with your actual URL name
        data = {
            'uuid': 'invalid-uuid',
        }

        response = self.client.post(url, data)
        status_code = response.data["status"]
        self.assertEqual(status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'The code you entered is invalid')


class UserUpdateViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com',
            first_name='John',
            last_name='Doe',
            dob='1990-01-01',
            # avatar='avatar.jpg',
            phone_no='1234567890',
        )
        self.client.force_authenticate(user=self.user)

    def test_update_user_success(self):
        url = reverse('accounts:update', args=[self.user.id])  # Replace 'user-detail' with your actual URL name

        data = {
            'first_name': 'Updated',
            'last_name': 'Name',
            'dob': '1995-01-01',
            # 'avatar': 'updated_avatar.jpg',
            'phone_no': '9876543210',
        }

        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Updated')
        self.assertEqual(response.data['last_name'], 'Name')
        self.assertEqual(response.data['dob'], '1995-01-01')
        # self.assertEqual(response.data['avatar'], 'updated_avatar.jpg')
        self.assertEqual(response.data['phone_no'], 9876543210)

    def test_update_user_unauthorized(self):
        # Log out the current user to simulate an unauthorized request
        self.client.logout()

        url = reverse('accounts:update', args=[self.user.id])  # Replace 'user-detail' with your actual URL name

        data = {
            'first_name': 'Updated',
        }

        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_not_found(self):
        url = reverse('accounts:update', args=[999])  # Replace 'user-detail' with your actual URL name

        data = {
            'first_name': 'Updated',
        }

        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# class CustomAuthTokenTest(APITestCase):
#     def setUp(self):
#         self.client = APIClient()

#         self.user = User.objects.create_user(
#             username='testuser',
#             password='testpassword',
#             email='test@example.com',
#             first_name='John',
#             last_name='Doe',
#             dob='1990-01-01',
#             # avatar='avatar.jpg',
#             phone_no='1234567890',
#         )

#     def test_custom_auth_token(self):
#         url = reverse('accounts:login')  # Replace 'custom-auth-token' with your actual URL name

#         data = {
#             'username': 'testuser',
#             'password': 'testpassword',
#         }

#         response = self.client.post(url, data, format='json')
#         # self.assertEqual(response.status_code, 201)
#         self.assertIn('token', response.data)
#         self.assertIn('user', response.data)
#         self.assertEqual(response.data['user']['username'], 'testuser')
#         self.assertEqual(response.data['user']['email'], 'test@example.com')
#         self.assertEqual(response.data['user']['first_name'], 'John')
#         self.assertEqual(response.data['user']['last_name'], 'Doe')
#         self.assertEqual(response.data['user']['dob'], '1990-01-01')
#         # self.assertEqual(response.data['user']['avatar'], 'avatar.jpg')
#         self.assertEqual(response.data['user']['phone_no'], '1234567890')

#         # Verify that the token is associated with the user
#         token = response.data['token']
#         self.assertEqual(Token.objects.get(key=token).user, self.user)

