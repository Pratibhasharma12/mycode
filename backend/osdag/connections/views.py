from rest_framework import generics
from .models import BeamSpliceBolted
from .serializers import BeamSpliceSerializer

class BeamSpliceCreateView(generics.CreateAPIView):
    queryset = BeamSpliceBolted.objects.all()
    serializer_class = BeamSpliceSerializer

def perform_create(self, serializer):
    data = serializer.validated_data
    
    flange_thickness = data.get('flange_thickness', 0)
    web_thickness = data.get('web_thickness', 0)
    
    member_capacity = 1725  
    flange_plate_thickness = max(flange_thickness, 10)
    web_plate_thickness = max(web_thickness, 8)
    weld_strength = 1000 
    design_status = "SAFE"

    serializer.save(
        member_capacity=member_capacity,
        flange_plate_thickness=flange_plate_thickness,
        web_plate_thickness=web_plate_thickness,
        weld_strength=weld_strength,
        design_status=design_status
    )