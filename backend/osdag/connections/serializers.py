from rest_framework import serializers
from .models import BeamSpliceBolted

class BeamSpliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeamSpliceBolted
        fields = '__all__'
        extra_kwargs = {
            'flange_thickness': {'required': False, 'default': 0},
            'web_thickness': {'required': False, 'default': 0},
            'axial_force': {'required': False, 'default': 0}
        }