import React, { useState, type ChangeEvent } from 'react';
import { Box, Typography, Button, InputAdornment, MenuItem, Select, OutlinedInput, Chip, TextField as MuiTextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import type { SelectChangeEvent } from '@mui/material';
import type { FieldProps } from 'formik';
import { createFolderInSharedFolder } from '@/createFolderInSharedFolder';

const JobSchema = Yup.object().shape({
  'Candidate Name': Yup.string().required('Required'),
  Phone_Number: Yup.string().required('Required').matches(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
  Experience: Yup.number().required('Required').min(0),
  Email: Yup.string().email('Invalid email').required('Required'),
  File: Yup.mixed().required('File is required'),
});

const initialValues = {
  'Candidate Name': '',
  Phone_Number: '',
  Experience: 1,
  Email: '',
  File: null,
};


const gradientInputSx = {
  background: 'linear-gradient(90deg, #fff 0%, #fff 100%)',
  color: '#000',
  borderRadius: 2,
  border: 'none',
  fontWeight: 400,
  fontSize: 16,
  width:"100%",
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  
  '& .MuiInputBase-input': {
    color: '#000',
  },
  
  '& .MuiInputLabel-root': {
    color: '#000',
  },
  '& .MuiSelect-icon': {
    color: '#000',
  },
  '& .MuiChip-root': {
    background: '#2d2363',
    color: '#000',
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 2,
  },
};

const JobCreate: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get('folderId');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfFile(file || null);
  };
const [ candidateList, setCandidateList] = useState<any[]>([])

  const checkCandidateExist =async (mobilenumbder:any) =>{
    const formatedmnumber = '+971' + mobilenumbder
    const airtableResponse:any = await axios.get(
      'https://api.airtable.com/v0/app6R5bTSGcKo2gmV/CandidateList',
      {
        headers: {
          Authorization: `Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc` ,// or hardcoded if local testing
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("airtableResponse",airtableResponse)

    const records = airtableResponse?.data?.records || [];

    const data = records.map((record: any) => ({
      id: record.id,
      createdTime: record.createdTime,
      ...record.fields
    }));

    const candidateExit = data.filter((records:any) =>  records.Phone_Number == formatedmnumber)
   
    setCandidateList(data)
    return candidateExit.length > 0 ? true : false
  }

  const handleUpload = async () => {
    if (!pdfFile || !folderId) {
      setUploadStatus('Please select a PDF file and provide a folder ID.');
      return { success: false };
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('folderId', folderId);

    try {
      setUploadStatus('Uploading...');
      // 'https://innova-recruiter-candidate.darkube.app


      const response = await fetch('https://sharepoint-api-recruiter.wonderfulmoss-ad1f6e96.uaenorth.azurecontainerapps.io/api/upload-to-created-folder', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        setUploadStatus(`❌ Error: ${errorData.details || 'Upload failed'}`);
        return { success: false };
      }

      const result = await response.json();
      setUploadStatus(`✅ Uploaded: ${result.uploadedFile.name}`);
      console.log('Upload successful:', result);
      return { success: true, file: result.uploadedFile };
    } catch (error) {
      console.error('Unexpected error:', error);
      setUploadStatus('❌ Upload failed due to a network error.');
      return { success: false };
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 1 }, fontFamily: `'Montserrat', sans-serif` }}>
      <Typography sx={{ color: '#000', fontWeight: 400, fontSize: 20, mb: 4, fontFamily: 'Montserrat' }}>
       Apply job
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={JobSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            // First upload the file
            const checkCandidate = await checkCandidateExist(values.Phone_Number)
            if(checkCandidate){
              setStatus(`Sorry You've already applied to this job.`);
              setUploadStatus('❌ Application submission failed');
              return 
            }
            const uploadResult:any = await handleUpload();
            if (!uploadResult?.success) {
              setStatus('File upload failed. Please try again.');
              setSubmitting(false);
              return;
            }

            // Prepare the data for Airtable
            const data = {
              records: [
                {
                  fields: {
                    'Candidate Name': values['Candidate Name'],
                    'Phone_Number': '+971' + `${values.Phone_Number}`,
                    'Experience': values.Experience,
                    'Email': values.Email,
                    'Resume': uploadResult.file.name,
                    'Resume_URL': uploadResult.file.webUrl || '',
                    'Status': 'New Application'
                  }
                }
              ]
            };
            // Submit to Airtable
            const airtableResponse = await axios.post(
              'https://api.airtable.com/v0/app6R5bTSGcKo2gmV/CandidateList',
              data,
              {
                headers: {
                  Authorization: `Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc` ,// or hardcoded if local testing
                  'Content-Type': 'application/json'
                }

                
              }
            );

            if (airtableResponse.status === 200) {
              setUploadStatus('✅ Application submitted successfully!');
              setTimeout(() => {
                navigate('/jobs/list');
              }, 2000);
            } else {
              throw new Error('Failed to create Airtable record');
            }
          } catch (error) {
            console.error("Form submission error:", error);
            setStatus('Failed to submit application. Please try again.');
            setUploadStatus('❌ Application submission failed');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue, status }) => (
          <Form>
            {status && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ color: 'red' }}>{status}</Typography>
              </Box>
            )}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
            }}>
              <Box>
                <Typography sx={{ color: '#000', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Candidate Name</Typography>
                <Field name="Candidate Name">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      placeholder="Enter your name"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkOutlineIcon sx={{ color: '#000' }} />
                          </InputAdornment>
                        ),
                        sx: gradientInputSx,
                      }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Typography sx={{ color: '#000', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Phone Number</Typography>
                <Field name="Phone_Number">
  {({ field, meta }: FieldProps) => (
    <MuiTextField
      {...field}
      placeholder="50 123 4567"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ color: 'white', fontWeight: 500 }}>
            +971
          </InputAdornment>
        ),
        sx: gradientInputSx,
      }}
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*',
        maxLength: 9, // UAE numbers typically have 9 digits after +971
      }}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      FormHelperTextProps={{
        sx: { color: 'red', mt: 1 },
      }}
    />
  )}
</Field>

              </Box>
              <Box>
                <Typography sx={{ color: '#000', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Experience</Typography>
                <Field name="Experience">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      type="number"
                      placeholder="Enter years of experience"
                      fullWidth
                      InputProps={{
                        sx: gradientInputSx,
                      }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Typography sx={{ color: '#000', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Email</Typography>
                <Field name="Email">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      placeholder="Enter email address"
                      fullWidth
                      InputProps={{
                        sx: gradientInputSx,
                      }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ position: 'relative', width: '100%',gridColumn: '1 / -1' }}>
              <Typography sx={{ color: '#000', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Resume</Typography>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          handleFileChange(e);
          setFieldValue('File', e.target.files?.[0] || null);
        }}
        hidden
      />
      <label htmlFor="file-upload">
        <Box
          sx={{
            ...gradientInputSx,
            height: '200px',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.3s',
            border: '2px dashed rgba(255,255,255,0.4)',
            '&:hover': {
              borderColor: '#000',
              boxShadow: '0 0 10px rgba(255,255,255,0.2)',
            },
          }}
        >
          {/* <UploadFileIcon sx={{ fontSize: 40, mb: 1 }} /> */}
          <Typography fontSize={16} fontWeight={500}>
            {values?.File ? values?.File?.name : 'Click to upload PDF'}
          </Typography>
          {/* <Typography fontSize={16} fontWeight={500}>
            Click to upload PDF
          </Typography> */}
          <Typography fontSize={12} color="rgba(255,255,255,0.7)">
            Only .pdf files are supported
          </Typography>
        </Box>
      </label>
    </Box>

              <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#000',
                    borderColor: '#000',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    fontSize: 16,
                    textTransform: 'none',
                    fontFamily: 'Montserrat',
                    '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
                  }}
                  onClick={() => navigate('/jobs/list')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    background: 'linear-gradient(90deg, #3a6ea5 0%, #6B73FF 100%)',
                    color: '#000',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    fontSize: 16,
                    textTransform: 'none',
                    fontFamily: 'Montserrat',
                    boxShadow: 2,
                    '&:hover': { background: 'linear-gradient(90deg, #6B73FF 0%, #3a6ea5 100%)' },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default JobCreate;