from django.db import models

class BeamSpliceBolted(models.Model):
    section_size = models.CharField(max_length=50)
    material = models.CharField(max_length=50, default="Fe 410 WA")
    weld_type = models.CharField(max_length=50, default="Fillet Weld")
    bending_moment = models.FloatField()  
    shear_force = models.FloatField()    
    axial_force = models.FloatField(default=0)    
    flange_preference = models.CharField(max_length=20, default="Outside")
    flange_thickness = models.FloatField(default=0) 
    web_thickness = models.FloatField(default=0)    
    member_capacity = models.FloatField(default=0)   
    flange_plate_thickness = models.FloatField(default=0) 
    web_plate_thickness = models.FloatField(default=0)  
    weld_strength = models.FloatField(default=0)  
    design_status = models.CharField(max_length=20, default="SAFE")