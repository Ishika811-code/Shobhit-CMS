from django.urls import path
from .views import CampusList, MarkAttendance, MyAttendance, MyNotifications, MarkNotificationRead
urlpatterns=[path('campuses/',CampusList.as_view()),path('attendance/mark/',MarkAttendance.as_view()),path('attendance/me/',MyAttendance.as_view()),path('notifications/me/',MyNotifications.as_view()),path('notifications/<int:pk>/read/',MarkNotificationRead.as_view())]
