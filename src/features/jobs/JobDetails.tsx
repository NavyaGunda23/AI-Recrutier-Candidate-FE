import React from 'react';
import { Box, Typography, Button, Chip, Tabs, Tab } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/Person';
import scoreCard from '@/assets/scoreCard.png'
import GradientCard from '@/components/GradientCard';
import { useNavigate } from 'react-router-dom';

const job = {
  title: 'Front End Developer',
  location: 'New Delhi, India',
  description: 'Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor praesent.Lorem ipsum dolor sit amet consectetur.',
  salary: '$30,000 - 40,000',
  experience: 5,
  type: 'ON - SITE',
};

const candidates = [
  { id: '1', name: 'Nahid Hasan', role: 'UX/UI Designer', score: 800 },
  { id: '2', name: 'Nahid Hasan', role: 'UX/UI Designer', score: 800 },
  { id: '3', name: 'Nahid Hasan', role: 'UX/UI Designer', score: 800 },
  { id: '4', name: 'Nahid Hasan', role: 'UX/UI Designer', score: 800 },
  { id: '5', name: 'Nahid Hasan', role: 'UX/UI Designer', score: 800 },
  { id: '6', name: 'Nahid Hasan', role: 'UX/UI Designer', score: 800 },
];

const JobDetails: React.FC = () => {
  const [tab, setTab] = React.useState(0);
 const navigate = useNavigate();
  return (
    <Box sx={{  minHeight: '100vh', p: { xs: 2, md: 1 }, fontFamily: `'Montserrat', sans-serif` }}>
      <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 24, mb: 2 }}>
        Jobs <span style={{ color: '#a084e8', fontWeight: 400 }}>/ {job.title}</span>
      </Typography>
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, mb: 4, display: 'flex', flexDirection: 'column', position: 'relative', color: 'white', boxShadow: 6 }}>
        <Chip label={job.type} sx={{ position: 'absolute', top: 24, right: 24, background: '#F1E0FF', color: '#6300B3', fontWeight: 700, fontSize: 14, borderRadius: 1 }} />
        <Typography sx={{  fontSize: 19, mb: 2 }}>
        <span style={{ fontWeight: 400 }}>Job Location : </span>  <span style={{ fontWeight: 100 }}>{job.location}</span>
        </Typography>
        <Typography sx={{ fontSize: 19, mb: 2 }}>
        <span style={{ fontWeight: 400 }}>Description : </span> <span style={{ fontWeight: 100 }}>{job.description}</span>
        </Typography>
        <Typography sx={{  fontSize: 19, mb: 2 }}>
        <span style={{ fontWeight: 400 }}>Salary : </span>  <span style={{ fontWeight: 100 }}>{job.salary}</span>
        </Typography>
        <Typography sx={{ fontSize: 19 }}>
          <span style={{ fontWeight: 400 }}>Expereince : </span><span style={{ fontWeight: 100 }}>{job.experience}</span>
        </Typography>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 3, borderBottom: '1px solid #261F53', minHeight: 48 }}
        TabIndicatorProps={{ style: { background: '#9F31D9', height: 3 } }}
      >
        <Tab label={<span style={{ color: tab === 0 ? '#9F31D9' : 'white', fontWeight: 400, fontSize: 18 }}>Selected</span>} sx={{ minWidth: 120 }} />
        <Tab label={<span style={{ color: tab === 1 ? '#9F31D9' : 'white', fontWeight: 400, fontSize: 18 }}>Rejected</span>} sx={{ minWidth: 120 }} />
      </Tabs>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 5, mt: 2 }}>
        {candidates.map((candidate) => (
          <GradientCard
            key={candidate.id}
            gradient="linear-gradient(180deg, #36638E 0%, #4C247E 100%)"
            onClick={() => navigate(`/candidates/${candidate.id}`)}
            sx={{ borderRadius: 2, boxShadow: 6, p: 1, minWidth: 320,  minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 20, mb: 1 }}>
                <PersonIcon sx={{ fontSize: 18, mr: 1, mb: -0.5 }} />{candidate.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', opacity: 0.85, mb:1, fontSize: 15 }}>
                <WorkOutlineIcon sx={{ fontSize: 18, mr: 1 }} />
                {candidate.role}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', opacity: 0.85, fontSize: 15 }}>
               <img src={scoreCard} style={{height:"20px",marginRight: "14px" }}/>
                {candidate.score}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
              <Button
                variant="contained"
                sx={{
                  background: 'white',
                  color: '#3a6ea5',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  fontSize: 15,
                  textTransform: 'none',
                  fontFamily: 'Montserrat',
                 
                  '&:hover': { background: '#e3e3e3' },
                }}
                onClick={(event) =>event?.stopPropagation()}
              >
                Initiate Call
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  fontSize: 15,
                  textTransform: 'none',
                  fontFamily: 'Montserrat',
                  '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
                }}
                onClick={(event) =>event?.stopPropagation()}
              >
                Reject
              </Button>
            </Box>
          </GradientCard>
        ))}
      </Box>
    </Box>
  );
};

export default JobDetails;