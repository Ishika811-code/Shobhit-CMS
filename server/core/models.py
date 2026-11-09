import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class Campus(models.Model):
    code=models.CharField(max_length=20, unique=True)
    name=models.CharField(max_length=160)
    address=models.TextField(blank=True)
    is_active=models.BooleanField(default=True)
    def __str__(self): return f'{self.name} ({self.code})'

class User(AbstractUser):
    class Role(models.TextChoices):
        SUPER_ADMIN='SUPER_ADMIN','Super administrator'; CAMPUS_ADMIN='CAMPUS_ADMIN','Campus administrator'; FACULTY='FACULTY','Faculty'; STUDENT='STUDENT','Student'; FINANCE='FINANCE','Finance'; EXAM='EXAM','Examination'; HR='HR','Human resources'; LIBRARY='LIBRARY','Library'; REGISTRAR='REGISTRAR','Registrar'
    public_id=models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    role=models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)
    campus=models.ForeignKey(Campus,null=True,blank=True,on_delete=models.PROTECT,related_name='users')
    university_id=models.CharField(max_length=40,unique=True)
    phone_number=models.CharField(max_length=20,blank=True)
    push_token=models.TextField(blank=True)
    def __str__(self): return f'{self.university_id} - {self.get_full_name()}'

class AcademicClass(models.Model):
    campus=models.ForeignKey(Campus,on_delete=models.PROTECT)
    name=models.CharField(max_length=120)
    programme=models.CharField(max_length=120)
    semester=models.PositiveSmallIntegerField()
    section=models.CharField(max_length=20,blank=True)
    faculty=models.ManyToManyField(User,related_name='teaching_classes',blank=True)
    students=models.ManyToManyField(User,related_name='enrolled_classes',blank=True)
    is_active=models.BooleanField(default=True)
    class Meta: unique_together=('campus','name','section','semester')
    def __str__(self): return f'{self.name} {self.section}'

class AttendanceSession(models.Model):
    class_obj=models.ForeignKey(AcademicClass,on_delete=models.PROTECT,related_name='attendance_sessions')
    subject_code=models.CharField(max_length=30)
    subject_name=models.CharField(max_length=160)
    session_date=models.DateField()
    period=models.CharField(max_length=30,blank=True)
    marked_by=models.ForeignKey(User,on_delete=models.PROTECT,related_name='marked_sessions')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    class Meta: constraints=[models.UniqueConstraint(fields=['class_obj','subject_code','session_date','period'],name='unique_class_subject_date_period')]

class AttendanceRecord(models.Model):
    class Status(models.TextChoices): PRESENT='PRESENT','Present'; ABSENT='ABSENT','Absent'; LATE='LATE','Late'; EXCUSED='EXCUSED','Excused'
    session=models.ForeignKey(AttendanceSession,on_delete=models.CASCADE,related_name='records')
    student=models.ForeignKey(User,on_delete=models.PROTECT,related_name='attendance_records')
    status=models.CharField(max_length=10,choices=Status.choices)
    marked_at=models.DateTimeField(auto_now=True)
    class Meta: constraints=[models.UniqueConstraint(fields=['session','student'],name='unique_attendance_student_per_session')]

class Notification(models.Model):
    recipient=models.ForeignKey(User,on_delete=models.CASCADE,related_name='notifications')
    title=models.CharField(max_length=180)
    body=models.TextField()
    category=models.CharField(max_length=40,default='GENERAL')
    data=models.JSONField(default=dict,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    read_at=models.DateTimeField(null=True,blank=True)
    push_status=models.CharField(max_length=20,default='PENDING')

class AuditEvent(models.Model):
    actor=models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
    campus=models.ForeignKey(Campus,null=True,on_delete=models.SET_NULL)
    action=models.CharField(max_length=80)
    object_type=models.CharField(max_length=80)
    object_id=models.CharField(max_length=80)
    metadata=models.JSONField(default=dict,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    ip_address=models.GenericIPAddressField(null=True,blank=True)
