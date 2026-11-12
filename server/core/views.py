from django.db import transaction
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Campus, AcademicClass, AttendanceSession, AttendanceRecord, Notification, AuditEvent
from .serializers import CampusSerializer, AttendanceMarkSerializer, AttendanceRecordSerializer, NotificationSerializer
from .permissions import CanMarkAttendance

class CampusList(generics.ListAPIView):
 serializer_class=CampusSerializer
 def get_queryset(self):
  qs=Campus.objects.filter(is_active=True)
  if self.request.user.role!='SUPER_ADMIN' and self.request.user.campus_id: qs=qs.filter(id=self.request.user.campus_id)
  return qs

class MarkAttendance(APIView):
 permission_classes=[CanMarkAttendance]
 @transaction.atomic
 def post(self, request):
  ser=AttendanceMarkSerializer(data=request.data); ser.is_valid(raise_exception=True); d=ser.validated_data
  try: cls=AcademicClass.objects.select_for_update().get(pk=d['class_id'],campus=request.user.campus,is_active=True)
  except AcademicClass.DoesNotExist: return Response({'detail':'Class not found in your campus.'},status=404)
  if request.user.role=='FACULTY' and not cls.faculty.filter(pk=request.user.pk).exists(): return Response({'detail':'You are not assigned to this class.'},status=403)
  students={u.id:u for u in cls.students.filter(id__in=[r['student_id'] for r in d['records']])}
  if len(students)!=len(d['records']): return Response({'detail':'One or more students are not enrolled in this class.'},status=400)
  session,created=AttendanceSession.objects.get_or_create(class_obj=cls,subject_code=d['subject_code'],session_date=d['session_date'],period=d.get('period',''),defaults={'subject_name':d['subject_name'],'marked_by':request.user})
  if not created:
   session.subject_name=d['subject_name']; session.marked_by=request.user; session.save(update_fields=['subject_name','marked_by','updated_at'])
  output=[]
  for row in d['records']:
   student=students[row['student_id']]
   record,_=AttendanceRecord.objects.update_or_create(session=session,student=student,defaults={'status':row['status']})
   title='Attendance marked: '+row['status'].title()
   body=f'{session.subject_name} on {session.session_date:%d %b %Y}: you were marked {row["status"].lower()}.'
   Notification.objects.create(recipient=student,title=title,body=body,category='ATTENDANCE',data={'session_id':session.id,'status':row['status'],'subject_code':session.subject_code})
   output.append(record)
  AuditEvent.objects.create(actor=request.user,campus=cls.campus,action='ATTENDANCE_MARKED',object_type='AttendanceSession',object_id=str(session.id),metadata={'record_count':len(output),'date':str(session.session_date)})
  return Response({'session_id':session.id,'created':created,'records':AttendanceRecordSerializer(output,many=True).data,'message':'Attendance saved. Student notifications have been queued.'},status=status.HTTP_201_CREATED)

class MyAttendance(generics.ListAPIView):
 serializer_class=AttendanceRecordSerializer
 def get_queryset(self):
  return AttendanceRecord.objects.filter(student=self.request.user).select_related('session','session__class_obj').order_by('-session__session_date')

class MyNotifications(generics.ListAPIView):
 serializer_class=NotificationSerializer
 def get_queryset(self): return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')[:100]

class MarkNotificationRead(APIView):
 permission_classes=[IsAuthenticated]
 def post(self,request,pk):
  n=Notification.objects.filter(pk=pk,recipient=request.user).first()
  if not n:return Response({'detail':'Not found'},status=404)
  n.read_at=timezone.now(); n.save(update_fields=['read_at']); return Response({'status':'read'})
