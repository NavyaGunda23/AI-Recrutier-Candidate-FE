import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GradientCard from '@/components/GradientCard';
import { useNavigate } from 'react-router-dom';
import scoreCard from '@/assets/scoreCard.png'
const candidate = {
  id: '1',
  name: 'Nahid Hasan',
  role: 'UX/UI Designer',
  phone: '+971 89 909 2134',
  email: 'sample@sample.com',
  linkedin: 'linkedurl.com',
  score: 800,
  languages: ['English', 'Arabic', 'French'],
  callInsights: {
    score: 800,
    status: 'finished',
    notes: 'LoremLoremLoremLorem LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLo remLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLo remLoremLoremLorem',
  },
  techSkills: [
    'AI/ML: PyTorch, TensorFlow, scikit-learn, Hugging Face Transformers, PyTorch Lightning',
    'LLMs & GenAI: Fine-tuning (LoRA/QLoRA), RAGs, multi-agent systems, open-source LLMs, prompt engineering',
    'MLOps & Deployment: MLflow, Airflow, Prometheus, Docker, Kubernetes, CI/CD pipelines',
    'Software Engineering: Python (advanced), C#, C++, Dart, JavaScript, FastAPI, Django, React.js, Next.js, .NET, Flutter',
    'Cloud Platforms: GCP Vertex AI, Azure ML Studio, Amazon SageMaker',
  ],
  softSkills: [
    'Cross-functional collaboration',
    'Agile delivery',
    'Communication with stakeholders',
    'Teamwork and independent work',
    'Problem-solving',
  ],
  experience: [
    'AI/ML Engineer | eData Information | June 2023 – present | Onsite | Dubai, UAE',
    '- Designed and deployed real-time AI valuation system for vehicles, built intelligent VIN decoding system, developed multi-agent AI systems and chatbots, led AI-powered scraping/data validation platform, fine-tuned LLMs, implemented RAG systems, managed MLOps pipelines, developed scalable backend services, delivered cloud-native AI solutions, automated model deployment, and collaborated with cross-functional teams.',
    'Software Engineer | Talal Tech | Feb 2022 – June 2023 | Remote | Medina, Saudi Arabia',
    '- Engineered scalable backend systems and APIs, excelled in Python backend development, contributed to full-stack development with React.js/Next.js, implemented CI/CD pipelines, and designed/testing frameworks.',
  ],
};

const CandidateDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{  minHeight: '100vh', p: { xs: 2, md: 1 }, fontFamily: `'Montserrat', sans-serif` }}>
      {/* Top Row: Candidate Info and Call Insights */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <GradientCard gradient="linear-gradient(180deg, #336589 0%, #5545B9 100%)" sx={{ flex: 2, p: 1, borderRadius: 2, boxShadow: 6 }}>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 28, mb: 1 }}>{candidate.name}</Typography>
          <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 20, mb: 2 }}>{candidate.role}</Typography>
          <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhoneIcon sx={{ fontSize: 20, mr: 1 }} /> {candidate.phone}
          </Box>
          <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmailIcon sx={{ fontSize: 20, mr: 1 }} /> {candidate.email}
          </Box>
          <Box sx={{ color: 'white', opacity: 0.85, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinkedInIcon sx={{ fontSize: 20, mr: 1 }} /> {candidate.linkedin}
          </Box>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 18, mt: 2 }}>Languages:</Typography>
          <Typography sx={{ color: 'white', opacity: 0.7, fontWeight: 400, fontSize: 16 }}>{candidate.languages.join(', ')}</Typography>
          <Chip label={candidate.score} sx={{ position: 'absolute', top: 24, right: 24, background: '#23234f', color: 'white', fontWeight: 700, fontSize: 16, borderRadius: 2 }} />
        </GradientCard>
        <GradientCard gradient="linear-gradient(90deg, #336589 0%, #5545B9 100%)" sx={{ flex: 1, p: 1, borderRadius: 2, boxShadow: 6, position: 'relative' }}>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 24, mb: 1 }}>Call Insights</Typography>
          <Chip label={candidate.callInsights.status} sx={{ position: 'absolute', top: 24, right: 24, background: '#3ad29f', color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
          <Typography sx={{ color: 'white', opacity: 0.85, mb: 1, fontSize: 18, fontWeight: 700 }}>
          <img src={scoreCard} style={{height:"20px",marginRight: "5px" ,verticalAlign:"middle"}}/> 800
            </Typography>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, mt: 2 }}>Recruiter Notes :</Typography>
          <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15, mt: 1, wordBreak: 'break-word', // ensures long words break into the next line
    whiteSpace: 'normal', }}>{candidate.callInsights.notes}</Typography>
          {/* <Button onClick={() => navigate(`/candidates/${candidate.id}/call-insights`)}>View More</Button> */}
             <Button
                          variant="outlined"
                          sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontWeight: 700,
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            mt:4,
                            fontSize: 15,
                            textTransform: 'none',
                            fontFamily: 'Montserrat',
                            '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
                          }}
                          onClick={() => navigate(`/candidates/${candidate.id}/call-insights`)}
                        >
                          View More
                        </Button>
        </GradientCard>
      </Box>
      {/* Skills and Experience */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Box sx={{ flex: 2, background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Technical Skills</Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {candidate.techSkills.map((skill, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
            ))}
          </ul>
        </Box>
        <Box sx={{ flex: 1, background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Soft Skills</Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {candidate.softSkills.map((skill, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Technical Skills</Typography>
        {candidate.experience.map((exp, idx) => (
          <Typography key={idx} sx={{ fontSize: 15, mb: 1 }}>{exp}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default CandidateDetails;