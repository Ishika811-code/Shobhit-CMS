import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'unsafe-development-key-change-before-deploy')
DEBUG = os.environ.get('DJANGO_DEBUG', '0') == '1'
ALLOWED_HOSTS = [x for x in os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',') if x]
INSTALLED_APPS = [
 'django.contrib.admin','django.contrib.auth','django.contrib.contenttypes','django.contrib.sessions','django.contrib.messages','django.contrib.staticfiles',
 'rest_framework','rest_framework_simplejwt','corsheaders','core',
]
MIDDLEWARE = ['django.middleware.security.SecurityMiddleware','whitenoise.middleware.WhiteNoiseMiddleware','corsheaders.middleware.CorsMiddleware','django.contrib.sessions.middleware.SessionMiddleware','django.middleware.common.CommonMiddleware','django.middleware.csrf.CsrfViewMiddleware','django.contrib.auth.middleware.AuthenticationMiddleware','django.contrib.messages.middleware.MessageMiddleware','django.middleware.clickjacking.XFrameOptionsMiddleware']
ROOT_URLCONF='config.urls'
TEMPLATES=[{'BACKEND':'django.template.backends.django.DjangoTemplates','DIRS':[],'APP_DIRS':True,'OPTIONS':{'context_processors':['django.template.context_processors.request','django.contrib.auth.context_processors.auth','django.contrib.messages.context_processors.messages']}}]
WSGI_APPLICATION='config.wsgi.application'
DATABASES={'default':{'ENGINE':'django.db.backends.postgresql','NAME':os.environ.get('POSTGRES_DB','shobhit_cms'),'USER':os.environ.get('POSTGRES_USER','shu_cms'),'PASSWORD':os.environ.get('POSTGRES_PASSWORD','change-me'),'HOST':os.environ.get('POSTGRES_HOST','db'),'PORT':os.environ.get('POSTGRES_PORT','5432'),'CONN_MAX_AGE':60}}
AUTH_USER_MODEL='core.User'
AUTH_PASSWORD_VALIDATORS=[{'NAME':'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},{'NAME':'django.contrib.auth.password_validation.MinimumLengthValidator'},{'NAME':'django.contrib.auth.password_validation.CommonPasswordValidator'},{'NAME':'django.contrib.auth.password_validation.NumericPasswordValidator'}]
LANGUAGE_CODE='en-in'; TIME_ZONE='Asia/Kolkata'; USE_I18N=True; USE_TZ=True
STATIC_URL='static/'; STATIC_ROOT=BASE_DIR/'staticfiles'; DEFAULT_AUTO_FIELD='django.db.models.BigAutoField'
REST_FRAMEWORK={'DEFAULT_AUTHENTICATION_CLASSES':('rest_framework_simplejwt.authentication.JWTAuthentication',),'DEFAULT_PERMISSION_CLASSES':('rest_framework.permissions.IsAuthenticated',),'DEFAULT_THROTTLE_CLASSES':['rest_framework.throttling.AnonRateThrottle','rest_framework.throttling.UserRateThrottle'],'DEFAULT_THROTTLE_RATES':{'anon':'30/min','user':'300/min'}}
from datetime import timedelta
SIMPLE_JWT={'ACCESS_TOKEN_LIFETIME':timedelta(minutes=10),'REFRESH_TOKEN_LIFETIME':timedelta(hours=8),'ROTATE_REFRESH_TOKENS':True,'BLACKLIST_AFTER_ROTATION':True}
CORS_ALLOWED_ORIGINS=[x for x in os.environ.get('CORS_ALLOWED_ORIGINS','http://localhost:5173').split(',') if x]
SECURE_PROXY_SSL_HEADER=('HTTP_X_FORWARDED_PROTO','https')
SESSION_COOKIE_SECURE=not DEBUG; CSRF_COOKIE_SECURE=not DEBUG; SECURE_CONTENT_TYPE_NOSNIFF=True; X_FRAME_OPTIONS='DENY'
