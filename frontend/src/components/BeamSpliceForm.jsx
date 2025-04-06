import React, { useState } from "react";
import { TextField, MenuItem, Button, Grid, Paper, Box,Typography, InputAdornment } from "@mui/material";
import axios from "axios";
import BeamVisualizer from "./BeamVisualizer";

const BeamSpliceForm = () => {
  const [formData, setFormData] = useState({
    sectionSize: "ISMB 300",
    material: "Fe 410 WA",
    weldType: "Fillet Weld",
    bendingMoment: "",
    shearForce: "",
    axialForce: "",
    flangePreference: "Outside",
    flangeThickness: 12,
    webThickness: 10
  });

  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/beam-splice/', {
        section_size: formData.sectionSize,
        bending_moment: parseFloat(formData.bendingMoment),
        shear_force: parseFloat(formData.shearForce),
        axial_force: parseFloat(formData.axialForce),
        flange_thickness: parseFloat(formData.flangeThickness),
        web_thickness: parseFloat(formData.webThickness)
      });
      console.log("Design Result:", response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error.response?.data);
      alert(`Error: ${error.response?.data?.detail || 'Check console for details'}`);
    }
  };
  const handleReset = () => {
    setFormData({
      sectionSize: '',
      bendingMoment: '',
      shearForce: '',
      axialForce: '',
      flangeThickness: '',
      webThickness: '',
      // ... add other default values as needed
    });
  };
  
  return (
    <Paper elevation={3} sx={{ p: 4, m: 4, borderRadius: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#2c3e50' }}>
        Beam-to-Beam Splice: Cover Plate Bolted
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Inputs */}
        <Grid item xs={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: '600' }}>
              connecting members
            </Typography>

            {/* Section Size */}
            <TextField
              select
              label="Section Size"
              value={formData.sectionSize}
              onChange={(e) => setFormData({ ...formData, sectionSize: e.target.value })}
              fullWidth
              sx={{ mb: 3 }}
              size="small"
            >
              {["ISMB 100", "ISMB 200", "ISMB 300"].map((size) => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </TextField>

            {/* Factored Loads */}
            <Typography variant="subtitle2" sx={{ mb: 2, color: '#7f8c8d' }}>
              Factored Loads
            </Typography>
            <TextField
              label="Bending Moment"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">Nm</InputAdornment>,
              }}
              value={formData.bendingMoment}
              onChange={(e) => setFormData({ ...formData, bendingMoment: e.target.value })}
            />
            <TextField
              label="Shear Force"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">kN</InputAdornment>,
              }}
              value={formData.shearForce}
              onChange={(e) => setFormData({ ...formData, shearForce: e.target.value })}
            />
            <TextField
              label="Axial Force"
              type="number"
              fullWidth
              sx={{ mb: 3 }}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">kN</InputAdornment>,
              }}
              value={formData.axialForce}
              onChange={(e) => setFormData({ ...formData, axialForce: e.target.value })}
            />

            {/* Flange Settings */}
            <Typography variant="subtitle3" sx={{ mb: 2, color: '#7f8c8d' }}>
              Flange Plate
            </Typography>
            <TextField
               label="Flange Width (mm)"
               type="number"
               fullWidth
               sx={{ mb: 2 }}
               value={formData.flangeWidth}
               onChange={(e) => setFormData({ ...formData, flangeWidth: e.target.value })}
             />
            <TextField
              select
              label="Thickness"
              fullWidth
              sx={{ mb: 3 }}
              size="small"
              value={formData.flangeThickness}
              onChange={(e) => setFormData({ ...formData, flangeThickness: e.target.value })}
            >
              {[8, 10, 12, 14].map((thick) => (
                <MenuItem key={thick} value={thick}>{thick} mm</MenuItem>
              ))}
            </TextField>

            {/* Web Settings */}
            <Typography variant="subtitle4" sx={{ mb: 2, color: '#7f8c8d' }}>
              Web Plate
            </Typography>
            <TextField
              label="Web Height (mm)"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.webHeight}
              onChange={(e) => setFormData({ ...formData, webHeight: e.target.value })}
            />
            <TextField
              select
              label="Thickness"
              fullWidth
              sx={{ mb: 3 }}
              size="large"
              value={formData.webThickness}
              onChange={(e) => setFormData({ ...formData, webThickness: e.target.value })}
            >
              {[6, 8, 10, 12].map((thick) => (
                <MenuItem key={thick} value={thick}>{thick} mm</MenuItem>
              ))}
            </TextField>

  
           <Typography variant="subtitle5" sx={{ mb: 2, color: '#7f8c8d' }} >
             Bolt
           </Typography>
         {/* ✅ New Bolt Fields */}
           <TextField
              label="Bolt Diameter (mm)"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              size="large"
              value={formData.boltDiameter}
              onChange={(e) => setFormData({ ...formData, boltDiameter: e.target.value })}
            />

            <TextField
              label="Bolt Type"
              select
              fullWidth
              sx={{ mb: 3 }}
              size="large"
              value={formData.boltType}
              onChange={(e) => setFormData({ ...formData, boltType: e.target.value })}
            >
              <MenuItem value="HSFG">HSFG</MenuItem>
              <MenuItem value="Black Bolt">Black Bolt</MenuItem>
              <MenuItem value="Black Bolt">Bearing Bolt</MenuItem>
        
            </TextField>
        
            <TextField
              label="Property Class"
              select
              fullWidth
              sx={{ mb: 3 }}
              value={formData.propertyClass}
              onChange={(e) => setFormData({ ...formData, propertyClass: e.target.value })}
            >
              <MenuItem value="8.8">8.8</MenuItem>
              <MenuItem value="10.9">10.9</MenuItem>
              <MenuItem value="12.9">12.9</MenuItem>
              
            </TextField>        

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              sx={{ py: 1.5, fontWeight: '600' }}
            >
              Design
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleReset}
              sx={{ py: 1.5, fontWeight: '600', mt: 2 }} // mt = margin-top for spacing
            >
              Reset
            </Button>          
          </Paper>
        </Grid>
            
        {/* Center Column - 3D Visualization */}
        <Grid item xs={6}>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>
              3D Visualization
            </Typography>
            <BeamVisualizer 
              flangeWidth={results?.flange_plate_width || 200}
              webHeight={results?.web_plate_thickness || 300}
            />
          </Paper>
        </Grid>

        {/* Right Column - Results */}
        <Grid item xs={2}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: '600' }}>
              Output Docks
              </Typography>
              <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
              >
            <Typography sx={{ minWidth: 120 }}>Diameter(mm)</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>Shear Demand</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>Shear Capacity</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
              <Typography sx={{ minWidth: 120 }}>Bolt Capacity</Typography>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>

            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>Tension due to Moment</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>

            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>No. of bolts</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>
              
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>No. of columns</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>No. of rows</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Box>
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between" 
              sx={{ mb: 2 }}
            >
            <Typography sx={{ minWidth: 120 }}>pitch distance</Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>

            <Button
              fullWidth        
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              sx={{ py: 1.5, fontWeight: '600' }}
            >
              Create Design Report
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleReset}
              sx={{ py: 1.5, fontWeight: '600', mt: 2 }} // mt = margin-top for spacing
            >
              Save Output
            </Button>          
            
            {results ? (
              
              <div>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Member Capacity:</strong><br />
                  {results.member_capacity} kN
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Flange Plate:</strong><br />
                  {results.flange_plate_thickness} mm
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Web Plate:</strong><br />
                  {results.web_plate_thickness} mm
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: results.design_status === 'SAFE' ? '#27ae60' : '#c0392b',
                  fontWeight: 'bold'
                }}>
                  {results.design_status}
                </Typography>
              </div>
            ) : (
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Submit values to see design results
              </Typography>
            )}
            
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BeamSpliceForm;