import React from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import GradientCard from '@/components/GradientCard';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

// Mock data for call insights
const mockInsights = [
  { question: 'Tell me about yourself.', answer: 'I am a frontend dev...', score: 8, comments: 'Good intro.' },
  { question: 'React experience?', answer: '5 years', score: 9, comments: 'Strong.' },
  { question: 'Problem-solving skills?', answer: 'Solved complex issue.', score: 9, comments: 'Insightful.' },
  { question: 'Teamwork experience?', answer: 'Collaborated on project.', score: 9, comments: 'Good example.' },
];

const candidate = {
  id: '1',
  name: 'Nahid Hasan',
  role: 'UX/UI Designer',
  phone: '+971 89 909 2134',
  email: 'sample@sample.com',
  linkedin: 'linkedurl.com',
  score: 800,
  callInsights: {
    status: 'finished',
    notes: 'LoremLoremLoremLorem LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem',
  },
  candidateNotes: 'LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem LoremLoremLoremLorem',
};

const CallInsightView: React.FC = () => {
  const { id } = useParams();

  // In real app, fetch insights from Airtable by candidate id

  const totalScore = mockInsights.reduce((sum, row) => sum + row.score, 0);

  return (
    <Box sx={{ background: '#171717', minHeight: '100vh', p: { xs: 2, md: 2 }, fontFamily: `'Montserrat', sans-serif` }}>
      {/* Candidate Info Card */}
      <GradientCard gradient="linear-gradient(135deg, #395A84 0%, #4C277F 100%)" sx={{ p: 4, borderRadius: 4, boxShadow: 6, mb: 4, position: 'relative' }}>
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 28, mb: 1 }}>{candidate.name}</Typography>
        <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 20, mb: 2 }}>{candidate.role}</Typography>
        <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon sx={{ fontSize: 20 }} /> {candidate.phone}
        </Box>
        <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ fontSize: 20 }} /> {candidate.email}
        </Box>
       
        <Typography sx={{ color: 'white', opacity: 0.85, mb: 1, fontSize: 18, fontWeight: 700 }}>Score: {candidate.score}</Typography>
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, mt: 2 }}>Recruiter Notes :</Typography>
        <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15, mt: 1 }}>{candidate.callInsights.notes}</Typography>
        <Chip label="Call Finished" sx={{ position: 'absolute', top: 24, right: 24, background: '#177E00', color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
      </GradientCard>

      {/* Call Insights Table */}
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
        <Table sx={{ '& .MuiTableCell-root': { borderBottomColor: '#3a3a3a', fontFamily: 'Montserrat' } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
                QUESTIONS <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
                Answers <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
                Comments <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>SCORE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockInsights.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ color: 'white', opacity: 0.85 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Question {idx+1}
                    <Tooltip title={row.question}>
                      <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', opacity: 0.85 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Answer {idx+1}
                    <Tooltip title={row.answer}>
                      <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', opacity: 0.85 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {row.comments}
                    <Tooltip title={row.comments}>
                      <InfoOutlinedIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', opacity: 0.85 }}>{row.score}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>TOTAL SCORE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{totalScore}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      {/* Candidate Notes */}
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Candidate Notes :</Typography>
        <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15 }}>{candidate.candidateNotes}</Typography>
      </Box>

      {/* Approve Button */}
      <Box sx={{ display: 'flex', }}>
        <Button
          variant="contained"
          sx={{
            background: '#385F8D',
            color: 'white',
            fontWeight: 700,
            borderRadius: 6,
            px: 6,
            py: 1,
            fontSize: 18,
            textTransform: 'none',
            fontFamily: 'Montserrat',
            boxShadow: 2,
            '&:hover': { background: '#385F8D', },
          }}
        >
          Approve
        </Button>
      </Box>
    </Box>
  );
};

export default CallInsightView;