import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/authSlice';
import type { RootState } from '@/app/store';
import Innovasenslogo from "@/assets/innovasense.png";
import JobsImg from "@/assets/jobs.png";
import LogoutImg from '@/assets/logput.png';

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#171717' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#1F2039', fontFamily: `'Montserrat', sans-serif` }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={Innovasenslogo} alt="Innovasense Logo" style={{ height: 24 }} onClick={()=> navigate("/jobs/list")} />
         
          </Box>

     
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout;
