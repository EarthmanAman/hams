from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token





class CustomAccountManager(BaseUserManager):

	def create_superuser(self, username, email, password, **other_fields):
		other_fields.setdefault("is_staff", True)
		other_fields.setdefault("is_superuser", True)
		other_fields.setdefault("is_active", True)

		if other_fields.get("is_staff") is not True:
			raise ValueError("SuperUser must be assigned to is_staff=True")
		if other_fields.get("is_superuser") is not True:
			raise ValueError("SuperUser must be assigned to is_superuser=True")
		
		return self.create_user(username, email, password, **other_fields)

	def create_user(self, username, email, password, **other_fields):
		if not email:
			raise ValueError(_("You must provide an email address"))
		if not username:
			raise ValueError(_("You must provide a username"))

		email = self.normalize_email(email)
		user = self.model(email=email, username=username, **other_fields)

		user.set_password(password)
		user.save()
		return user

class User(AbstractBaseUser, PermissionsMixin):
	email 			= models.EmailField(_("email address"))
	username 		= models.CharField(max_length=150, unique=True)
	first_name 		= models.CharField(max_length=100, null=True)
	last_name 		= models.CharField(max_length=100, null=True)
	phone_no        = models.BigIntegerField(null=True, blank=True)
	uuid 			= models.CharField(max_length=10, null=True)
	is_active 		= models.BooleanField(default=False)
	email_verified 	= models.BooleanField(default=False)
	phone_verified  = models.BooleanField(default=False)
	is_staff 		= models.BooleanField(default=False)
	dob 			= models.DateField(blank=True, null=True)
	gender 			= models.CharField(max_length=15, null=True)
	avatar			= models.ImageField(upload_to="./avatars", blank=True, null=True)

	objects 	= CustomAccountManager()

	USERNAME_FIELD = "username"
	REQUIRED_FIELDS = ["email", ]

	def __str__(self):
		return self.username 
	

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)