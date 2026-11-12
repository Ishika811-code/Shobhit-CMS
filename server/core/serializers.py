from rest_framework import serializers
from .models import Campus, AcademicClass, AttendanceSession, AttendanceRecord, Notification
class CampusSerializer(serializers.ModelSerializer):
 class Meta: model=Campus; fields=['id','code','name','address','is_active']
class AttendanceRecordInput(serializers.Serializer):
 student_id=serializers.IntegerField()
 status=serializers.ChoiceField(choices=AttendanceRecord.Status.choices)
class AttendanceMarkSerializer(serializers.Serializer):
 class_id=serializers.IntegerField()
 subject_code=serializers.CharField(max_length=30)
 subject_name=serializers.CharField(max_length=160)
 session_date=serializers.DateField()
 period=serializers.CharField(max_length=30,required=False,allow_blank=True)
 records=AttendanceRecordInput(many=True)
 def validate_records(self, value):
  ids=[x['student_id'] for x in value]
  if len(ids)!=len(set(ids)): raise serializers.ValidationError('Duplicate student in attendance payload.')
  return value
class AttendanceRecordSerializer(serializers.ModelSerializer):
 student_name=serializers.CharField(source='student.get_full_name',read_only=True)
 university_id=serializers.CharField(source='student.university_id',read_only=True)
 class Meta: model=AttendanceRecord; fields=['id','student','student_name','university_id','status','marked_at']
class NotificationSerializer(serializers.ModelSerializer):
 class Meta: model=Notification; fields=['id','title','body','category','data','created_at','read_at']
