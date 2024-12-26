
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button, Link, Box,styled } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



import CourseTopics from './CourseTopics';
import PaymentPage from '../Payment/PaymentPage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getCourseDetailAction } from '../Redux/actions/courseAction';
import { getToken } from '../auth/tokenAction';



const Component=styled(Box)(({theme})=>({
    width:"60%",
    [theme.breakpoints.down("lg")]:{
        width:"80%"
    },
    [theme.breakpoints.down("md")]:{
        ">div:first-child":{
            flexDirection:"column",
            
            
            gap:"5px"
        },
        width:"90%",
        // marginInline:"10px",
    }


}))



export default function CourseDetails() {
    const { course_id } = useParams();
    let dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getCourseDetailAction(course_id));
    }, [])
    let data = useSelector((state) => state.getCourseDetailData);
    let crs = data.course;

    let handlePayment = () => {
        if (getToken() == null) window.alert("Please Login ...");
        else setOpen(true);
    }
    return (
        <>
            <Box className="mt-2 mb-5">
                <Typography variant="h5" className="text-center bg-danger text-white py-2">COURSE DETAILS</Typography>
                {
                    (data.status == true) ?

                        <Component  className='mx-auto'>
                          
                                <Card className="d-flex justify-content-space-between mx-auto my-3 align-item-center" >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="200px"
                                        style={{ width: "100%", objectFit: "contain" }}
                                        image={`${process.env.PUBLIC_URL}/img/${crs.crs_img}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {crs.crs_name}
                                        </Typography>
                                        <Typography variant="body2" className='my-2' sx={{ color: 'text.secondary' }}>
                                            {crs.crs_desc}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Duration : {crs.crs_duration}
                                        </Typography>
                                        <CardActions className="m-2 d-flex flex-wrap gap-2 justify-content-space-between">
                                            <Typography variant='h6' className=''>Price <del>{crs.crs_org_price}</del>&nbsp;&nbsp; &#8377;{crs.crs_sell_price}</Typography>
                                            <Button variant='contained' onClick={handlePayment} style={{ marginLeft: "auto" }} className='text-white bg-primary 50'>Buy Now</Button>

                                        </CardActions>
                                    </CardContent>


                                </Card>
                          
                            <Box className="mt-2">
                                <CourseTopics crs_list={crs.crs_list} />
                            </Box>
                        </Component>
                        : ""
                }
            </Box>
            <PaymentPage state={{ open, setOpen }} />
        </>
    )
}