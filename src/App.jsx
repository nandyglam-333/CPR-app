// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Container, useMediaQuery, Avatar, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import StudentDashboard from './pages/StudentDashboard';
import CoachDashboard from './pages/CoachDashboard';
import MeetingSchedule from './pages/MeetingSchedule';
import ReportUpload from './pages/ReportUpload';
import ReportHistory from './pages/ReportHistory';
import Logo from './assets/logo.png'; // Replace with your actual logo path

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const menuItems = [
    { text: 'Student', path: '/student' },
    { text: 'Coach', path: '/coach' },
    { text: 'Schedule', path: '/schedule' },
    { text: 'Upload', path: '/upload' },
    { text: 'History', path: '/history' }
  ];

  const drawer = (
    <Box onClick={() => setDrawerOpen(false)} sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar src={Logo} sx={{ width: 40, height: 40, mr: 1 }} />
        <Typography variant="h6">CPR App</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar src={Logo} sx={{ width: 32, height: 32, mr: 1 }} />
            <Typography variant="h6" noWrap>
              CPR App
            </Typography>
          </Box>
          {!isMobile && (
            <Box>
              {menuItems.map((item) => (
                <Link key={item.text} to={item.path} style={{ color: '#fff', marginRight: 16, textDecoration: 'none' }}>
                  {item.text}
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/schedule" element={<MeetingSchedule />} />
          <Route path="/upload" element={<ReportUpload />} />
          <Route path="/history" element={<ReportHistory />} />
        </Routes>
      </Container>
    </Router>
  );
}
