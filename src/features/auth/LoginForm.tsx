import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  InputAdornment
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/authSlice';
import { Route, useNavigate } from 'react-router-dom';
import type { RootState } from '@/app/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import aiAvatar from '@/assets/ai-avatar.png';
import Grid from '@mui/material/Grid';
import { supabase } from '@/lib/supabaseClient';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GradientCard from '@/components/GradientCard';

const validationSchema = Yup.object({
  userName: Yup.string().required('UserName is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleLoginSubmit(values)
      // dispatch(login(values));
    },
  });

  const [ showError, setShowError] = useState<any>()

  const handleLoginSubmit = async(values:any) =>{
    const {  userName, password } = values;
    const { data: userMatch, error: matchError } = await supabase
  .from('Users') // ✅ make sure the table name matches exactly
  .select('id , companyId')
  .eq('userName', userName) // ✅ or 'userName' depending on your column name
  .eq('password', password)
  .limit(1);


if (!userMatch || userMatch.length === 0) {
setShowError("Incorrect username or password.")
  return;
}


const { data: compnayMatch, error: companyError } = await supabase
.from('CompanyList') // ✅ make sure the table name matches exactly
.select('id ,companyName')
.eq('id', userMatch?.[0]?.companyId) 
.limit(1);
const formValues = { ...values, companyId: userMatch?.[0]?.companyId , companyName:compnayMatch?.[0]?.companyName};
console.log("compnayMatch",compnayMatch,companyError)
// createFolder(compnayMatch && compnayMatch[0].companyName)
dispatch(login(formValues))
}

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/jobs/list');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: '#F4F2EE',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* <img src={bg} style={{position:"absolute",backgroundSize:"contain",width:"100%",height:"100%"}}/> */}
      {/* <img src={logoFace} style={{position:"absolute",backgroundSize:"contain",height:"250px",right:"50px",top:"50px",zIndex:1}}/>
      <img src={logoText} style={{position:"absolute",backgroundSize:"contain",height:"50px",right:"50px",bottom:"50px",zIndex:1}}/> */}
      {/* <Box sx={{position:"absolute",top:"40px",left:"-40px",zIndex:1,rotate:'-45deg',background:'#6172ee',width:"180px",textAlign:"center"}}>
      <Typography >DEMO</Typography>
      </Box> */}
      
      <Grid container sx={{ height: '100vh', width: '100vw',justifyContent:"space-around" }}>
        {/* Left: Login Form */}

        
        <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'transparent' }}>
           <GradientCard
         
            gradient="linear-gradient(180deg, #fff 0%, #fff 100%)"
            sx={{ borderRadius: 2, boxShadow: 6, p: 1, minWidth: 320,  minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
  <Box sx={{ width: '100%', maxWidth: 420, px: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <Avatar src={aiAvatar} sx={{ width: 160, height: 200, mb: 0, borderRadius:0, bgcolor: 'transparent' }} /> */}
            <Typography sx={{fontSize:"32px",color:"black",pt:5,pb:5}}>Candiate Portal Login</Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
              {showError && showError.length >0 && <Typography sx={{color:"red",fontSize:"14px"}}>{showError}</Typography>}
              <TextField
                fullWidth
                id="userName"
                name="userName"
                // label="ORGINAZATION"
                placeholder="User Name"
                margin="normal"
                value={formik.values.userName}
                 onChange={(e) => {
    formik.handleChange(e);
    setShowError('');
  }}
               
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon sx={{ color: 'black' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'black', borderColor: 'black' },
                }}
                InputLabelProps={{ style: { color: 'black', fontWeight: 500, letterSpacing: 1 } }}
                sx={{
                  mb: 3,
                  background: 'transparent',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                }}
              />
              <TextField
                fullWidth
                type='password'
                id="password"
                name="password"
                // label="USERNAME"
                placeholder="PASSWORD"
                margin="normal"
                value={formik.values.password}
                onChange={(e) => {
    formik.handleChange(e);
    setShowError('');
  }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon sx={{ color: 'black' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'black', borderColor: 'black' },
                }}
                InputLabelProps={{ style: { color: 'black', fontWeight: 500, letterSpacing: 1 } }}
                sx={{
                  mb: 5,
                 
                  background: 'transparent',
                  borderRadius: 2,
                  '& .MuiFormControl-marginNormal':{
                    marginTop:0,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                      
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'black',
                    
                  },
                }}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 0,
                  py: 2,
                  fontWeight: 700,
                  fontSize: 20,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6B73FF 0%, #3a6ea5 100%)' ,
                  color: '#fff',
                  boxShadow: 2,
                  letterSpacing: 2,
                  '&:hover': {
                    background: 'linear-gradient(240deg, #6B73FF 0%, #3a6ea5 100%)' 
                  },
                }}
              >
                LOGIN
              </Button>
            
               
            </form>
          </Box>
          </GradientCard>
        
        </Grid>
        {/* Right: Welcome Section */}
       
      </Grid>
    </Box>
  );
};

export default LoginForm;