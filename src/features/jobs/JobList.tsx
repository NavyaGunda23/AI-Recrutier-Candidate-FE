import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import GradientCard from '@/components/GradientCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';




// Mock job data
const jobs = [
  {
    id: '1',
    title: 'Senior UI/UX Designer',
    location: 'New Delhi, India',
    salary: '$30,000 - $55,000',
    type: 'FULL-TIME',
  },
  {
    id: '2',
    title: 'Senior UI/UX Designer',
    location: 'New Delhi, India',
    salary: '$30,000 - $55,000',
    type: 'FULL-TIME',
  },
  {
    id: '3',
    title: 'Senior UI/UX Designer',
    location: 'New Delhi, India',
    salary: '$30,000 - $55,000',
    type: 'FULL-TIME',
  },
];
type Job = {
  id: string;
  title: string;
  location: string;
  salary: string;
  type: string;
  oneDriveFolderID: string;
};
const JobList: React.FC = () => {
  const navigate = useNavigate();


  const [records, setRecords] = useState<Job[]>([]);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {

    const data = await supabase
    .from('Recruter_Job_Role')
    .select('*')
    .eq('isPublished', true);
   
    console.log("data",data)
    if(data.error){
     throw new Error('Failed to fetch data');
    }
    // setRecordsInfo(data.data)
    // Map Airtable records into your desired format
    const jobs = data.data.map((record:any) => ({
      id: record.id,
      title: record.position || '',
      location: record.location || '',
      salary: record.salary || '',
      type: record["onsiteRemote"] || '',
      oneDriveFolderID: record.oneDriveFolderId || "",
    }));

    setRecords(jobs);

  };


  

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Box sx={{ background: '#F4F2EE', minHeight: '100vh', p: { xs: 2, md: 2 }, fontFamily: `'Montserrat', sans-serif` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
    
        <Typography sx={{ color: '#000', fontWeight: 600, fontSize: 28 }}>
          Job List
        </Typography>
      
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 5, justifyContent: 'flex-start', alignItems: 'flex-start', mt: 4 }}>
       {records.length  == 0  && <p style={{color:"white"}}>No jobs created</p>}
        {records.map((job:any) => (
          <GradientCard
            key={job.id}
            gradient="linear-gradient(180deg, #fff 0%, #fff 100%)"
            sx={{ borderRadius: 2, boxShadow: 6, p: 1, minWidth: 320,  minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Box sx={{display:"flex",gap:"10px",flexDirection:"row"}}>
              <Typography sx={{ color: '#000', fontWeight: 700, fontSize: 20,  }}>
                {job.title}
              </Typography>
             
              <Chip label={job.type} sx={{ background: '#F1E0FF', width:"fit-content",color: '#6300B3', fontWeight: 600, fontSize: 14, borderRadius: 1,  }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', opacity: 0.85, mb: 0.5, fontSize: 15,mt:1 }}>
                <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                {job.location}
              </Box>
              <Typography sx={{ color: '#000', opacity: 0.85, fontSize: 15, mb: 1 }}>
                Salary: {job.salary}
              </Typography>
            <Button
              variant="outlined"
              sx={{
                color: '#000',
                borderColor: '#000',
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                py: 1,
                fontSize: 15,
                textTransform: 'none',
                fontFamily: 'Montserrat',
                mt: 2,
               
                width:"fit-content",
                '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
              }}
              onClick={() => navigate(`/jobs/create?jobID=${job?.id}`)            }
            >
              Apply Job
            </Button>
          </GradientCard>
        ))}
      </Box>
    </Box>
  );
};

export default JobList;