from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Campus, AcademicClass, AttendanceSession, AttendanceRecord, Notification, AuditEvent
admin.site.register(User,UserAdmin)
for m in [Campus,AcademicClass,AttendanceSession,AttendanceRecord,Notification,AuditEvent]: admin.site.register(m)
